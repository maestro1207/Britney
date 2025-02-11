
using System.Runtime.CompilerServices;

namespace BritneyAI.Server.Services
{
    public class BotService : IBotService
    {
        public async IAsyncEnumerable<string> GenerateBotResponseAsync(string input, [EnumeratorCancellation] CancellationToken cancellationToken)
        {
            string simulatedResponse = "asdasdasd";

            var fragments = simulatedResponse.Split(new[] { ". " }, StringSplitOptions.RemoveEmptyEntries);

            foreach (var fragment in fragments)
            {
                await Task.Delay(1, cancellationToken);
                yield return fragment.Trim() + ".";
            }
        }
    }
}
