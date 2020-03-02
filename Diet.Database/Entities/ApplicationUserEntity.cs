using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Diet.Database.Entities
{
    public class ApplicationUserEntity : IdentityUser
    {
        public ApplicationUserEntity()
        {
            Meals = new HashSet<MealEntity>();
            Settings = new HashSet<SettingEntity>();
        }

        public virtual ICollection<MealEntity> Meals { get; set; }
        public virtual ICollection<SettingEntity> Settings { get; set; }
    }
}
