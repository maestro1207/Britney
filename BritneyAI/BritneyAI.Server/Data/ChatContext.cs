using BritneyAI.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BritneyAI.Server.Data
{
    public class ChatContext :DbContext
    {
        public ChatContext(DbContextOptions<ChatContext> options)
        : base(options) { }

        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Conversation>()
                .HasMany(c => c.Messages)
                .WithOne(m => m.Conversation)
                .HasForeignKey(m => m.ConversationId);

        }

    }
}
