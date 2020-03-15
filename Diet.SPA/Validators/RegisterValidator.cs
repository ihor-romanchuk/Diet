using Diet.Core.Dtos;
using FluentValidation;

namespace Diet.SPA.Validators
{
    public class RegisterValidator : AbstractValidator<RegisterDto>
    {
        public RegisterValidator()
        {
            RuleFor(x => x.Email).NotNull().NotEmpty().WithMessage("You should specify email").EmailAddress().WithMessage("Email is not valid");
            RuleFor(x => x.Password).NotNull().NotEmpty().WithMessage("You should specify password").DependentRules(() =>
            {
                RuleFor(x => x.Password).Length(6, 100).WithMessage("The password must be at least 6 characters long and not more than 100");
            }); 
        }
    }
}
