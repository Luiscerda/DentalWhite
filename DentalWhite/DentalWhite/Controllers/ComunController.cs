using DentalWhite.AccesoDatos;
using DentalWhite.Clases;
using DentalWhite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DentalWhite.Controllers
{
    public class ComunController : Controller
    {
        // GET: Comun
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Route("Comun/GetTipoDocumentos")]
        public JsonResult GetTipoDocumentos(Usuarios User)
        {
            Ajax_Data result = new Ajax_Data();
            ComunModel comunModel = new ComunModel();
            UsuarioModel Um = new UsuarioModel();
            Usuarios UserValidate = Um.GetUsuarioValidate(User.UserName, User.Password);
            if (UserValidate == null)
            {
                result.Is_Error = true;
                result.Msj = "Credenciales incorrectas";
                return Utilidades.ToJsonResult(result);
            }
            result.Objeto = comunModel.GetTipoDocumentos();
            result.Is_Error = false;

            return Utilidades.ToJsonResult(result);
        }

        [HttpPost]
        [Route("Comun/GetDepartamentos")]
        public JsonResult GetDepartamentos(Usuarios User)
        {
            Ajax_Data result = new Ajax_Data();
            ComunModel comunModel = new ComunModel();
            UsuarioModel Um = new UsuarioModel();
            Usuarios UserValidate = Um.GetUsuarioValidate(User.UserName, User.Password);
            if (UserValidate == null)
            {
                result.Is_Error = true;
                result.Msj = "Credenciales incorrectas";
                return Utilidades.ToJsonResult(result);
            }
            result.Objeto = comunModel.GetDepartamentos().OrderBy(c=>c.DescDepartamento);
            result.Is_Error = false;

            return Utilidades.ToJsonResult(result);
        }

        [HttpPost]
        [Route("Comun/GetMunicipiosByCodDepartamento")]
        public JsonResult GetMunicipiosByCodDepartamento(Usuarios User)
        {
            string codDepartamento = Request["CodDepar"];
            Ajax_Data result = new Ajax_Data();
            ComunModel model = new ComunModel();
            UsuarioModel Um = new UsuarioModel();
            Usuarios UserValidate = Um.GetUsuarioValidate(User.UserName, User.Password);
            if (UserValidate == null)
            {
                result.Is_Error = true;
                result.Msj = "Credenciales incorrectas";
                return Utilidades.ToJsonResult(result);
            }
            result.Objeto = model.GetMunicipiosByCodDepartamento(codDepartamento).OrderBy(c=>c.DescMunicipio);
            result.Is_Error = false;

            return Utilidades.ToJsonResult(result);
        }
    }
}