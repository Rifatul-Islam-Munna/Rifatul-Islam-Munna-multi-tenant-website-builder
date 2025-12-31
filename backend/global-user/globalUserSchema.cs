using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using backend.Attributes;
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

        [MongoIndex(Unique = true)]
        public string? Email { get; set; }
        public string? Password { get; set; }

        [BsonRepresentation(BsonType.String)]
        public UserRole? Role { get; set; } = UserRole.ShopOwner;

        [MongoIndex(Unique = true)]
        public string? Phone { get; set; }

        [MongoIndex(Unique = true)]
        public string? ShopName { get; set; }

        [MongoIndex(Unique = true)]

        public string? ShopSlug { get; set; }

        public string? UserSlug { get; set; }

        public bool IsVerified { get; set; } = false;

        public bool IsDeactivated { get; set; } = false;

    }


}