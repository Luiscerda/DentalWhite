using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DentalWhite.AccesoDatos;

namespace DentalWhite.Models
{
    public class DoctorModel
    {
        Datos datos;
        public DoctorModel()
        {
            datos = new Datos();
        }

        public int Add_Doctor(Vw_Doctor doctor)
        {
            return datos.Add_Doctor(doctor);
        }
        public Vw_Doctor GetDoctorByIdentificacion(string identificacion)
        {
            return datos.GetDoctorByIdentificacion(identificacion);
        }
        public List<Vw_Doctor> GetDoctores()
        {
            return datos.GetDoctores();
        }
        public int UpdateDoctor(Vw_Doctor doctor)
        {
            return datos.UpdateDoctor(doctor);
        }
    }
}