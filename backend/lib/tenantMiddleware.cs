namespace backend.Middleware
{


    public class TenantMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<TenantMiddleware> _logger;

        public TenantMiddleware(RequestDelegate next, ILogger<TenantMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            var host = context.Request.Host.Host;
            string shopName;
            _logger.LogInformation("Request Host: {Host}", host);

            if (host.StartsWith("www.") || host == "yourapp.com" || host == "localhost")
            {
                shopName = "global";
                _logger.LogInformation("Request to main domain. ShopName: {ShopName}", shopName);
            }
            else
            {
                var parts = host.Split('.');
                shopName = parts[0];
                _logger.LogInformation("Request from subdomain. ShopName: {ShopName}", shopName);
            }

            context.Items["shopName"] = shopName;
            await _next(context);

        }
    }
}