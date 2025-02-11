using BritneyAI.Server.Data;
using BritneyAI.Server.Models;
using MediatR;

namespace BritneyAI.Server.Features.Chat.Commands
{
    public class RateMessageCommandHandler : IRequestHandler<RateMessageCommand, Message?>
    {
        private readonly ChatContext _context;

        public RateMessageCommandHandler(ChatContext context)
        {
            _context = context;
        }

        public async Task<Message?> Handle(RateMessageCommand request, CancellationToken cancellationToken)
        {
            var message = await _context.Messages.FindAsync(new object[] { request.MessageId }, cancellationToken);
            if (message is null || message.Sender != SenderType.Bot)
            {
                return null;
            }

            message.Rating = request.Rating;
            _context.Messages.Update(message);
            await _context.SaveChangesAsync(cancellationToken);

            return message;
        }
    }
}
