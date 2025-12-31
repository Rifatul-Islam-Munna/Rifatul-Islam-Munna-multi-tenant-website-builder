using backend.Attributes;
using MongoDB.Driver;
using System.Reflection;
using Serilog;

namespace backend.Services;

public abstract class MongoRepository<T> where T : class
{
    protected readonly IMongoCollection<T> _collection;
    private static readonly Dictionary<string, bool> _indexesCreated = new();

    protected MongoRepository(TenantMongoDbService tenantService, string collectionName, bool isGlobal = true)
    {
        _collection = isGlobal
            ? tenantService.GetGlobalCollection<T>(collectionName)
            : tenantService.GetTenantCollection<T>(collectionName);

        // ✅ Auto-create indexes ONCE per collection
        var key = $"{typeof(T).Name}:{collectionName}";
        if (!_indexesCreated.ContainsKey(key))
        {
            CreateIndexesFromAttributes().Wait();
            _indexesCreated[key] = true;
        }
    }

    // ✅ This reads [MongoIndex] attributes and creates indexes
    private async Task CreateIndexesFromAttributes()
    {
        var properties = typeof(T).GetProperties()
            .Where(p => p.GetCustomAttribute<MongoIndexAttribute>() != null);

        if (!properties.Any()) return;

        var indexModels = new List<CreateIndexModel<T>>();

        foreach (var prop in properties)
        {
            var attr = prop.GetCustomAttribute<MongoIndexAttribute>();
            var indexKey = Builders<T>.IndexKeys.Ascending(prop.Name);
            var options = new CreateIndexOptions
            {
                Unique = attr != null && attr.Unique,
                Name = $"{prop.Name.ToLower()}_idx"
            };
            indexModels.Add(new CreateIndexModel<T>(indexKey, options));
        }

        try
        {
            await _collection.Indexes.CreateManyAsync(indexModels);
            Log.Information($"✅ Created {indexModels.Count} indexes for {typeof(T).Name}");
        }
        catch (Exception ex)
        {
            Log.Warning($"⚠️ Index creation for {typeof(T).Name}: {ex.Message}");
        }
    }
}
