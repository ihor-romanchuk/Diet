using Diet.Core.Dtos;
using FluentValidation;

namespace Diet.SPA.Validators
{
    public class SettingsValidator : AbstractValidator<SettingDto>
    {
        public SettingsValidator()
        {
            RuleFor(x => x.Value).NotNull().NotEmpty().WithMessage("This field can't be empty");
            RuleFor(x => x.Value).Must(settingsValue => ValidateSettings(settingsValue)).WithMessage("Calories per day must be a positive number and less than 30000");
        }

        protected bool ValidateSettings(string settingValue)
        {
            bool isNumeric = int.TryParse(settingValue, out int limit);
            return isNumeric && limit > 0 && limit < 30000;
        }
    }
}
