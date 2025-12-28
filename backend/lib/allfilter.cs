using Microsoft.AspNetCore.Diagnostics;
using Serilog;

namespace backend.Filters
{
    public class AllExceptionsFilter : IExceptionHandler
    {
        private readonly ILogger<AllExceptionsFilter> _logger;

        public AllExceptionsFilter(ILogger<AllExceptionsFilter> logger)
        {
            _logger = logger;
        }

        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext,
            Exception exception,
            CancellationToken cancellationToken)
        {
            var request = httpContext.Request;

            // Determine status code - default to 500 for all unknown exceptions
            var status = exception switch
            {
                ArgumentException => StatusCodes.Status400BadRequest,
                UnauthorizedAccessException => StatusCodes.Status401Unauthorized,
                KeyNotFoundException => StatusCodes.Status404NotFound,
                _ => StatusCodes.Status500InternalServerError
            };

            var message = exception.Message ?? "Internal server error";
            var stack = exception.StackTrace ?? null;

            // Log to console and logger (same as NestJS)
            Console.WriteLine(message);
            Log.Error(message);
            _logger.LogError(exception, message);

            // Return EXACT same format as NestJS
            var errorResponse = new
            {
                statusCode = status,
                path = request.Path.Value,
                timestamp = DateTime.UtcNow.ToString("o"), // ISO format
                message = message,
                stack = stack
            };

            httpContext.Response.StatusCode = status;
            httpContext.Response.ContentType = "application/json";

            await httpContext.Response.WriteAsJsonAsync(errorResponse, cancellationToken);

            return true; // Exception handled
        }
    }
}
