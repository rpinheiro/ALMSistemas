using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using ALMSistemas.Models;

namespace ALMSistemas.Models.Context
{
    public class ALMContext : DbContext
    {
        #region|Propriedades|
        public DbSet<Usuario> Usuarios { get; set; }
        #endregion|Propriedades|

        #region|Construtor|
        public ALMContext()
            : base("DefaultConnection")
        {
        }
        #endregion|Construtor|

    }
}