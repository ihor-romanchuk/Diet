using Diet.Database.Enums;

namespace Diet.Database.Entities
{
    public class SettingEntity
    {
        public string UserId { get; set; }

        public SettingType Type { get; set; }

        public string Value { get; set; }

        public virtual ApplicationUserEntity User { get; set; }
    }
}
