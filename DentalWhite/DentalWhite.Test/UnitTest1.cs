using NUnit.Framework;
using DentalWhite.Controllers;
using DentalWhite.Models;
using DentalWhite.AccesoDatos;
using System.Web.Mvc;
using DentalWhite.Clases;

namespace DentalWhite.Test
{
    public class Tests
    {
        LoginController loginController;
        [SetUp]
        public void Setup()
        {
             loginController = new LoginController();
            
        }

        [Test]
        public void Login()
        {
            Usuarios user = new Usuarios()
            {
                UserName = "123456",
                Password = "123456"
            };
            var result = loginController.Login(user);
            var ce = 1;
            Assert.IsNotNull(result);
        }
    }
}