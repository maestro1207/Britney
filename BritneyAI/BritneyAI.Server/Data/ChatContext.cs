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
            modelBuilder.Entity<Conversation>()
                .HasMany(c => c.Messages)
                .WithOne()
                .HasForeignKey(m => m.ConversationId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
