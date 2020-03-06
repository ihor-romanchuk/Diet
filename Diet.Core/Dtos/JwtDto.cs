using System;

namespace Diet.Core.Dtos
{
    public class JwtDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
    }
}
