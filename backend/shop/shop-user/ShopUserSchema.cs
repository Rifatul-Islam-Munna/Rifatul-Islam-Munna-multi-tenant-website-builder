using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using backend.Attributes;

namespace ShopUserSchemaMongo
{

    public enum ShopUserRoles
    {
        ShopAdmin,
        User


    }

    public class ShopUserSchema
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonRepresentation(BsonType.String)]
        public string? Id { get; set; }
        public string? Name { get; set; }
        [MongoIndex(Unique = true)]
        public string? Email { get; set; }
        public string? Password { get; set; }
        public ShopUserRoles Role { get; set; } = ShopUserRoles.User;

        public string? Location { get; set; }
        public string? PhoneNumber { get; set; }
        public bool IsDeactivated { get; set; } = false;
        [BsonRepresentation(BsonType.DateTime)]
        public string? CreatedAt { get; set; }

        [BsonRepresentation(BsonType.DateTime)]
        public string? UpdatedAt { get; set; }


    }









}