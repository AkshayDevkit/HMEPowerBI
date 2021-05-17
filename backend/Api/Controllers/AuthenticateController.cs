namespace Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Newtonsoft.Json.Linq;
    using Services;
    using System;
    using System.Threading.Tasks;

    [ApiController]
    [Route("[controller]")]
    public class AuthenticateController
    {
        private readonly IUserService _userService;

        public AuthenticateController(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        [HttpPost("register")]
        public virtual async Task<LoggedInUser> RegisterAsync(User user)
        {
            return await _userService.RegisterAsync(user).ConfigureAwait(false);
        }

        [HttpPost("login")]
        public async Task<LoggedInUser> LogInAsync(JObject model)
        {
            if (!model.ContainsKey("userId"))
            {
                throw new ArgumentNullException("userId");
            }

            if (!model.ContainsKey("password"))
            {
                throw new ArgumentNullException("password");
            }

            return await _userService.LogInAsync(model["userId"].ToString(), model["password"].ToString()).ConfigureAwait(false);
        }
    }
}
