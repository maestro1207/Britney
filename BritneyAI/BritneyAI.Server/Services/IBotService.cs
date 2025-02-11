namespace BritneyAI.Server.Services
{
    public interface IBotService
    {
        IAsyncEnumerable<string> GenerateBotResponseAsync(string input, CancellationToken cancellationToken);
    }
}
