using System.ComponentModel.DataAnnotations;

namespace Diet.SPA.Models.AccountViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
