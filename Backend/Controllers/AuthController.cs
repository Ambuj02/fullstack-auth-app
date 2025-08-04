using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

         [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        try
        {
            var token = await _authService.Login(loginDto);
            return Ok(new { token, message = "Login successful" });
        }
        catch (Exception ex)
        {
            return StatusCode(400, new { token = string.Empty, message = ex.Message });
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserDto userDto)
    {
        try
        {
            var token = await _authService.Register(userDto);
            return Ok(new { token, message = "Registration successful" });
        }
        catch (Exception ex)
        {
            return StatusCode(400, new { token = string.Empty, message = ex.Message });
        }
    }
    }
}