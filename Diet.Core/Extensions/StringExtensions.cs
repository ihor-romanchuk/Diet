namespace Diet.Core.Extensions
{
    /// <summary>
    /// Provides extension methods for <see cref="string"/>
    /// </summary>
    public static class StringExtensions
    {
        /// <summary>
        /// Makes first letter of input string lower case.
        /// </summary>
        public static string FromLowerCase(this string value)
        {
            return string.IsNullOrEmpty(value) ? value : $"{char.ToLower(value[0])}{value.Substring(1)}";
        }
    }
}
