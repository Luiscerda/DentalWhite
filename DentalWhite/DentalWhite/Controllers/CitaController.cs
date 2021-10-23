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
    public class CitaController : Controller
    {
        // GET: Cita
        public ActionResult Asignar()
        {
            return View();
        }

        public ActionResult GetCitas()
        {
            return View();
        }

        [HttpPost]
        [Route("Cita/AsignarCita")]
        public JsonResult AsignarCita(Vw_Cita cita)
        {
            Ajax_Data Retorno = new Ajax_Data();
            CitaModel citaModel = new CitaModel();

            int resul = citaModel.Add_Cita(cita);
            if (resul == -1)
            {
                Retorno.Is_Error = true;
                Retorno.Msj = "Error";
            }
            else
            {
                Retorno.Is_Error = false;
                Retorno.Msj = "Cita asignada con exito";
            }


            return Utilidades.ToJsonResult(Retorno);
        }

        [HttpPost]
        [Route("Cita/GetCitas")]
        public JsonResult GetCitas(Usuarios User)
        {
            Ajax_Data result = new Ajax_Data();
            CitaModel citaModel = new CitaModel();
            UsuarioModel Um = new UsuarioModel();
            Usuarios UserValidate = Um.GetUsuarioValidate(User.UserName, User.Password);
            if (UserValidate == null)
            {
                result.Is_Error = true;
                result.Msj = "Credenciales incorrectas";
                return Utilidades.ToJsonResult(result);
            }
            List<Vw_Cita> pacientes = citaModel.GetCitas();
            pacientes.ForEach(w =>
            {
                w.SegundoNombre = string.IsNullOrEmpty(w.SegundoNombre) ? "" : w.SegundoNombre;
                w.PrimerNombre = w.PrimerNombre + " " + w.SegundoNombre;
                w.SegundoApelldo = string.IsNullOrEmpty(w.SegundoApelldo) ? "" : w.SegundoApelldo;
                w.PrimerApellido = w.PrimerApellido + " " + w.SegundoApelldo;
                w.SegundoNombrePaciente = string.IsNullOrEmpty(w.SegundoNombrePaciente) ? "" : w.SegundoNombrePaciente;
                w.PrimerNombrePaciente = w.PrimerNombrePaciente + " " + w.SegundoNombrePaciente;
                w.SegundoApellidoPaciente = string.IsNullOrEmpty(w.SegundoApellidoPaciente) ? "" : w.SegundoApellidoPaciente;
                w.PrimerApellidoPaciente = w.PrimerApellidoPaciente + " " + w.SegundoApellidoPaciente;
                w.CodEstado = Convert.ToDateTime(w.FechaCita).Day.ToString() + "/" + Convert.ToDateTime(w.FechaCita).Month.ToString() + "/" + Convert.ToDateTime(w.FechaCita).Year.ToString();
            });
            result.Objeto = pacientes;
            result.Is_Error = false;

            return Utilidades.ToJsonResult(result);
        }
    }
}