using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicoVisma.Entities.DTOS
{
    public class ResponseLoginDTO
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
    }
}
