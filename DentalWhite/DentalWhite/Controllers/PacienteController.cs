using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DentalWhite.Controllers
{
    public class PacienteController : Controller
    {
        // GET: Paciente
        public ActionResult AddPatient()
        {
            return View();
        }
    }
}