using Diet.Core.Dtos;
using Diet.Database.Entities;
using FluentValidation;
using System.Threading.Tasks;

namespace Diet.SPA.EntityValidator
{
    public class MealValidator : AbstractValidator<MealDto>
    {

        public MealValidator() 
        {
            RuleFor(meal => meal.Name).NotNull().NotEmpty().WithMessage("Meal name can't be empty");
            RuleFor(meal => meal.Calories).NotNull().NotEmpty().WithMessage("You should specify number of calories").DependentRules(() => 
            {
                RuleFor(x => x.Calories).LessThanOrEqualTo(10000).WithMessage("Looks like you specify not real number of calories");
            });
            RuleFor(meal => meal.DateTimeCreated).NotNull().NotEmpty().WithMessage("You must specify date");
        }

        protected async Task<bool> ValidateCalories()
        {
            return true;
        }
    }
}
