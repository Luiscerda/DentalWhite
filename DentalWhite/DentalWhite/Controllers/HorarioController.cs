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
    public class HorarioController : Controller
    {
        // GET: Horario
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Route("Horario/GetHoras")]
        public JsonResult GetHoras(Vw_Usuarios User)
        {
            Ajax_Data result = new Ajax_Data();
            HoraModel horaModel = new HoraModel();
            UsuarioModel Um = new UsuarioModel();
            Vw_Usuarios UserValidate = Um.GetUsuarioValidate(User.UserName, User.Password);
            if (UserValidate == null)
            {
                result.Is_Error = true;
                result.Msj = "Credenciales incorrectas";
                return Utilidades.ToJsonResult(result);
            }
            result.Objeto = horaModel.GetHoras();
            result.Is_Error = false;

            return Utilidades.ToJsonResult(result);
        }

        [HttpPost]
        [Route("Horario/SaveHorario")]
        public JsonResult SaveHorario(Vw_Horarios horario)
        {
            Ajax_Data Retorno = new Ajax_Data();
            HoraModel horaModel = new HoraModel();

            Vw_Horarios _horario = horaModel.GetHorarioByIdentificacionAndCod(horario.Identificacion,horario.CodHora);
            if (_horario == null)
            {
                int resul = horaModel.Add_Horario(horario);
                if (resul == -1)
                {
                    Retorno.Is_Error = true;
                    Retorno.Msj = "Error al intentar guardar el horario";
                }
                else
                {
                    Retorno.Is_Error = false;
                    Retorno.Msj = "Horario registrado con exito";
                }
            }
            else
            {
                Retorno.Is_Error = true;
                Retorno.Msj = "El doctor ya tiene ese horario registrado";
            }


            return Utilidades.ToJsonResult(Retorno);
        }

        [HttpPost]
        [Route("Horario/GetHorarios")]
        public JsonResult GetHorarios(Vw_Usuarios User)
        {
            Ajax_Data result = new Ajax_Data();
            HoraModel horaModel = new HoraModel();
            UsuarioModel Um = new UsuarioModel();
            Vw_Usuarios UserValidate = Um.GetUsuarioValidate(User.UserName, User.Password);
            if (UserValidate == null)
            {
                result.Is_Error = true;
                result.Msj = "Credenciales incorrectas";
                return Utilidades.ToJsonResult(result);
            }
            List<Vw_Horarios> horarios = horaModel.Get_Horarios();
            horarios.ForEach(w =>
            {
                w.SegundoNombre = string.IsNullOrEmpty(w.SegundoNombre) ? "" : w.SegundoNombre;
                w.PrimerNombre = w.PrimerNombre + " " + w.SegundoNombre;
                w.SegundoApellido = string.IsNullOrEmpty(w.SegundoApellido) ? "" : w.SegundoApellido;
                w.PrimerApellido = w.PrimerApellido + " " + w.SegundoApellido;

            });
            result.Objeto = horarios;
            result.Is_Error = false;

            return Utilidades.ToJsonResult(result);
        }

        [HttpPost]
        [Route("Horario/GetHorariosByIdentificacion")]
        public JsonResult GetHorariosByIdentificacion(Vw_Usuarios User)
        {
            string identificacion = Request["ID"];
            Ajax_Data result = new Ajax_Data();
            HoraModel model = new HoraModel();
            UsuarioModel Um = new UsuarioModel();
            Vw_Usuarios UserValidate = Um.GetUsuarioValidate(User.UserName, User.Password);
            if (UserValidate == null)
            {
                result.Is_Error = true;
                result.Msj = "Credenciales incorrectas";
                return Utilidades.ToJsonResult(result);
            }
            result.Objeto = model.Get_HorariosByIdentificacion(identificacion);
            result.Is_Error = false;

            return Utilidades.ToJsonResult(result);
        }
    }
}