using System;

namespace Diet.Database.Entities
{
    public class MealEntity
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        public string Name { get; set; }

        public double Calories { get; set; }

        public DateTime DateTimeCreated { get; set; }

        public virtual ApplicationUserEntity User { get; set; }
    }
}
