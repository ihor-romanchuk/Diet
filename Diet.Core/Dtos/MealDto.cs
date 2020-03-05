using System;

namespace Diet.Core.Dtos
{
    public class MealDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Calories { get; set; }

        public DateTime DateTimeCreated { get; set; }
    }
}
