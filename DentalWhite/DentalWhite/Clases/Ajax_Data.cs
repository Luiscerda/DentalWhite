using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DentalWhite.Clases
{
    public class Ajax_Data
    {
        public string Msj
        {
            get;
            set;
        }
        public string Html
        {
            get;
            set;
        }
        public bool Is_Error
        {
            get;
            set;
        }
        public int Order_Switch
        {
            get;
            set;
        }
        public string Url
        {
            get;
            set;
        }
        public object Objeto
        {
            get;
            set;
        }
    }
}