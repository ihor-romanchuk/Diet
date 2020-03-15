using Diet.Core.Dtos;
using FluentValidation;

namespace Diet.SPA.Validators
{
    public class AccountValidator : AbstractValidator<AccountDto>
    {
        public AccountValidator()
        {
            RuleFor(x => x.Email).NotNull().NotEmpty().WithMessage("You should specify email").EmailAddress().WithMessage("Email is not valid");
        }
    }
}
