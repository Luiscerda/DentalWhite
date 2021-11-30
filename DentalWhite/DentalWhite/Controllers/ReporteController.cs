using DentalWhite.AccesoDatos;
using DentalWhite.Clases;
using DentalWhite.Models;
using System.Web.Mvc;

namespace DentalWhite.Controllers
{
    public class ReporteController : Controller
    {
        // GET: Reporte
        public ActionResult Index()
        {
            return View();
        }

        [Route("Reporte/GetEdades")]
        [HttpPost]
        public JsonResult GetEdades(Usuarios userPost)
        {
            Ajax_Data retorno = new Ajax_Data();
            UsuarioModel model = new UsuarioModel();
            ReporteModel reporteModel = new ReporteModel();
            Usuarios UserValidate = model.GetUsuarioValidate(userPost.UserName, userPost.Password);
            if (UserValidate == null)
            {
                retorno.Is_Error = true;
                retorno.Msj = "Credenciales incorrectas";
                return Utilidades.ToJsonResult(retorno);
            }
            var edades = reporteModel.edadesResult();
            retorno.Objeto = edades;
            return Utilidades.ToJsonResult(retorno);
        }
    }
}