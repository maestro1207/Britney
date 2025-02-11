namespace BritneyAI.Server.Features.Chat.Bot
{
    public class BotRespondService
    {
        private readonly IBotRespond _respondRandomizer;

        public BotRespondService(IBotRespond respondRandomizer)
        {
            _respondRandomizer = respondRandomizer;
        }

        public async Task<string> GetBotRespondAsync(string userMessage, Guid conversationId)
        {
            return await _respondRandomizer.RandomRespondAsync(userMessage, conversationId);
        }
    }
}
