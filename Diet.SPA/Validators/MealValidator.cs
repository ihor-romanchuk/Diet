using System.Threading.Tasks;
using Diet.Core.Dtos;
using FluentValidation;

namespace Diet.SPA.Validators
{
    public class MealValidator : AbstractValidator<MealDto>
    {
        public MealValidator() 
        {
            RuleFor(meal => meal.Name).NotNull().NotEmpty().WithMessage("Meal name can't be empty");
            RuleFor(meal => meal.Calories).NotNull().NotEmpty().WithMessage("You should specify number of calories").DependentRules(() => 
            {
                RuleFor(x => x.Calories).LessThanOrEqualTo(20000).WithMessage("Looks like you specify not real number of calories");
            });
            RuleFor(meal => meal.DateTimeCreated).NotNull().NotEmpty().WithMessage("You must specify date");
        }

        protected async Task<bool> ValidateCalories()
        {
            return true;
        }
    }
}
