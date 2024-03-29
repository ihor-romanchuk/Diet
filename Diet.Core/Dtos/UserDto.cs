﻿using System.Collections.Generic;

namespace Diet.Core.Dtos
{
    public class UserDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public IList<string> Roles { get; set; }
    }
}
