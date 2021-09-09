using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DentalWhite.AccesoDatos;

namespace DentalWhite.Models
{
    public class HoraModel
    {
        Datos datos;
        public HoraModel()
        {
            datos = new Datos();
        }
        public List<Vw_Hora> GetHoras()
        {
            return datos.GetHoras();
        }
        public int Add_Horario(Vw_Horarios horario)
        {
            return datos.Add_Horario(horario);
        }
        public Vw_Horarios GetHorarioByIdentificacionAndCod(string identificacion, string codHora)
        {
            return datos.GetHorarioByIdentificacionAndCod(identificacion, codHora);
        }
        public List<Vw_Horarios> Get_Horarios()
        {
            return datos.Get_Horarios();
        }
        public List<Vw_Horarios> Get_HorariosByIdentificacion(string identificacion)
        {
            return datos.Get_HorariosByIdentificacion(identificacion);
        }
    }
}