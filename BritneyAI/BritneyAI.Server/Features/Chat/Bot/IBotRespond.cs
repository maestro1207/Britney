namespace BritneyAI.Server.Features.Chat.Bot
{
    public interface IBotRespond
    {
        Task<string> RandomRespondAsync(string userMessage, Guid conversationId);
    }
}
