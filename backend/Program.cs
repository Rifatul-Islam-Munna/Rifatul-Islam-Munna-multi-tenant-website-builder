using System.IO.Compression;
using System.Text.Json.Serialization;
using backend.Filters;
using backend.Middleware;
using backend.Services;
using FluentValidation;
using FluentValidation.AspNetCore;


using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.ResponseCompression;
using MongoDB.Driver;
using Serilog;
using Serilog.Sinks.SystemConsole.Themes;



using AutoRegister;
using System.Reflection;
using backend.Configuration;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .MinimumLevel.Override("Microsoft", Serilog.Events.LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.AspNetCore", Serilog.Events.LogEventLevel.Warning)
    .Enrich.FromLogContext()
    .WriteTo.Console(
        theme: AnsiConsoleTheme.Code,
        outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj} {Properties:j}{NewLine}{Exception}"
    ).CreateLogger();

try
{
    Log.Information("🚀 Starting application...");

    var builder = WebApplication.CreateBuilder(args);

    // ✅ This makes HTTPS work automatically in production
    builder.Services.Configure<ForwardedHeadersOptions>(options =>
    {
        options.ForwardedHeaders = ForwardedHeaders.XForwardedProto;
        options.KnownIPNetworks.Clear();
        options.KnownProxies.Clear();
    });

    // Your services...

    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    builder.Services.AddFluentValidationAutoValidation();
    builder.Services.AddValidatorsFromAssemblyContaining<Program>();
    builder.Services.AddAutoMapper(typeof(Program));
    builder.Host.UseSerilog();

    builder.Services.AddResponseCompression(options =>
    {
        options.EnableForHttps = true;
        options.Providers.Add<BrotliCompressionProvider>();
        options.Providers.Add<GzipCompressionProvider>();
    });

    builder.Services.Configure<BrotliCompressionProviderOptions>(options =>
    {
        options.Level = CompressionLevel.Fastest;
    });

    builder.Services.Configure<GzipCompressionProviderOptions>(options =>
    {
        options.Level = CompressionLevel.Fastest;
    });

    builder.Services.AddSingleton<IMongoClient>(sp =>
    {
        var connectionString = builder.Configuration.GetConnectionString("MongoDB")
                               ?? "mongodb://localhost:27017";

        Log.Information("📡 Registering MongoDB client");

        var settings = MongoClientSettings.FromConnectionString(connectionString);
        settings.ServerSelectionTimeout = TimeSpan.FromSeconds(5);
        settings.ConnectTimeout = TimeSpan.FromSeconds(5);

        return new MongoClient(settings);
    });
    builder.Services.AddExceptionHandler<AllExceptionsFilter>();
    builder.Services.AddProblemDetails();
    builder.Services.AddControllers().AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });


    builder.Services.AddAutoregister(Assembly.GetExecutingAssembly());

    MyConfig.Setup(builder);




    builder.Services.AddHttpContextAccessor();




    Log.Information("✅ Services registered");



    var app = builder.Build();
    app.UseAuthentication();
    app.UseAuthorization();

    app.UseExceptionHandler();
    try
    {
        var mongoClient = app.Services.GetRequiredService<IMongoClient>();
        var databases = mongoClient.ListDatabaseNames().ToList();
        Log.Information("✅ MongoDB connected! Databases: {Count}", databases.Count);
    }
    catch (Exception ex)
    {
        Log.Warning("⚠️ MongoDB not accessible: {Message}", ex.Message);
    }

    // ✅ This ONE LINE makes your app understand it's behind HTTPS
    app.UseForwardedHeaders();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseResponseCompression();
    app.UseSerilogRequestLogging();
    app.UseMiddleware<TenantMiddleware>();
    app.UseAuthorization();
    app.MapControllers();

    Log.Information("✅ Application ready!");

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "❌ Application failed to start: {Message}", ex.Message);
    throw;
}
finally
{
    Log.CloseAndFlush();
}
