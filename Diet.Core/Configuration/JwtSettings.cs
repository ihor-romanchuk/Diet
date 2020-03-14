using System;
using System.Collections.Generic;
using System.Text;

namespace Diet.Core.Configuration
{
    public class JwtSettings
    {
        public string Key { get; set; }
        public string Issuer { get; set; }
        public int ExpireSeconds { get; set; }
    }
}
