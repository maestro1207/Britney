using BritneyAI.Server.Features.Chat.Commands;
using BritneyAI.Server.Features.Chat.Requests;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BritneyAI.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ChatController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("conversations")]
        public async Task<IActionResult> CreateConversation()
        {
            var response = await _mediator.Send(new CreateConversationCommand());
            return Ok(response);
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

            var response = await _mediator.Send(command);

            return Ok(response);
        }


        [HttpPost("messages/{messageId}/rate")]
        public async Task<IActionResult> RateMessage(Guid messageId, [FromBody] RateMessageRequest request)
        {
            var command = new RateMessageCommand
            {
                MessageId = messageId,
                Rating = request.Rating
            };

            var response = await _mediator.Send(command);
            return response != null ? Ok(response) : NotFound();
        }
    }
}


