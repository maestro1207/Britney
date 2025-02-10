using BritneyAI.Server.Models;
using MediatR;

namespace BritneyAI.Server.Features.Chat.Commands
{
    public class CreateConversationCommand : IRequest<Conversation>
    {
    }
}
