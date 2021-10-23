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
    public class PacienteController : Controller
    {
        // GET: Paciente
        public ActionResult AddPatient()
        {
            return View();
        }
        public ActionResult GetPatients()
        {
            return View();
        }

        [HttpPost]
        [Route("Paciente/SavePaciente")]
        public JsonResult SavePaciente(Vw_Paciente paciente)
        {
            Ajax_Data Retorno = new Ajax_Data();
            PacienteModel pacienteModel = new PacienteModel();

            Vw_Paciente pacienteConsultado = pacienteModel.GetPacienteByIdentificacion(paciente.Identificacion);
            if (pacienteConsultado == null)
            {
                int resul = pacienteModel.Add_Paciente(paciente);
                if (resul == -1)
                {
                    Retorno.Is_Error = true;
                    Retorno.Msj = "Error";
                }
                else
                {
                    Retorno.Is_Error = false;
                    Retorno.Msj = "Paciente registrado con exito";
                }
            }
            else
            {
                Retorno.Is_Error = true;
                Retorno.Msj = "El paciente que trata de registrar ya existe";
            }


            return Utilidades.ToJsonResult(Retorno);
        }

        [HttpPost]
        [Route("Paciente/GetPacientes")]
        public JsonResult GetPacientes(Usuarios User)
        {
            Ajax_Data result = new Ajax_Data();
            PacienteModel pacienteModel = new PacienteModel();
            UsuarioModel Um = new UsuarioModel();
            Usuarios UserValidate = Um.GetUsuarioValidate(User.UserName, User.Password);
            if (UserValidate == null)
            {
                result.Is_Error = true;
                result.Msj = "Credenciales incorrectas";
                return Utilidades.ToJsonResult(result);
            }
            List<Vw_Paciente> pacientes = pacienteModel.GetPacientes();
            pacientes.ForEach(w =>
            {
                w.SegundoNombre = string.IsNullOrEmpty(w.SegundoNombre) ? "" : w.SegundoNombre;
                w.PrimerNombre = w.PrimerNombre + " " + w.SegundoNombre;
                w.SegundoApelldo = string.IsNullOrEmpty(w.SegundoApelldo) ? "" : w.SegundoApelldo;
                w.PrimerApellido = w.PrimerApellido + " " + w.SegundoApelldo;
            });
            result.Objeto = pacientes;
            result.Is_Error = false;

            return Utilidades.ToJsonResult(result);
        }

        [HttpPost]
        [Route("Paciente/UpdatePaciente")]
        public JsonResult UpdatePaciente(Vw_Paciente paciente)
        {
            Ajax_Data Retorno = new Ajax_Data();
            PacienteModel pacienteModel = new PacienteModel();

            int resul = pacienteModel.UpdatePaciente(paciente);
            if (resul == -1)
            {
                Retorno.Is_Error = true;
                Retorno.Msj = "No se pudo modificar el paciente";
            }
            else
            {
                Retorno.Is_Error = false;
                Retorno.Msj = "Paciente modificado con exito";
            }


            return Utilidades.ToJsonResult(Retorno);
        }
    }
}