using System;

namespace Diet.Core.Models
{
    public class MealModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public double Calories { get; set; }

        public DateTime DateTimeCreated { get; set; }
    }
}
