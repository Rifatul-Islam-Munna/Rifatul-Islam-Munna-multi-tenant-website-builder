using System.Drawing;
using backend.Middleware;
using backend.Services;
using MongoDB.Driver;
using Serilog;
using Serilog.Sinks.SystemConsole.Themes;

Log.Logger = new LoggerConfiguration()
.MinimumLevel.Debug()
.MinimumLevel.Override("Microsoft", Serilog.Events.LogEventLevel.Warning)
.MinimumLevel.Override("Microsoft.AspNetCore", Serilog.Events.LogEventLevel.Warning)
.Enrich.FromLogContext()
.WriteTo.Console(
    theme: AnsiConsoleTheme.Code,
    outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj} {Properties:j}{NewLine}{Exception}"



).CreateLogger();
var builder = WebApplication.CreateBuilder(args);

// ✅ SERVICES (BEFORE Build)
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Host.UseSerilog();
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var connectionString = builder.Configuration.GetConnectionString("MongoDB")
                           ?? "mongodb://localhost:27017";
    var logger = sp.GetRequiredService<ILogger<Program>>();
    Log.Information("✅ MongoDB connected successfully!");

    return new MongoClient(connectionString);
});

builder.Services.AddScoped<TenantMongoDbService>();

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// ✅ PIPELINE
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseSerilogRequestLogging();
app.UseMiddleware<TenantMiddleware>();
app.MapControllers();

// Minimal API (this is OK)
app.MapGet("/weatherforecast", () =>
{
    var summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild",
        "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    return Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast(
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ));
});

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
