namespace BritneyAI.Server.Models
{
    public class Message
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid ConversationId { get; set; }
        public required string Content { get; set; }
        public MessageType MessageType { get; set; } = MessageType.Text;
        public SenderType Sender { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public RatingValue Rating { get; set; } = RatingValue.Neutral;
    }

    public enum SenderType
    {
        User,
        Bot
    }

    public enum RatingValue
    {
        Neutral,
        Down,
        Up
    }

    public enum MessageType
    {
        Text,
        Image,
        File,
        Event
    }
}
