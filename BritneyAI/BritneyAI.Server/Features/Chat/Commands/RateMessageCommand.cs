using BritneyAI.Server.Models;
using MediatR;

namespace BritneyAI.Server.Features.Chat.Commands
{
    public class RateMessageCommand : IRequest<Message?>
    {
        public Guid MessageId { get; set; }
        public RatingValue Rating { get; set; }
    }
}
