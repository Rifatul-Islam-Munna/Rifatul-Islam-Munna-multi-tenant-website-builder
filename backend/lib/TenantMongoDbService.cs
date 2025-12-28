using MongoDB.Driver;
using Serilog;

namespace backend.Services;

public class TenantMongoDbService
{
    private readonly IMongoClient _client;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<TenantMongoDbService> _logger;
    private readonly string _globalDbName;

    public TenantMongoDbService(
        IMongoClient mongoClient,
        IHttpContextAccessor httpContextAccessor,
        ILogger<TenantMongoDbService> logger,
        IConfiguration configuration)
    {
        _client = mongoClient;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
        _globalDbName = configuration["MongoDB:GlobalDatabaseName"] ?? "yourapp_global";
    }

    /// <summary>
    /// Get the global database (shared across all tenants)
    /// </summary>
    public IMongoDatabase GetGlobalDatabase()
    {
        Log.Information("Accessing global database: {DbName}", _globalDbName);
        return _client.GetDatabase(_globalDbName);
    }

    /// <summary>
    /// Get tenant-specific database based on subdomain
    /// </summary>
    public IMongoDatabase GetTenantDatabase()
    {
        var shopName = _httpContextAccessor.HttpContext?.Items["ShopName"] as string ?? "global";

        var databaseName = shopName == "global"
            ? _globalDbName
            : $"yourapp_{shopName}";

        Log.Information("Accessing tenant database: {DbName} for shop: {ShopName}",
            databaseName, shopName);

        return _client.GetDatabase(databaseName);
    }

    /// <summary>
    /// Get a collection from global database
    /// </summary>
    public IMongoCollection<T> GetGlobalCollection<T>(string collectionName)
    {
        var collection = GetGlobalDatabase().GetCollection<T>(collectionName);
        Log.Information("Retrieved global collection: {CollectionName}", collectionName);
        return collection;
    }

    /// <summary>
    /// Get a collection from tenant-specific database
    /// </summary>
    public IMongoCollection<T> GetTenantCollection<T>(string collectionName)
    {
        var shopName = _httpContextAccessor.HttpContext?.Items["ShopName"] as string;
        var collection = GetTenantDatabase().GetCollection<T>(collectionName);
        Log.Information("Retrieved tenant collection: {CollectionName} for shop: {ShopName}",
            collectionName, shopName);
        return collection;
    }

    /// <summary>
    /// Get current shop name from request
    /// </summary>
    public string GetCurrentShopName()
    {
        return _httpContextAccessor.HttpContext?.Items["ShopName"] as string ?? "global";
    }
}
