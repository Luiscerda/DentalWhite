using DentalWhite.AccesoDatos;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DentalWhite.Clases
{
    public static class Utilidades
    {
        public static JsonResult ToJsonResult(Ajax_Data result)
        {
            JsonResult jr = new JsonResult();
            jr.Data = result;
            jr.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            jr.MaxJsonLength = int.MaxValue;
            jr.RecursionLimit = int.MaxValue;
            return jr;
        }

        public static Vw_Usuarios Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            Vw_Usuarios User = JsonConvert.DeserializeObject<Vw_Usuarios>(System.Text.Encoding.UTF8.GetString(base64EncodedBytes));
            return User;
        }
    }
}