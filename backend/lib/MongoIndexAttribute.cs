
namespace backend.Attributes;

[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
public class MongoIndexAttribute : Attribute
{
    public bool Unique { get; set; } = false;
    public bool Text { get; set; } = false;  // ✅ Text index
    public int Order { get; set; } = 1;      // ✅ 1 = Ascending, -1 = Descending
    public bool Sparse { get; set; } = false; // ✅ Sparse index
    public int? ExpireAfterSeconds { get; set; } = null; // ✅ TTL index
}
