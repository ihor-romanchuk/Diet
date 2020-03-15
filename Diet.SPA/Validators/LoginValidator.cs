using Diet.Core.Dtos;
using FluentValidation;

namespace Diet.SPA.Validators
{
    public class LoginValidator : AbstractValidator<LoginDto>
    {
        public LoginValidator()
        {
            RuleFor(x => x.Email).NotNull().NotEmpty().WithMessage("You should specify email").EmailAddress().WithMessage("Email is not valid");
            RuleFor(x => x.Password).NotNull().NotEmpty().WithMessage("You should specify password");
        }
    }
}
