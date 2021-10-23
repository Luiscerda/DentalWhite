namespace DentalWhite.Models
{
    using DentalWhite.AccesoDatos;
    using System.Collections.Generic;

    public class CitaModel
    {
        Datos datos;

        public CitaModel()
        {
            datos = new Datos();
        }

        public int Add_Cita(Vw_Cita cita)
        {
            return datos.Add_Cita(cita);
        }

        public List<Vw_Cita> GetCitas()
        {
            return datos.GetCitas();
        }
    }
}