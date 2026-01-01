using AutoRegister;
using backend.Exceptions;
using backend.Services;
using MongoDB.Driver;
using ShopUserSchemaMongo;

namespace ShopUserService
{
    [Register(ServiceLifetime.Scoped)]
    public class ShopUserService
    {
        private readonly IMongoCollection<ShopUserSchema> _shopUserCollection;
        private readonly TenantMongoDbService _tenantDbService;
        private readonly JwtService _jwtService;

        public ShopUserService(TenantMongoDbService tenantDbService, JwtService jwtService)
        {
            _tenantDbService = tenantDbService;
            _shopUserCollection = _tenantDbService.GetTenantCollection<ShopUserSchema>("shopUsers");
            _jwtService = jwtService;
        }

        // ✅ Create User
        public async Task<ShopUserSchema> createUser(ShopUserSchema newUser)
        {
            newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password, workFactor: 12);
            newUser.IsDeactivated = BooleanHelper.ToBool(newUser.IsDeactivated);
            await _shopUserCollection.InsertOneAsync(newUser);
            return newUser;
        }

        // ✅ Get User by ID
        public async Task<ShopUserSchema> GetUserById(string userId)
        {
            var user = await _shopUserCollection.Find(x => x.Id == userId).FirstOrDefaultAsync();

            if (user == null)
            {
                throw new BadRequestException("User not found");
            }

            // Remove password before returning
            user.Password = null;
            return user;
        }

        // ✅ Get Paginated Users (Admin)
        public async Task<PaginatedResult<ShopUserSchema>> GetPaginatedUsers(
            int page = 1,
            int limit = 10,
            string? searchTerm = null,
            string? role = null,
            bool? isDeactivated = null)
        {
            // Build filter
            var filterBuilder = Builders<ShopUserSchema>.Filter;
            var filter = filterBuilder.Empty;

            // Search by name or email
            if (!string.IsNullOrEmpty(searchTerm))
            {
                var searchFilter = filterBuilder.Or(
                    filterBuilder.Regex(x => x.Name, new MongoDB.Bson.BsonRegularExpression(searchTerm, "i")),
                    filterBuilder.Regex(x => x.Email, new MongoDB.Bson.BsonRegularExpression(searchTerm, "i"))
                );
                filter &= searchFilter;
            }

            // Filter by role
            if (!string.IsNullOrEmpty(role))
            {
                if (Enum.TryParse<ShopUserRoles>(role, true, out var userRole))
                {
                    filter &= filterBuilder.Eq(x => x.Role, userRole);
                }
            }


            // Filter by deactivation status
            if (isDeactivated.HasValue)
            {
                filter &= filterBuilder.Eq(x => x.IsDeactivated, isDeactivated.Value);
            }

            // Get total count
            var totalItems = await _shopUserCollection.CountDocumentsAsync(filter);

            // Calculate pagination
            var skip = (page - 1) * limit;

            // Get paginated users
            var users = await _shopUserCollection
                .Find(filter)
                .Sort(Builders<ShopUserSchema>.Sort.Descending(x => x.CreatedAt))
                .Skip(skip)
                .Limit(limit)
                .ToListAsync();

            // Remove passwords
            foreach (var user in users)
            {
                user.Password = null;
            }

            return new PaginatedResult<ShopUserSchema>
            {
                Items = users,
                TotalItems = totalItems,
                Page = page,
                Limit = limit,
                TotalPages = (int)Math.Ceiling((double)totalItems / limit),
                HasNextPage = page * limit < totalItems,
                HasPreviousPage = page > 1
            };
        }

        // ✅ Login User
        public async Task<LoginResult> LoginUser(string email, string password)
        {
            var user = await _shopUserCollection.Find(x => x.Email == email).FirstOrDefaultAsync();

            if (user == null)
            {
                throw new BadRequestException("User not found");
            }

            if (!BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                throw new BadRequestException("Password is incorrect");
            }

            if (user.IsDeactivated)
            {
                throw new BadRequestException("User is deactivated");
            }

            var token = _jwtService.GenerateToken(
                user.Id ?? "",
                user.Name ?? "",
                user.Email ?? "",
                user.Role.ToString() ?? "",
                "",
                ""
            );

            return new LoginResult
            {
                Success = true,
                User = user,
                Token = token
            };
        }

        // ✅ Update User
        public async Task<ShopUserSchema> UpdateUser(string userId, UpdateUserDto updateData)
        {
            var updateBuilder = Builders<ShopUserSchema>.Update;
            var updates = new List<UpdateDefinition<ShopUserSchema>>();

            if (!string.IsNullOrEmpty(updateData.Name))
                updates.Add(updateBuilder.Set(x => x.Name, updateData.Name));

            if (!string.IsNullOrEmpty(updateData.Email))
                updates.Add(updateBuilder.Set(x => x.Email, updateData.Email));

            if (!string.IsNullOrEmpty(updateData.Phone))
                updates.Add(updateBuilder.Set(x => x.PhoneNumber, updateData.Phone));

            if (updates.Count == 0)
            {
                throw new BadRequestException("No fields to update");
            }

            var combinedUpdate = updateBuilder.Combine(updates);
            var result = await _shopUserCollection.FindOneAndUpdateAsync(
                x => x.Id == userId,
                combinedUpdate,
                new FindOneAndUpdateOptions<ShopUserSchema> { ReturnDocument = ReturnDocument.After }
            );

            if (result == null)
            {
                throw new BadRequestException("User not found");
            }

            result.Password = null;
            return result;
        }

        // ✅ Deactivate/Activate User (Admin)
        public async Task<bool> ToggleUserStatus(string userId, bool isDeactivated)
        {
            var update = Builders<ShopUserSchema>.Update.Set(x => x.IsDeactivated, isDeactivated);
            var result = await _shopUserCollection.UpdateOneAsync(x => x.Id == userId, update);

            if (result.ModifiedCount == 0)
            {
                throw new BadRequestException("User not found");
            }

            return true;
        }

        // Supporting classes
        public class LoginResult
        {
            public bool Success { get; set; }
            public ShopUserSchema? User { get; set; }
            public string? Token { get; set; }
            public string? ErrorMessage { get; set; }
            public int StatusCode { get; set; }
        }

        public class UpdateUserDto
        {
            public string? Name { get; set; }
            public string? Email { get; set; }
            public string? Phone { get; set; }
        }
    }

    // ✅ Paginated Result Model
    public class PaginatedResult<T>
    {
        public List<T> Items { get; set; } = new();
        public long TotalItems { get; set; }
        public int Page { get; set; }
        public int Limit { get; set; }
        public int TotalPages { get; set; }
        public bool HasNextPage { get; set; }
        public bool HasPreviousPage { get; set; }
    }
}
