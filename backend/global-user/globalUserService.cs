using MongoDB.Driver;
using globalUserSchema;
using backend.Services;
using BCrypt.Net;
using Serilog;
using Slugify;
using System.Net.Mail;
using backend.Exceptions;
using AutoRegister;

namespace globalUserSchemaService.service
{

    [Register(ServiceLifetime.Scoped)]
    public class globalUserService
    {
        private readonly IMongoCollection<GlobalUserSchema> _globalUserCollection;
        private readonly TenantMongoDbService _tenantDbService;
        private readonly JwtService _jwtService;

        private readonly IMongoCollection<ShopOwnerSchema.ShopOwnerSchema> _ShopOwnerSchema;

        public globalUserService(TenantMongoDbService tenantDbService, JwtService jwtService)
        {
            _tenantDbService = tenantDbService;
            _globalUserCollection = _tenantDbService.GetGlobalCollection<GlobalUserSchema>("globalUsers");

            _jwtService = jwtService;
            _ShopOwnerSchema = _tenantDbService.GetGlobalCollection<ShopOwnerSchema.ShopOwnerSchema>("shopOwners");

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
            newUser.IsVerified = BooleanHelper.ToBool(newUser.IsVerified);

            newUser.IsDeactivated = BooleanHelper.ToBool(newUser.IsDeactivated);
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


        public async Task<PaginatedResult<GlobalUserSchema>> GetAllUser(int page, int limit)
        {
            if (page < 1) page = 1;
            if (limit < 1) limit = 10;

            int skip = (page - 1) * limit;

            var countTask = _globalUserCollection.CountDocumentsAsync(_ => true);

            var usersTask = _globalUserCollection
                .Find(_ => true)
                .Skip(skip)
                .Limit(limit)
                .ToListAsync();

            await Task.WhenAll(countTask, usersTask);



            var totalCount = await countTask;
            var users = await usersTask;

            return new PaginatedResult<GlobalUserSchema>
            {
                Data = users,
                TotalCount = (int)totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)limit),
                Page = page,
                Limit = limit
            };
        }




        // this is only for shop owner settings


        public async Task<ShopOwnerSchema.ShopOwnerSchema> PostShopOwner(ShopOwnerSchema.ShopOwnerSchema Shop)
        {
            await _ShopOwnerSchema.InsertOneAsync(Shop);
            return Shop;
        }

        public async Task<ShopOwnerSchema.ShopOwnerSchema> GetShopOwner(string ShopName)
        {
            var Shop = await _ShopOwnerSchema.Find(x => x.ShopName == ShopName).FirstOrDefaultAsync();
            return Shop;
        }


    }
}
