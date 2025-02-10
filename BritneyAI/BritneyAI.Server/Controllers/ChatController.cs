using Azure.Core;
using BritneyAI.Server.Features.Chat.Commands;
using BritneyAI.Server.Features.Chat.Queries;
using BritneyAI.Server.Features.Chat.Requests;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BritneyAI.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IMediator mediator;

        public ChatController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost("conversations")]
        public async Task<IActionResult> CreateConversation()
        {
            var command = new CreateConversationCommand();
            var conversation = await this.mediator.Send(command);
            return CreatedAtAction(nameof(GetConversation), new { conversationId = conversation.Id }, conversation);
        }


        [HttpGet("conversations/{conversationId}")]
        public async Task<IActionResult> GetConversation(Guid conversationId)
        {
            var query = new GetConversationQuery { ConversationId = conversationId };
            var conversation = await this.mediator.Send(query);

            if (conversation == null)
            {
                return NotFound();
            }

            return Ok(conversation);
        }

        [HttpPost("conversations/{conversationId}/messages")]
        public async Task<IActionResult> AddMessage(Guid conversationId, [FromBody] CreateMessageRequest request)
        {
            var command = new AddMessageCommand
            {
                ConversationId = conversationId,
                Content = request.Content,
                Sender = request.Sender
            };

            var response = await this.mediator.Send(command);
            return Ok(response);
        }

    }
}
