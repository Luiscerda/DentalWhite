using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DentalWhite.AccesoDatos;

namespace DentalWhite.Models
{
    public class UsuarioModel
    {
        Datos datos;
        public UsuarioModel()
        {
            datos = new Datos();
        }

        public Usuarios GetUsuarioValidate(string userName,string password)
        {
            return datos.GetUsuarioValidate(userName,password);
        }
    }
}