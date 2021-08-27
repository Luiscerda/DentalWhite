using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using System.Threading.Tasks;
using System.Transactions;
using System.Reflection;
using System.IO;
using Newtonsoft.Json;

namespace DentalWhite.AccesoDatos
{
    public class Datos
    {
        #region Conexion
        DBDataContext DB = new DBDataContext(ConfigurationManager.ConnectionStrings["Conexion"].ConnectionString);
        public static string _LOGPATH = "";
        public void Conectar()
        {
            DB = new DBDataContext(ConfigurationManager.ConnectionStrings["Conexion"].ConnectionString);
        }
        public void Desconectar()
        {
            DB.Refresh(System.Data.Linq.RefreshMode.OverwriteCurrentValues);
            DB.Dispose();
        }
        public static void WriteExceptionLog(Exception ex, string Json = null)
        {
            if (!Directory.Exists(_LOGPATH + "\\" + DateTime.Now.ToShortDateString().Replace("/", "")))
            {
                Directory.CreateDirectory(_LOGPATH + "\\" + DateTime.Now.ToShortDateString().Replace("/", ""));
            };

            File.WriteAllText(_LOGPATH + "\\" + DateTime.Now.ToShortDateString().Replace("/", "") + "\\" + DateTime.Now.TimeOfDay.Ticks.ToString() + ".txt", JsonConvert.SerializeObject(ex.Message) + "..." + Json);
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
        public List<Vw_Departamentos> GetDepartamentos()
        {
            Conectar();
            List<Vw_Departamentos> departamentos = DB.Vw_Departamentos.ToList();
            Desconectar();
            return departamentos;
        }
        public List<Vw_Municipios> GetMunicipiosByCodDepartamento(string codDepartamento)
        {
            Conectar();
            List<Vw_Municipios> municipios = DB.Vw_Municipios.Where(c => c.CodDepartamento.Trim() == codDepartamento.Trim()).ToList();
            Desconectar();
            return municipios;
        }
        #endregion

        #region TimeTransactionScope
        private void SetTransactionManagerField(string fieldName, object value)
        {
            typeof(TransactionManager).GetField(fieldName, BindingFlags.NonPublic | BindingFlags.Static).SetValue(null, value);
        }

        public TransactionScope CreateTransactionScope(TimeSpan timeout)
        {
            SetTransactionManagerField("_cachedMaxTimeout", true);
            SetTransactionManagerField("_maximumTimeout", timeout);
            return new TransactionScope(TransactionScopeOption.RequiresNew, timeout);
        }

        #endregion

        #region Paciente
        public int Add_Paciente(Vw_Paciente paciente)
        {
            int result = 0;
            try
            {
                this.Conectar();
                using (TransactionScope tran = CreateTransactionScope(TimeSpan.FromMinutes(1800)))
                {
                    try
                    {
                        int a = (int)DB.sp_Add_Paciente(paciente.CodTipoDoc, paciente.Identificacion, paciente.PrimerNombe, paciente.SegundoNombre,
                            paciente.PrimerApellido, paciente.SegundoApellido, paciente.Edad, paciente.FechaNacimiento, paciente.Celular, paciente.Telefono,
                            paciente.Correo, paciente.CodDepartamento, paciente.CodMunicipio, paciente.Barrio, paciente.Direccion, true, paciente.UserReg, DateTime.Now).FirstOrDefault().Id;

                        int b = (int)DB.sp_Add_Usuario(paciente.Identificacion, "DW2021", paciente.PrimerNombe, paciente.PrimerApellido,
                            paciente.Correo, paciente.Celular, "002", true, paciente.Identificacion, DateTime.Now, paciente.UserReg).FirstOrDefault().Id;

                        DB.SubmitChanges();
                        tran.Complete();
                        result = 1;
                    }
                    catch (Exception exe)
                    {
                        Transaction.Current.Rollback();
                        WriteExceptionLog(exe);
                        result = -1;
                    }
                }
                Desconectar();
            }
            catch (Exception ex)
            {
                result = -1;
                WriteExceptionLog(ex);
            }
            return result;
        }
        public Vw_Paciente GetPacienteByIdentificacion(string identificacion)
        {
            Conectar();
            Vw_Paciente paciente = DB.Vw_Paciente.Where(c => c.Identificacion.Trim() == identificacion.Trim()).FirstOrDefault();
            Desconectar();
            return paciente;
        }
        public List<Vw_Paciente> GetPacientes()
        {
            Conectar();
            List<Vw_Paciente> pacientes = DB.Vw_Paciente.ToList();
            Desconectar();
            return pacientes;
        }
        public int UpdatePaciente(Vw_Paciente paciente)
        {
            int result = 0;
            try
            {
                this.Conectar();
                using (TransactionScope tran = new TransactionScope())
                {
                    try
                    {
                        Vw_Paciente _paciente = DB.Vw_Paciente.Where(c => c.Identificacion.Trim() == paciente.Identificacion.Trim()).FirstOrDefault();
                        result = DB.sp_Upd_Paciente(paciente.Celular, paciente.Telefono, paciente.Correo, paciente.CodDepartamento,
                            paciente.CodMunicipio, paciente.Barrio, paciente.Direccion, paciente.UserReg, DateTime.Now, _paciente.IdPaciente);
                        int a = DB.sp_Upd_Usuario(paciente.Celular, paciente.Correo, paciente.UserReg, DateTime.Now, paciente.Identificacion);

                        DB.SubmitChanges();
                        tran.Complete();
                        result = 1;
                    }
                    catch (Exception exe)
                    {
                        Transaction.Current.Rollback();
                        WriteExceptionLog(exe);
                        result = -1;
                    }
                }
                Desconectar();
            }
            catch (Exception ex)
            {
                result = -1;
                WriteExceptionLog(ex);
            }
            return result;
        }
        #endregion

        #region Doctor
        public int Add_Doctor(Vw_Doctor doctor)
        {
            int result = 0;
            try
            {
                this.Conectar();
                using (TransactionScope tran = CreateTransactionScope(TimeSpan.FromMinutes(1800)))
                {
                    try
                    {
                        int a = (int)DB.sp_Add_Doctor(doctor.CodTipoDoc, doctor.Identificacion, doctor.PrimerNombe, doctor.SegundoNombre,
                            doctor.PrimerApellido, doctor.SegundoApellido, doctor.Edad, doctor.FechaNacimiento, doctor.Celular, doctor.Telefono,
                            doctor.Correo, doctor.CodDepartamento, doctor.CodMunicipio, doctor.Barrio, doctor.Direccion, true, doctor.UserReg, DateTime.Now).FirstOrDefault().Id;


                        DB.SubmitChanges();
                        tran.Complete();
                        result = 1;
                    }
                    catch (Exception exe)
                    {
                        Transaction.Current.Rollback();
                        WriteExceptionLog(exe);
                        result = -1;
                    }
                }
                Desconectar();
            }
            catch (Exception ex)
            {
                result = -1;
                WriteExceptionLog(ex);
            }
            return result;
        }
        public Vw_Doctor GetDoctorByIdentificacion(string identificacion)
        {
            Conectar();
            Vw_Doctor doctor = DB.Vw_Doctor.Where(c => c.Identificacion.Trim() == identificacion.Trim()).FirstOrDefault();
            Desconectar();
            return doctor;
        }
        public List<Vw_Doctor> GetDoctores()
        {
            Conectar();
            List<Vw_Doctor> doctores = DB.Vw_Doctor.ToList();
            Desconectar();
            return doctores;
        }
        public int UpdateDoctor(Vw_Doctor doctor)
        {
            int result = 0;
            try
            {
                this.Conectar();
                using (TransactionScope tran = new TransactionScope())
                {
                    try
                    {
                        Vw_Doctor _doctor = DB.Vw_Doctor.Where(c => c.Identificacion.Trim() == doctor.Identificacion.Trim()).FirstOrDefault();
                        result = DB.sp_Upd_Doctor(doctor.Celular, doctor.Telefono, doctor.Correo, doctor.CodDepartamento,
                            doctor.CodMunicipio, doctor.Barrio, doctor.Direccion, doctor.UserReg, DateTime.Now, _doctor.IdDoctor);

                        DB.SubmitChanges();
                        tran.Complete();
                        result = 1;
                    }
                    catch (Exception exe)
                    {
                        Transaction.Current.Rollback();
                        WriteExceptionLog(exe);
                        result = -1;
                    }
                }
                Desconectar();
            }
            catch (Exception ex)
            {
                result = -1;
                WriteExceptionLog(ex);
            }
            return result;
        }
        #endregion
    }
}
