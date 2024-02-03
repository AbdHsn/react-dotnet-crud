using Microsoft.EntityFrameworkCore;
using Models.Entities;

namespace DBContext
{
    public class TestDBContext : DbContext
    {
        public DbSet<Service> Service { get; set; }

        public TestDBContext(DbContextOptions<TestDBContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Service>(entity =>
            {
                entity.HasKey(e => e.ServiceId);
            });
        }
    }

}
