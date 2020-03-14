using Diet.Core.Dtos;
using FluentValidation;

namespace Diet.SPA.Validators
{
    public class SettingsValidator : AbstractValidator<SettingDto>
    {
        public SettingsValidator()
        {
            RuleFor(x => x.Value).NotNull().NotEmpty().WithMessage("This field can't be empty");
            RuleFor(x => x.Value).Must(settingsValue => ValidateSettings(settingsValue)).WithMessage("Value must be a number");
        }

        protected bool ValidateSettings(string settingValue)
        {
            return int.TryParse(settingValue, out _);
        }
    }
}
