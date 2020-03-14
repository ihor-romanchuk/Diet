using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;

namespace Diet.Core.Exceptions
{
    /// <summary>
    /// Should be used when bad request happened.
    /// </summary>
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
