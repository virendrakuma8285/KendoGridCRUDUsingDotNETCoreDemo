using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationBasic
{
    using Microsoft.EntityFrameworkCore;
    public class EntityModelContext : DbContext
    {
        public EntityModelContext(DbContextOptions<EntityModelContext> options) : base(options)
        {

        }
        public DbSet<MyDetails> MyDetails { get; set; }
    }
}
