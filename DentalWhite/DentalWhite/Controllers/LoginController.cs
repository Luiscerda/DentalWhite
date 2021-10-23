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
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        [Route("Login/Login")]
        [HttpPost]
        public JsonResult Login(Usuarios userPost)
        {
            Ajax_Data retorno = new Ajax_Data();
            UsuarioModel model = new UsuarioModel();
            string userName = userPost.UserName;
            string password = userPost.Password;
            if (!string.IsNullOrEmpty(userName) && !string.IsNullOrEmpty(password))
            {
                Usuarios usuario = model.GetUsuarioValidate(userName,password);
                if (usuario != null)
                {
                    retorno.Objeto = usuario;
                    retorno.Is_Error = false;
                    retorno.Url = "/Home/Index";
                }
                else
                {
                    retorno.Is_Error = true;
                    retorno.Msj = "Usuario y/o contraseña incorrectos";
                }
            }
            else
            {
                retorno.Is_Error = true;
                retorno.Msj = "Usuario y/o contraseña no contienen datos";
            }
            return Utilidades.ToJsonResult(retorno);
        }       
    }
}