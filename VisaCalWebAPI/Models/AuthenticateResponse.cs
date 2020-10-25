using WebApi.Entities;

namespace WebApi.Models
{
    public class AuthenticateResponse
    {
        public string UserName { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(User user, string token)
        {
            UserName = user.UserName;
            Token = token;
        }
    }
}