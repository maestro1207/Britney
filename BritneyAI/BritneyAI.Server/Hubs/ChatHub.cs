using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace BritneyAI.Server.Hubs
{
    public class ChatHub : Hub
    {
        private static readonly ConcurrentDictionary<Guid, CancellationTokenSource> _cancellationTokens = new();

        public async Task BroadcastMessage(MessageDto message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }

        public static CancellationToken RegisterCancellationToken(Guid conversationId)
        {
            var cts = new CancellationTokenSource();
            _cancellationTokens[conversationId] = cts;
            return cts.Token;
        }

        public async Task CancelMessageGeneration(Guid conversationId)
        {
            if (_cancellationTokens.TryRemove(conversationId, out var cts))
            {
                cts.Cancel();
                await Clients.All.SendAsync("MessageGenerationCancelled", conversationId);
            }
        }
    }

    public class MessageDto
    {
        public string Id { get; set; }
        public string ConversationId { get; set; }
        public string Content { get; set; }
        public string Sender { get; set; }
        public string CreatedAt { get; set; }
    }
}
