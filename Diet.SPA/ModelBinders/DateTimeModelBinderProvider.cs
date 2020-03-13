using System;
using System.Globalization;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Diet.SPA.ModelBinders
{
    public class DateTimeModelBinderProvider : IModelBinderProvider
    {
        internal static readonly DateTimeStyles SupportedStyles = DateTimeStyles.AdjustToUniversal | DateTimeStyles.AllowWhiteSpaces;

        /// <inheritdoc />
        public IModelBinder GetBinder(ModelBinderProviderContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            var modelType = context.Metadata.UnderlyingOrModelType;
            var loggerFactory = context.Services.GetRequiredService<ILoggerFactory>();
            if (modelType == typeof(DateTime))
            {
                return new UtcAwareDateTimeModelBinder(SupportedStyles, loggerFactory);
            }

            return null;
        }
    }
}
