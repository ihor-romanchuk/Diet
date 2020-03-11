using Diet.Database.Enums;

namespace Diet.Core.Dtos
{
    public class SettingDto
    {
        public SettingType Type { get; set; }
        public string Value { get; set; }
    }
}
