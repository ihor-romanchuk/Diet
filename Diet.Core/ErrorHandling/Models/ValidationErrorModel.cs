namespace Diet.Core.ErrorHandling.Models
{
    /// <summary>
    /// Model for single validation error.
    /// </summary>
    public class ValidationErrorModel
    {
        /// <summary>
        /// Actual name of the field.
        /// </summary>
        public string FieldName { get; set; }

        /// <summary>
        /// User friendly error message
        /// </summary>
        public string Message { get; set; }

    }
}
