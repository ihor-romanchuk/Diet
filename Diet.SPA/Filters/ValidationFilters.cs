using Microsoft.AspNetCore.Mvc.Filters;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Diet.Core.ErrorHandling.Exceptions;
using Diet.Core.ErrorHandling.Models;
using Diet.Core.Extensions;

namespace Diet.SPA.Filters
{
    public class ValidationFilters : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (context.ModelState.IsValid)
            {
                await next();
            }
            else
            {
                var errorsInModelState = context.ModelState
                    .Where(x => x.Value.Errors.Count > 0)
                    .ToDictionary(kvp => kvp.Key, kvp => kvp.Value.Errors.Select(x => x.ErrorMessage)).ToArray();

                List<ValidationErrorModel> errors = errorsInModelState.SelectMany(error => error.Value.Select(subError =>
                    new ValidationErrorModel
                    {
                        FieldName = error.Key.FromLowerCase(),
                        Message = subError
                    })).ToList();

                throw new ValidationException(errors);
            }
        }
    }
}
