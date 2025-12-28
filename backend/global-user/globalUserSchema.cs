using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
namespace globalUserSchema
{

    public enum UserRole
    {
        Admin,
        ShopOwner,
        Editor,
        Developer
    }
    public class GlobalUserSchema
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }

        [BsonRepresentation(BsonType.String)]
        public UserRole? Role { get; set; } = UserRole.ShopOwner;
        public string? Phone { get; set; }
        public string? ShopName { get; set; }

        public string? ShopSlug { get; set; }

        public string? UserSlug { get; set; }

    }


}