using Microsoft.AspNetCore.Mvc;
using ShopUserSchemaMongo;
using ShopUserService;

namespace shopUserController
{
    // Define outside the controller
    public class LoginRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }

    public class UpdateUserRequest
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
    }

    public class ToggleStatusRequest
    {
        public required bool IsDeactivated { get; set; }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class ShopUserController : ControllerBase
    {
        private readonly ShopUserService.ShopUserService _shopUserService;

        public ShopUserController(ShopUserService.ShopUserService shopUserService)
        {
            _shopUserService = shopUserService;
        }

        // ✅ Create User
        [HttpPost("create-user")]
        public async Task<IActionResult> createUser([FromBody] ShopUserSchema newUser)
        {
            var createdUser = await _shopUserService.createUser(newUser);
            return Ok(new
            {
                user = createdUser,
                message = "User created successfully"
            });
        }

        // ✅ Login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _shopUserService.LoginUser(request.Email, request.Password);

            if (!result.Success)
            {
                return result.StatusCode switch
                {
                    404 => NotFound(result.ErrorMessage),
                    401 => Unauthorized(new { message = result.ErrorMessage }),
                    _ => BadRequest(result.ErrorMessage)
                };
            }

            return Ok(new
            {
                token = result.Token,
                user = result.User,
                message = "Login successful"
            });
        }

        // ✅ Get User by ID
        [HttpGet("get-user-by-id")]
        public async Task<IActionResult> GetUserById([FromQuery] string userId)
        {
            var user = await _shopUserService.GetUserById(userId);
            return Ok(user);
        }

        // ✅ Get Paginated Users (Admin)
        [HttpGet("get-all-user")]
        // [Authorize(Roles = "admin")] // Add when you implement authorization
        public async Task<IActionResult> GetAllUsers(
            [FromQuery] int page = 1,
            [FromQuery] int limit = 10,
            [FromQuery] string? searchTerm = null,
            [FromQuery] string? role = null,
            [FromQuery] bool? isDeactivated = null)
        {
            var result = await _shopUserService.GetPaginatedUsers(
                page,
                limit,
                searchTerm,
                role,
                isDeactivated
            );

            return Ok(result);
        }

        // ✅ Update User
        [HttpPut("update-user-by-id")]
        public async Task<IActionResult> UpdateUser(
            [FromQuery] string userId,
            [FromBody] UpdateUserRequest request)
        {
            var updateDto = new ShopUserService.ShopUserService.UpdateUserDto
            {
                Name = request.Name,
                Email = request.Email,
                Phone = request.Phone
            };

            var user = await _shopUserService.UpdateUser(userId, updateDto);
            return Ok(new
            {
                user = user,
                message = "User updated successfully"
            });
        }

        // ✅ Toggle User Status (Admin - Activate/Deactivate)
        [HttpPatch("toggle-user/status")]
        // [Authorize(Roles = "admin")]
        public async Task<IActionResult> ToggleUserStatus(
            [FromQuery] string userId,
            [FromBody] ToggleStatusRequest request)
        {
            await _shopUserService.ToggleUserStatus(userId, request.IsDeactivated);

            var statusMessage = request.IsDeactivated ? "deactivated" : "activated";
            return Ok(new
            {
                message = $"User {statusMessage} successfully"
            });
        }

        // ✅ Delete User (Soft delete - just deactivates)
        [HttpDelete("delete-user")]
        // [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteUser([FromQuery] string userId)
        {
            await _shopUserService.ToggleUserStatus(userId, true);
            return Ok(new { message = "User deleted successfully" });
        }
    }
}
