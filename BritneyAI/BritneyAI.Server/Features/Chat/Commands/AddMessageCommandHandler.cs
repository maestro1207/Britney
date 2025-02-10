using BritneyAI.Server.Data;
using BritneyAI.Server.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BritneyAI.Server.Features.Chat.Commands
{
    public class AddMessageCommandHandler : IRequestHandler<AddMessageCommand, Message>
    {
        private readonly ChatContext context;

        public AddMessageCommandHandler(ChatContext context)
        {
            this.context = context;
        }

        public async Task<Message> Handle(AddMessageCommand request, CancellationToken cancellationToken)
        {
            var conversation = await this.context.Conversations
                                         .FindAsync(new object[] { request.ConversationId }, cancellationToken);
            if (conversation is null)
            {
                throw new Exception("404");
            }

            var mesasge = new Message
            {
                Id = Guid.NewGuid(),
                ConversationId = request.ConversationId,
                Content = request.Content,
                Sender = request.Sender,
                CreatedAt = DateTime.UtcNow,
                Rating = Models.RatingValue.Neutral
            };

            this.context.Messages.Add(mesasge);

            await this.context.SaveChangesAsync(cancellationToken);

            return mesasge;
        }
    }
}
