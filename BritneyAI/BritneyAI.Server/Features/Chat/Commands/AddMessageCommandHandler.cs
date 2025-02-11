using BritneyAI.Server.Data;
using BritneyAI.Server.Features.Chat.Bot;
using BritneyAI.Server.Hubs;
using BritneyAI.Server.Models;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace BritneyAI.Server.Features.Chat.Commands
{
    public class AddMessageCommandHandler : IRequestHandler<AddMessageCommand, Message>
    {
        private readonly ChatContext _context;
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly BotRespondService _botRespodnService;

        public AddMessageCommandHandler(ChatContext context, IHubContext<ChatHub> hubContext, BotRespondService botRespondService)
        {
            _context = context;
            _hubContext = hubContext;
            _botRespodnService = botRespondService;
        }

        public async Task<Message> Handle(AddMessageCommand request, CancellationToken cancellationToken)
        {
            var conversation = await _context.Conversations.FindAsync(new object[] { request.ConversationId }, cancellationToken);
            if (conversation is null)
            {
                throw new Exception("404");
            }

            var userMessage = new Message
            {
                Id = Guid.NewGuid(),
                ConversationId = request.ConversationId,
                Content = request.Content,
                Sender = request.Sender,
                CreatedAt = DateTime.UtcNow
            };

            _context.Messages.Add(userMessage);
            await _context.SaveChangesAsync(cancellationToken);

            var userMessageDto = new MessageDto
            {
                Id = userMessage.Id.ToString(),
                ConversationId = userMessage.ConversationId.ToString(),
                Content = userMessage.Content,
                Sender = userMessage.Sender.ToString(),
                CreatedAt = userMessage.CreatedAt.ToString("o")
            };

            await _hubContext.Clients.All.SendAsync("ReceiveMessage", userMessageDto, cancellationToken);

            if (request.Sender == SenderType.User)
            {
                await HandleBotResponse(request.ConversationId, request.Content, cancellationToken);
            }

            return userMessage;
        }

        private async Task HandleBotResponse(Guid conversationId, string userMessage, CancellationToken cancellationToken)
        {
            string botResnpond = await _botRespodnService.GetBotRespondAsync(userMessage, conversationId);

            var botMessage = new Message
            {
                Id = Guid.NewGuid(),
                ConversationId = conversationId,
                Content = string.Empty,
                Sender = SenderType.Bot,
                CreatedAt = DateTime.UtcNow
            };

            _context.Messages.Add(botMessage);
            await _context.SaveChangesAsync(cancellationToken);

            var botMessageDto = new MessageDto
            {
                Id = botMessage.Id.ToString(),
                ConversationId = botMessage.ConversationId.ToString(),
                Content = string.Empty,
                Sender = botMessage.Sender.ToString(),
                CreatedAt = botMessage.CreatedAt.ToString("o")
            };

            var token = ChatHub.RegisterCancellationToken(conversationId);

            try
            {
                for (int i = 0; i < botResnpond.Length; i++)
                {
                    if (token.IsCancellationRequested)
                    {
                        break;
                    }

                    botMessage.Content = botResnpond.Substring(0, i + 1);
                    botMessageDto.Content = botMessage.Content;

                    await _hubContext.Clients.All.SendAsync("ReceiveMessage", botMessageDto, cancellationToken);

                    await Task.Delay(25, cancellationToken);
                }
            }
            catch (Exception)
            {
            }
            finally
            {
                _context.Messages.Update(botMessage);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
