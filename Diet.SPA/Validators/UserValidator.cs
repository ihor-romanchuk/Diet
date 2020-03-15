using Diet.Core.Dtos;
using FluentValidation;

namespace Diet.SPA.Validators
{
    public class UserValidator : AbstractValidator<UserDto>
    {
        public UserValidator()
        {
            RuleFor(x => x.Email).NotNull().NotEmpty().WithMessage("You should specify email").EmailAddress().WithMessage("Email is not valid");
            RuleFor(x => x.Password).NotNull().NotEmpty().WithMessage("You should specify password");
            RuleFor(x => x.Roles).NotNull().NotEmpty().WithMessage("You should set at least one role");
        }
    }
}
