using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicoVisma.Entities.DTOS
{
    public class ResponseDTO<T> where T : class
    {
        public T Data { get; set; }
        public bool IsError
        {
            get { return ErrorMessage != null; }
            set => IsError = value;
        }
        public string ErrorMessage { get; set; }
    }
}
