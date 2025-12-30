using Microsoft.AspNetCore.Mvc;
using globalUserSchemaService;
using globalUserSchema;
using globalUserSchemaService.service;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace globalUserController
{
    [ApiController]
    [Route("api/global-user")]
    public class globalUserController : ControllerBase
    {
        private readonly globalUserService _productService;
        public globalUserController(globalUserService productService)
        {
            _productService = productService;
        }

        [HttpPost("create-user")]
        public async Task<GlobalUserSchema> createUser([FromBody] GlobalUserSchema newUser)
        {
            return await _productService.createUser(newUser);
        }
        public class loginData
        {
            public required string Email { get; set; }
            public required string Password { get; set; }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] loginData request)
        {
            var result = await _productService.LoginUser(request.Email, request.Password);  // Now LoginResult

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
                user = result.Token,
                message = "Login successful"
            });
        }


        [HttpGet("get-user")]
        public async Task<GlobalUserSchema> getUser(string email)
        {
            return await _productService.getUser(email);
        }
        [HttpGet("profile")]
        [Authorize]
        public IActionResult GetProfile()
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var name = User.FindFirst(ClaimTypes.Name)?.Value;
            var role = User.FindFirst(ClaimTypes.Role)?.Value;           // ← ClaimTypes.Role (capital R)
            var shopName = User.FindFirst("shopName")?.Value;            // ← Custom claim
            var slug = User.FindFirst("slug")?.Value;                    // ← Custom claim
            var location = User.FindFirst("location")?.Value;            // ← Custom claim
            var mobileNumber = User.FindFirst("mobileNumber")?.Value;
            var exp = User.FindFirst("exp")?.Value;
            string? expiresAt = null;

            if (long.TryParse(exp, out long expUnix))
            {
                var expDate = DateTimeOffset.FromUnixTimeSeconds(expUnix).UtcDateTime;
                expiresAt = expDate.ToString("dd/MM/yyyy HH:mm");
            }


            return Ok(new
            {
                email,
                id,
                name,
                role,
                shopName,
                slug,
                location,
                mobileNumber,
                expiresAt
            });
        }



    }
}