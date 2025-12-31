// Configuration/MyConfig.cs
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace backend.Configuration;

public static class MyConfig
{
    public static void Setup(WebApplicationBuilder builder)
    {


        var jwtSection = builder.Configuration.GetSection("Jwt");
        var key = jwtSection["Key"] ?? throw new InvalidOperationException("JWT Key not found");
        var issuer = jwtSection["Issuer"] ?? throw new InvalidOperationException("JWT Issuer not found");
        var audience = jwtSection["Audience"] ?? throw new InvalidOperationException("JWT Audience not found");

        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
           .AddJwtBearer(options =>
           {
               options.SaveToken = true;
               options.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuer = true,
                   ValidateAudience = true,
                   ValidateLifetime = true,
                   ValidateIssuerSigningKey = true,
                   ValidIssuer = issuer,
                   ValidAudience = audience,
                   IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
               };
               // Accept token from cookie OR Authorization header
               options.Events = new JwtBearerEvents
               {
                   OnMessageReceived = context =>
       {
           // Priority 1: Custom header 'access_token' (like your NestJS guard)
           var customToken = context.Request.Headers["access_token"].FirstOrDefault();
           if (!string.IsNullOrEmpty(customToken))
           {
               context.Token = customToken;
               return Task.CompletedTask;
           }

           // Priority 2: Cookie 'auth-token'
           if (context.Request.Cookies.ContainsKey("auth-token"))
           {
               context.Token = context.Request.Cookies["auth-token"];
               return Task.CompletedTask;
           }

           // Priority 3: Authorization header 'Bearer token'
           var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
           if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
           {
               context.Token = authHeader.Substring(7); // Remove "Bearer " prefix
           }

           return Task.CompletedTask;
       }
               };
           })
           .AddCookie("Cookies");



    }
}
