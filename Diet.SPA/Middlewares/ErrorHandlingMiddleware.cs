using System;
using System.Net;
using System.Threading.Tasks;
using Diet.Core.ErrorHandling.Exceptions;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Diet.SPA.Middlewares
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var statusCode = HttpStatusCode.InternalServerError;
            var serializerSettings = new JsonSerializerSettings();
            serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var responseContent = JsonConvert.SerializeObject(new { Message = "Unexpected error occured" }, serializerSettings);

            if (exception is NotFoundException)
            {
                statusCode = HttpStatusCode.NotFound;
                responseContent = JsonConvert.SerializeObject(new
                {
                    exception.Message
                }, serializerSettings);
            }
            else if (exception is ValidationException validationException)
            {
                statusCode = HttpStatusCode.BadRequest;
                responseContent = JsonConvert.SerializeObject(new
                {
                    validationException.Message,
                    validationException.Errors
                }, serializerSettings);
            }

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            return context.Response.WriteAsync(responseContent);
        }
    }
}
