using Diet.Core.Extensions;
using Diet.Core.Helpers.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Diet.Core.Helpers
{
    public class UserHelper: IUserHelper
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserHelper(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string UserId => _httpContextAccessor.HttpContext.User.GetLoggedInUserId<string>();
    }
}
