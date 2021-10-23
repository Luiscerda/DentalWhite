using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DentalWhite.AccesoDatos;
using DentalWhite.Clases;
using DentalWhite.Models;

namespace DentalWhite.Controllers
{
    public class DoctorController : Controller
    {
        // GET: Doctor
        public ActionResult AddDoctor()
        {
            return View();
        }
        public ActionResult GetDoctor()
        {
            return View();
        }

        [HttpPost]
        [Route("Doctor/SaveDoctor")]
        public JsonResult SaveDoctor(Vw_Doctor doctor)
        {
            Ajax_Data Retorno = new Ajax_Data();
            DoctorModel doctorModel = new DoctorModel();

            if (!ValidarDatos(doctor))
            {
                Retorno.Is_Error = true;
                Retorno.Msj = "Aun faltan datos por digitar";
                return Utilidades.ToJsonResult(Retorno);
            }
            Vw_Doctor _doctor = doctorModel.GetDoctorByIdentificacion(doctor.Identificacion);
            if (_doctor == null)
            {
                int resul = doctorModel.Add_Doctor(doctor);
                if (resul == -1)
                {
                    Retorno.Is_Error = true;
                    Retorno.Msj = "Error al intentar guardar al doctor";
                }
                else
                {
                    Retorno.Is_Error = false;
                    Retorno.Msj = "Doctor registrado con exito";
                }
            }
            else
            {
                Retorno.Is_Error = true;
                Retorno.Msj = "El doctor que trata de registrar ya existe";
            }


            return Utilidades.ToJsonResult(Retorno);
        }

        [HttpPost]
        [Route("Doctor/GetDoctores")]
        public JsonResult GetDoctores(Usuarios User)
        {
            Ajax_Data result = new Ajax_Data();
            DoctorModel doctorModel = new DoctorModel();
            UsuarioModel Um = new UsuarioModel();
            Usuarios UserValidate = Um.GetUsuarioValidate(User.UserName, User.Password);
            if (UserValidate == null)
            {
                result.Is_Error = true;
                result.Msj = "Credenciales incorrectas";
                return Utilidades.ToJsonResult(result);
            }
            List<Vw_Doctor> doctores = doctorModel.GetDoctores();
            doctores.ForEach(w =>
            {
                w.SegundoNombre = string.IsNullOrEmpty(w.SegundoNombre) ? "" : w.SegundoNombre;
                w.PrimerNombre = w.PrimerNombre + " " + w.SegundoNombre;
                w.SegundoApelldo = string.IsNullOrEmpty(w.SegundoApelldo) ? "" : w.SegundoApelldo;
                w.PrimerApellido = w.PrimerApellido + " " + w.SegundoApelldo;
                
            });
            result.Objeto = doctores;
            result.Is_Error = false;

            return Utilidades.ToJsonResult(result);
        }

        [HttpPost]
        [Route("Doctor/UpdateDoctor")]
        public JsonResult UpdateDoctor(Vw_Doctor doctor)
        {
            Ajax_Data Retorno = new Ajax_Data();
            DoctorModel doctorModel = new DoctorModel();

            int resul = doctorModel.UpdateDoctor(doctor);
            if (resul == -1)
            {
                Retorno.Is_Error = true;
                Retorno.Msj = "No se pudo modificar el doctor";
            }
            else
            {
                Retorno.Is_Error = false;
                Retorno.Msj = "Doctor modificado con exito";
            }


            return Utilidades.ToJsonResult(Retorno);
        }

        [HttpPost]
        [Route("Doctor/GetDoctorById")]
        public JsonResult GetDoctorById(Usuarios User)
        {
            string id = Request["ID"];
            Ajax_Data result = new Ajax_Data();
            DoctorModel doctorModel = new DoctorModel();
            UsuarioModel Um = new UsuarioModel();
            Usuarios UserValidate = Um.GetUsuarioValidate(User.UserName, User.Password);
            if (UserValidate == null)
            {
                result.Is_Error = true;
                result.Msj = "Credenciales incorrectas";
                return Utilidades.ToJsonResult(result);
            }
            Vw_Doctor doctor = doctorModel.GetDoctorByIdentificacion(id);
            if (doctor != null)
            {
                result.Objeto = doctor;
                result.Is_Error = false;
            }
            else
            {
                result.Msj = "Identificacion invalida, verifique el id";
            }
            

            return Utilidades.ToJsonResult(result);
        }

        public bool ValidarDatos(Vw_Doctor doctor)
        {
            bool isValid = true;
            if (string.IsNullOrEmpty(doctor.Correo))
            {
                isValid = false;
            }
            if (string.IsNullOrEmpty(doctor.Identificacion))
            {
                isValid = false;
            }
            if (string.IsNullOrEmpty(doctor.PrimerNombre))
            {
                isValid = false;
            }
            if (string.IsNullOrEmpty(doctor.PrimerApellido))
            {
                isValid = false;
            }

            return isValid;
        }
    }
}