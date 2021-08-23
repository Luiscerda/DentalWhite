using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using System.Threading.Tasks;

namespace DentalWhite.AccesoDatos
{
    public class Datos
    {
        #region Conexion
        DBDataContext DB = new DBDataContext(ConfigurationManager.ConnectionStrings["Conexion"].ConnectionString);

        public void Conectar()
        {
            DB = new DBDataContext(ConfigurationManager.ConnectionStrings["Conexion"].ConnectionString);
        }
        public void Desconectar()
        {
            DB.Refresh(System.Data.Linq.RefreshMode.OverwriteCurrentValues);
            DB.Dispose();
        }
        #endregion

        #region Usuarios

        public Vw_Usuarios GetUsuarioValidate(string userName, string password)
        {
            Conectar();
            Vw_Usuarios usuario = DB.Vw_Usuarios.FirstOrDefault(w => w.UserName.Trim() == userName.Trim() && w.Password.Trim() == password.Trim() && w.Activo == true);
            Desconectar();
            return usuario;
        }
        #endregion

        #region Comun
        public List<Vw_TipoDocumento> GetTipoDocumentos()
        {
            Conectar();
            List<Vw_TipoDocumento> tipoDocumentos = DB.Vw_TipoDocumento.ToList();
            Desconectar();
            return tipoDocumentos;
        }
        #endregion
    }
}
