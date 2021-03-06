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

        public Usuarios GetUsuarioValidate(string userName, string password)
        {
            Conectar();
            Usuarios usuario = DB.Usuarios.FirstOrDefault(w => w.UserName.Trim() == userName.Trim() && w.Password.Trim() == password.Trim() && w.Activo == true);
            Desconectar();
            return usuario;
        }
        #endregion

        #region Comun
        public List<TipoDocumento> GetTipoDocumentos()
        {
            Conectar();
            List<TipoDocumento> tipoDocumentos = DB.TipoDocumento.ToList();
            Desconectar();
            return tipoDocumentos;
        }
        public List<Departamentos> GetDepartamentos()
        {
            Conectar();
            List<Departamentos> departamentos = DB.Departamentos.ToList();
            Desconectar();
            return departamentos;
        }
        public List<Municipios> GetMunicipiosByCodDepartamento(string codDepartamento)
        {
            Conectar();
            List<Municipios> municipios = DB.Municipios.Where(c => c.CodDepartamento.Trim() == codDepartamento.Trim()).ToList();
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
                        int a = (int)DB.sp_Add_Paciente(paciente.CodTipoDoc, paciente.Identificacion, paciente.PrimerNombre, paciente.SegundoNombre,
                            paciente.PrimerApellido, paciente.SegundoApelldo, paciente.Edad, paciente.FechaNacimiento, paciente.Celular, paciente.Telefono,
                            paciente.Correo, paciente.CodDepartamento, paciente.CodMunicipio, paciente.Barrio, paciente.Direccion, true, paciente.UserReg, DateTime.Now).FirstOrDefault().Id;

                        int b = (int)DB.sp_Add_Usuario(paciente.Identificacion, "DW2021", paciente.PrimerNombre, paciente.PrimerApellido,
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
                            paciente.CodMunicipio, paciente.Barrio, paciente.Direccion, paciente.UserReg, Convert.ToInt32(_paciente.IdPaciente));
                        int a = DB.sp_Upd_Usuario(paciente.Celular, paciente.Correo, paciente.UserReg, paciente.Identificacion);

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
                        int a = (int)DB.sp_Add_Doctor(doctor.CodTipoDoc, doctor.Identificacion, doctor.PrimerNombre, doctor.SegundoNombre,
                            doctor.PrimerApellido, doctor.SegundoApelldo, doctor.Edad, doctor.FechaNacimiento, doctor.Celular, doctor.Telefono,
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
                            doctor.CodMunicipio, doctor.Barrio, doctor.Direccion, doctor.UserReg, Convert.ToInt32(_doctor.IdDoctor));

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

        #region Hora

        public List<Vw_Hora> GetHoras()
        {
            Conectar();
            List<Vw_Hora> horas = DB.Vw_Hora.ToList();
            Desconectar();
            return horas;
        }
        public int Add_Horario(Vw_Horario horario)
        {
            int result = 0;
            try
            {
                this.Conectar();
                using (TransactionScope tran = CreateTransactionScope(TimeSpan.FromMinutes(1800)))
                {
                    try
                    {
                        int a = (int)DB.sp_Add_Horario(horario.Identificacion, horario.CodHora, horario.CodEstado, DateTime.Now, 
                            horario.UserReg).FirstOrDefault().Id;

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
        public Vw_Horario GetHorarioByIdentificacionAndCod(string identificacion, string codHora)
        {
            Conectar();
            Vw_Horario horario = DB.Vw_Horario.Where(w => w.Identificacion.Trim() == identificacion.Trim() && w.CodHora == codHora).FirstOrDefault();
            Desconectar();
            return horario;
        }
        public List<Vw_Horario> Get_Horarios()
        {
            Conectar();
            List<Vw_Horario> horarios = DB.Vw_Horario.ToList();
            Desconectar();
            return horarios;
        }
        public List<Vw_Horario> Get_HorariosByIdentificacion(string identificacion)
        {
            Conectar();
            List<Vw_Horario> horarios = DB.Vw_Horario.Where(w => w.Identificacion.Trim() == identificacion.Trim() && w.CodEstado == "001").ToList();
            Desconectar();
            return horarios;
        }
        #endregion

        #region Cita

        public int Add_Cita(Vw_Cita cita)
        {
            int result = 0;
            try
            {
                this.Conectar();
                using (TransactionScope tran = CreateTransactionScope(TimeSpan.FromMinutes(1800)))
                {
                    try
                    {
                        int a = (int)DB.sp_Add_Cita(cita.Identificacion, cita.IdentificacionPaciente, cita.FechaCita, cita.CodHora,
                            "003", DateTime.Now, cita.UserReg).FirstOrDefault().Id;

                        int b = DB.sp_Upd_Horario(cita.Identificacion.Trim(), cita.CodHora.Trim(), "003", cita.UserReg);

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

        public List<Vw_Cita> GetCitas()
        {
            Conectar();
            List<Vw_Cita> citas = DB.Vw_Cita.ToList();
            Desconectar();
            return citas;
        }
        #endregion

        #region Reportes

        public List<EdadesResult> edadesResult()
        {
            Conectar();
            var result = DB.Edades().ToList();
            Desconectar();
            return result;
        }
        #endregion
    }
}
