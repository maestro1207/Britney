using BritneyAI.Server.Models;

namespace BritneyAI.Server.Features.Chat.Requests
{
    public class CreateMessageRequest
    {
        public required string Content { get; set; }
        public SenderType Sender { get; set; }
    }
}
