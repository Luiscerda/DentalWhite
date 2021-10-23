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

        public List<TipoDocumento> GetTipoDocumentos()
        {
            return datos.GetTipoDocumentos();
        }
        public List<Departamentos> GetDepartamentos()
        {
            return datos.GetDepartamentos();
        }
        public List<Municipios> GetMunicipiosByCodDepartamento(string codDepartamento)
        {
            return datos.GetMunicipiosByCodDepartamento(codDepartamento);
        }
    }
}