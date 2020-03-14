using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Diet.SPA.Filters
{
    public class ErrorModel
    {
        public string FieldName { get; set; } // actual name of the field

        public string Message { get; set; } // user friendly error message

    }
}
