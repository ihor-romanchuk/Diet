using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;

namespace Diet.Core.Exceptions
{
    public class BadRequestException : Exception
    {
        public BadRequestException(string message) : base(message)
        {
        }

        //todo
        public BadRequestException(IEnumerable<IdentityError> errors): base(string.Join(Environment.NewLine, errors.Select(p => p.Description)))
        {
            
        }
    }
}
