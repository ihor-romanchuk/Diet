using System;
using System.Collections.Generic;
using System.Linq;
using Diet.Core.ErrorHandling.Models;
using Microsoft.AspNetCore.Identity;

namespace Diet.Core.ErrorHandling.Exceptions
{
    /// <summary>
    /// Should be used when validation failed.
    /// </summary>
    public class ValidationException : Exception
    {
        /// <summary>
        /// List of validation errors.
        /// </summary>
        public List<ValidationErrorModel> Errors { get; set; }

        public ValidationException(string message) : base(message)
        {
        }

        public ValidationException(List<ValidationErrorModel> errors)
        {
            Errors = errors;
        }

        public ValidationException(string fieldName, IEnumerable<IdentityError> errors)
        {
            Errors = errors.Select(e => new ValidationErrorModel
            {
                FieldName = fieldName,
                Message = e.Description
            }).ToList();
        }

        public ValidationException(IEnumerable<IdentityError> errors) : base(string.Join(Environment.NewLine, errors.Select(p => p.Description)))
        {
        }
    }
}
