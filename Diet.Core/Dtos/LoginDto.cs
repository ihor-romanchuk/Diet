using System.ComponentModel.DataAnnotations;

namespace Diet.Core.Dtos
{
    public class LoginDto
    {
        public string Email { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
