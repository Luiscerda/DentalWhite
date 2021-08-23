using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DentalWhite.AccesoDatos;

namespace DentalWhite.Models
{
    public class ComunModel
    {
        Datos datos;
        public ComunModel()
        {
            datos = new Datos();
        }

        public List<Vw_TipoDocumento> GetTipoDocumentos()
        {
            return datos.GetTipoDocumentos();
        }
    }
}