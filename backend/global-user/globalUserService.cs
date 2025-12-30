using MongoDB.Driver;
using globalUserSchema;
using backend.Services;
using BCrypt.Net;
using Serilog;
using Slugify;
using System.Net.Mail;
using backend.Exceptions;
namespace globalUserSchemaService.service
{
    public class globalUserService
    {
        private readonly IMongoCollection<GlobalUserSchema> _globalUserCollection;
        private readonly TenantMongoDbService _tenantDbService;
        private readonly JwtService _jwtService;

        public globalUserService(TenantMongoDbService tenantDbService, JwtService jwtService)
        {
            _tenantDbService = tenantDbService;
            _globalUserCollection = _tenantDbService.GetGlobalCollection<GlobalUserSchema>("globalUsers");

            _jwtService = jwtService;
        }
        public async Task createUniqIndex()
        {
            var indexKeys = Builders<GlobalUserSchema>.IndexKeys.Ascending(x => x.Email);
            var indexKeysDefinitionPhone = Builders<GlobalUserSchema>.IndexKeys.Ascending(x => x.Phone);
            var indexKeysDefinitionShop = Builders<GlobalUserSchema>.IndexKeys.Ascending(x => x.ShopName);
            var indexKeysDefinitionShopSlug = Builders<GlobalUserSchema>.IndexKeys.Ascending(x => x.ShopSlug);
            var indexOptions = new CreateIndexOptions { Unique = true };


            var emailIndexModel = new CreateIndexModel<GlobalUserSchema>(
                indexKeys, indexOptions);

            var phoneIndexModel = new CreateIndexModel<GlobalUserSchema>(
                indexKeysDefinitionPhone, indexOptions);

            var shopIndexModel = new CreateIndexModel<GlobalUserSchema>(
                indexKeysDefinitionShop, indexOptions);
            var shopIndexShopSlug = new CreateIndexModel<GlobalUserSchema>(
                indexKeysDefinitionShopSlug, indexOptions);
            try
            {
                await _globalUserCollection.Indexes.CreateOneAsync(emailIndexModel);
                await _globalUserCollection.Indexes.CreateOneAsync(phoneIndexModel);
                await _globalUserCollection.Indexes.CreateOneAsync(shopIndexModel);
                await _globalUserCollection.Indexes.CreateOneAsync(shopIndexShopSlug);

                Log.Information("✅ Unique indexes created successfully");
            }
            catch (Exception ex)
            {
                Log.Information($"⚠️ Index creation (may already exist): {ex.Message}");
            }
        }
        private static string NormalizeSimple(string? input)
        {
            if (string.IsNullOrEmpty(input)) return string.Empty;
            return input.Trim().ToLowerInvariant();

        }
        private static string slugify(string? input)
        {
            if (string.IsNullOrEmpty(input)) return string.Empty;
            Log.Information(input);
            var slugHelper = new SlugHelper();
            return slugHelper.GenerateSlug(input);

        }
        public async Task<GlobalUserSchema> createUser(GlobalUserSchema newUser)
        {
            newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password, workFactor: 12);
            newUser.ShopName = NormalizeSimple(newUser.ShopName);
            newUser.ShopSlug = slugify(newUser.ShopName);
            newUser.UserSlug = slugify($"{newUser.ShopName}-{newUser.Email}-{newUser.Phone}");
            await _globalUserCollection.InsertOneAsync(newUser);
            return newUser;
        }

        public async Task<GlobalUserSchema> getUser(string email)
        {
            var user = await _globalUserCollection.Find(x => x.Email == email).FirstOrDefaultAsync();
            return user;
        }
        public class LoginResult
        {
            public bool Success { get; set; }
            public GlobalUserSchema? User { get; set; }
            public string? Token { get; set; }
            public string? ErrorMessage { get; set; }
            public int StatusCode { get; set; }
        }


        public async Task<LoginResult> LoginUser(string email, string password)
        {
            // Check if user exists
            var user = await _globalUserCollection.Find(x => x.Email == email).FirstOrDefaultAsync();
            if (user == null)
            {
                throw new BadRequestException("User not found");
                /* return new LoginResult { Success = false, ErrorMessage = "User not found", StatusCode = 404 }; */
            }

            // Verify password
            if (!BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                throw new BadRequestException("Password is incorrect");
                /*  return new LoginResult { Success = false, ErrorMessage = "Invalid credentials", StatusCode = 401 }; */
            }
            if (user.IsDeactivated)
            {
                throw new BadRequestException("User is deactivated");

            }
            // Generate JWT token with REAL user data
            var token = _jwtService.GenerateToken(user.Id ?? "".ToString(), user.Name ?? "", user.Email ?? "", user.Role.ToString() ?? "", user.ShopName ?? "", user.UserSlug ?? "");

            return new LoginResult
            {
                Success = true,
                User = user,
                Token = token
            };
        }

    }
}
