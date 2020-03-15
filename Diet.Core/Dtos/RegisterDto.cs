using System.ComponentModel.DataAnnotations;

namespace Diet.Core.Dtos
{
    public class RegisterDto
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
