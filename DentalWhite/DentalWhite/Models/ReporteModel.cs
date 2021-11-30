using System;
using System.Collections.Generic;
using System.Linq;
using DentalWhite.AccesoDatos;
using System.Web;

namespace DentalWhite.Models
{
    public class ReporteModel
    {
        Datos datos;

        public ReporteModel()
        {
            datos = new Datos();
        }
        public List<EdadesResult> edadesResult()
        {
            return datos.edadesResult();
        }
    }
}