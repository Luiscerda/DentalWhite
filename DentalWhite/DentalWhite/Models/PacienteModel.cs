using DentalWhite.AccesoDatos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DentalWhite.Models
{
    public class PacienteModel
    {
        Datos datos;
        public PacienteModel()
        {
            datos = new Datos();
        }

        public int Add_Paciente(Vw_Paciente paciente)
        {
            return datos.Add_Paciente(paciente);
        }
        public Vw_Paciente GetPacienteByIdentificacion(string identificacion)
        {
            return datos.GetPacienteByIdentificacion(identificacion);
        }
        public List<Vw_Paciente> GetPacientes()
        {
            return datos.GetPacientes();
        }
    }
}