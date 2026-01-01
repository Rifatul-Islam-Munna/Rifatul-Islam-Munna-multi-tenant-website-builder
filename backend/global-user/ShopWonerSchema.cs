using backend.Attributes;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
namespace ShopOwnerSchema

{
    public class HomeSection
    {
        public string? HeroSection { get; set; }
        public string? CategorySection { get; set; }
        public bool? IsFeatureProducts { get; set; }
        public bool? IsBestSelling { get; set; }
        public bool? IsNewArrival { get; set; }
    }

    public class ProductDetails
    {
        public string? ProductDetailsPage { get; set; }

    }
    public class AboutUs
    {
        public string? Title { get; set; }
        public string? OurStorySubtitle { get; set; }
        public string? OurStoryText { get; set; }
        public string? OurStoryImageUrl { get; set; }
        public string? WhatWeDoSubtitle { get; set; }
        public string? WhatWeDoText { get; set; }
        public string? WhatWeDoImageUrl { get; set; }


    }
    public class Location
    {
        public string? LocationUrl { get; set; }
        public string? VisitUsText { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
    }
    public class OurTeam
    {
        public string? OurTeamAboutImageUrl { get; set; }
        public string? OurTeamText { get; set; }
    }

    public class Footer
    {
        public string? FooterType { get; set; }
    }
    public class ShopOwnerSchema
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [MongoIndex(Unique = true)]
        public string? ShopName { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string? OwnerReferences { get; set; }


        public string? ShopLogo { get; set; }

        public string? ThemeColor { get; set; }
        public string? ShopDescription { get; set; }
        public HomeSection? HomeSection { get; set; }
        public ProductDetails? ProductDetails { get; set; }
        public AboutUs? AboutUs { get; set; }
        public Location? Location { get; set; }
        public OurTeam? OurTeam { get; set; }
        public Footer? Footer { get; set; }



    }


}