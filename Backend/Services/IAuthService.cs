using Backend.DTOs;

namespace Backend.Services
{
    public interface IAuthService
    {
        Task<string> Register(UserDto dto);
        Task<string> Login(LoginDto dto);
    }
}