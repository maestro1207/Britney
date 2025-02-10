using BritneyAI.Server.Data;
using BritneyAI.Server.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace BritneyAI.Server.Features.Chat.Queries
{
    public class GetConversationQueryHandler : IRequestHandler<GetConversationQuery, Conversation>
    {
     
        private readonly ChatContext context;

        public GetConversationQueryHandler(ChatContext context)
        {
            this.context = context;
        }

        public async Task<Conversation> Handle(GetConversationQuery request, CancellationToken cancellationToken)
        {
            var conversation = await this.context.Conversations
                .Include(c => c.Messages)
                .FirstOrDefaultAsync(c => c.Id == request.ConversationId, cancellationToken);

            if (conversation is null)
            {
                throw new Exception("404");
            }

            return conversation;
        }
    }
}
