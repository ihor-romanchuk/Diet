namespace Diet.Core.Helpers.Interfaces
{
    /// <summary>
    /// Provides methods for retrieving user data.
    /// </summary>
    public interface IUserHelper
    {
        /// <summary>
        /// Id of authenticated user.
        /// </summary>
        string UserId { get; }
    }
}
