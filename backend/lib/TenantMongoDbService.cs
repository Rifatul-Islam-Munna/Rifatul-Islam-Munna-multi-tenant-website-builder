using AutoRegister;
using MongoDB.Driver;
using Serilog;
using System.Reflection;
using backend.Attributes;

namespace backend.Services;

[Register(ServiceLifetime.Scoped)]
public class TenantMongoDbService
{
    private readonly IMongoClient _client;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<TenantMongoDbService> _logger;
    private readonly string _globalDbName;
    private static readonly HashSet<string> _indexedCollections = new();


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

    public IMongoDatabase GetGlobalDatabase()
    {
        Log.Information("Accessing global database: {DbName}", _globalDbName);
        return _client.GetDatabase(_globalDbName);
    }

    public IMongoDatabase GetTenantDatabase()
    {
        var shopName = _httpContextAccessor.HttpContext?.Items["ShopName"] as string ?? "global";
        var databaseName = shopName == "global" ? _globalDbName : $"yourapp_{shopName}";
        Log.Information("Accessing tenant database: {DbName} for shop: {ShopName}", databaseName, shopName);
        return _client.GetDatabase(databaseName);
    }

    public IMongoCollection<T> GetGlobalCollection<T>(string collectionName)
    {
        var collection = GetGlobalDatabase().GetCollection<T>(collectionName);

        var key = $"{_globalDbName}:{collectionName}";
        if (!_indexedCollections.Contains(key))
        {
            lock (_indexedCollections)
            {
                if (!_indexedCollections.Contains(key))
                {
                    CreateIndexesForType(collection).Wait();
                    _indexedCollections.Add(key);
                }
            }
        }

        Log.Information("Retrieved global collection: {CollectionName}", collectionName);
        return collection;
    }

    public IMongoCollection<T> GetTenantCollection<T>(string collectionName)
    {
        var shopName = _httpContextAccessor.HttpContext?.Items["ShopName"] as string;
        var collection = GetTenantDatabase().GetCollection<T>(collectionName);

        var dbName = shopName == "global" ? _globalDbName : $"yourapp_{shopName}";
        var key = $"{dbName}:{collectionName}";
        if (!_indexedCollections.Contains(key))
        {
            lock (_indexedCollections)
            {
                if (!_indexedCollections.Contains(key))
                {
                    CreateIndexesForType(collection).Wait();
                    _indexedCollections.Add(key);
                }
            }
        }

        Log.Information("Retrieved tenant collection: {CollectionName} for shop: {ShopName}", collectionName, shopName);
        return collection;
    }

    // ✅ Enhanced index creation with Text, Order, Sparse, TTL support
    private async Task CreateIndexesForType<T>(IMongoCollection<T> collection)
    {
        var properties = typeof(T).GetProperties()
            .Where(p => p.GetCustomAttribute<MongoIndexAttribute>() != null);

        if (!properties.Any()) return;

        var indexModels = new List<CreateIndexModel<T>>();

        foreach (var prop in properties)
        {
            var attr = prop.GetCustomAttribute<MongoIndexAttribute>();

            // ✅ Handle Text vs Regular index
            IndexKeysDefinition<T> indexKey;
            if (attr != null && attr.Text)
            {
                indexKey = Builders<T>.IndexKeys.Text(prop.Name);
            }
            else
            {
                indexKey = attr != null && attr.Order == -1
                    ? Builders<T>.IndexKeys.Descending(prop.Name)
                    : Builders<T>.IndexKeys.Ascending(prop.Name);
            }

            var options = new CreateIndexOptions
            {
                Unique = attr != null && attr.Unique,
                Sparse = attr != null && attr.Sparse,
                Name = $"{prop.Name.ToLower()}_idx"
            };

            // ✅ TTL index
            if (attr != null && attr.ExpireAfterSeconds.HasValue)
            {
                options.ExpireAfter = TimeSpan.FromSeconds(attr.ExpireAfterSeconds.Value);
            }

            indexModels.Add(new CreateIndexModel<T>(indexKey, options));
        }

        try
        {
            await collection.Indexes.CreateManyAsync(indexModels);
            Log.Information($"✅ Created {indexModels.Count} indexes for {typeof(T).Name}");
        }
        catch (Exception ex)
        {
            Log.Warning($"⚠️ Index creation for {typeof(T).Name}: {ex.Message}");
        }
    }

    public string GetCurrentShopName()
    {
        return _httpContextAccessor.HttpContext?.Items["ShopName"] as string ?? "global";
    }
}
