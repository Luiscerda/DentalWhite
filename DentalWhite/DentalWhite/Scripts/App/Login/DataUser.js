var DataUser;
$(document).ready(function () {
    DataUser = getCookieGeneral('UsuarioDW');
    DataUser = JSON.parse(Base64.decode(DataUser));
    $("#cerrarSesion").on("click", function (event) {
        CerrarSesion();
    });
});

function CerrarSesion() {
    deleteCookie('UsuarioDW');
    window.location.href = '/Login/Index';
}