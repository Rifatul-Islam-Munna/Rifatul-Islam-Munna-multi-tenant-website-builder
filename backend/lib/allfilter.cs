using Microsoft.AspNetCore.Diagnostics;
using Serilog;
using backend.Exceptions;  // ← ADD THIS LINE!

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

            // UPDATE THIS SWITCH - Add your custom exceptions!
            var status = exception switch
            {
                BadRequestException => StatusCodes.Status400BadRequest,           // ← ADD
                UnauthorizedException => StatusCodes.Status401Unauthorized,       // ← ADD
                NotFoundException => StatusCodes.Status404NotFound,               // ← ADD
                ForbiddenException => StatusCodes.Status403Forbidden,             // ← ADD

                // Keep existing ones too
                ArgumentException => StatusCodes.Status400BadRequest,
                UnauthorizedAccessException => StatusCodes.Status401Unauthorized,
                KeyNotFoundException => StatusCodes.Status404NotFound,

                _ => StatusCodes.Status500InternalServerError
            };

            var message = exception.Message ?? "Internal server error";
            var stack = exception.StackTrace ?? null;

            Console.WriteLine(message);
            Log.Error(message);
            _logger.LogError(exception, message);

            var errorResponse = new
            {
                statusCode = status,
                path = request.Path.Value,
                timestamp = DateTime.UtcNow.ToString("o"),
                message = message,
                stack = stack
            };

            httpContext.Response.StatusCode = status;
            httpContext.Response.ContentType = "application/json";

            await httpContext.Response.WriteAsJsonAsync(errorResponse, cancellationToken);

            return true;
        }
    }
}
