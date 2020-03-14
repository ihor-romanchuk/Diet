namespace Diet.Core.Configuration
{
    /// <summary>
    /// Configuration model for JSON Web Token settings.
    /// </summary>
    public class JwtSettings
    {
        /// <summary>
        /// Symmetric security key
        /// </summary>
        public string Key { get; set; }

        /// <summary>
        /// Token issuer
        /// </summary>
        public string Issuer { get; set; }

        /// <summary>
        /// Expiration time in seconds
        /// </summary>
        public int ExpireSeconds { get; set; }
    }
}
