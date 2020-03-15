using System.ComponentModel.DataAnnotations;

namespace Diet.Core.Dtos
{
    public class RegisterDto
    {
        [Display(Name = "Email")]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
}
