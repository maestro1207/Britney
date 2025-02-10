using BritneyAI.Server.Models;
using MediatR;

namespace BritneyAI.Server.Features.Chat.Queries
{
    public class GetConversationQuery : IRequest<Conversation>
    {
        public Guid ConversationId { get; set; }
    }
}
