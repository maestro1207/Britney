using BritneyAI.Server.Data;
using BritneyAI.Server.Models;
using MediatR;

namespace BritneyAI.Server.Features.Chat.Commands
{
    public class CreateConversationCommandHandler : IRequestHandler<CreateConversationCommand, Conversation>
    {
        private readonly ChatContext context;

        public CreateConversationCommandHandler(ChatContext context)
        {
            this.context = context;
        }

        public async Task<Conversation> Handle(CreateConversationCommand request, CancellationToken cancellationToken)
        {
            var conversation = new Conversation();
            this.context.Conversations.Add(conversation);
            await this.context.SaveChangesAsync(cancellationToken);
            return conversation;
        }
    }
}
