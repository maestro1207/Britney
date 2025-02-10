using BritneyAI.Server.Models;
using MediatR;

namespace BritneyAI.Server.Features.Chat.Commands
{
    public class AddMessageCommand : IRequest<Message>
    {
        public Guid ConversationId { get; set; }
        public required string Content { get; set; }
        public SenderType Sender { get; set; }
    }
}
