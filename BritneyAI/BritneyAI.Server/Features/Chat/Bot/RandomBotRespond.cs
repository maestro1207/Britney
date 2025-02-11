
namespace BritneyAI.Server.Features.Chat.Bot
{
    public class RandomBotRespond : IBotRespond
    {
        private static readonly Random _random = new();
        private const string Letters = "Uw";

        private static string GenerateWord(int length) =>
              new string(Enumerable.Range(0, length)
                                   .Select(_ => Letters[_random.Next(Letters.Length)])
                                   .ToArray());

        public Task<string> RandomRespondAsync(string userMessage, Guid conversationId)
        {
            int wordCount = _random.Next(1, 200);
            string response = string.Join(" ", Enumerable.Range(0, wordCount)
                                                         .Select(_ => GenerateWord(_random.Next(1, 20))));

            return Task.FromResult(response);
        }
    }
}
