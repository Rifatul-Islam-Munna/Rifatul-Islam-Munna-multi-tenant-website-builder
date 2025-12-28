using Microsoft.AspNetCore.Mvc;
using globalUserSchemaService;
using globalUserSchema;
using globalUserSchemaService.service;

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

        [HttpGet("get-user")]
        public async Task<GlobalUserSchema> getUser(string email)
        {
            return await _productService.getUser(email);
        }



    }
}