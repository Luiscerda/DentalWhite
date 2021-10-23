var userGlobal;
$(document).ready(function () {
    userGlobal = getCookieGeneral('UsuarioDW');
    userGlobal = JSON.parse(Base64.decode(userGlobal));

});
function SetUrlForQuery(stringrelativeserver) {

    return window.location.origin + stringrelativeserver;
}
function setCookieGeneral(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookieGeneral(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function deleteCookie(name) {
    setCookieGeneral(name, "", -1);
}
function highLight(element) {
    $(element).addClass('is-invalid');
}
function unhighlight(element) {
    $(element).removeClass('is-invalid');
}
function ShowError(error) {
    $("#msj").html(error);
}
function SwalErrorMsj(data) {
    CloseModalBox();
    Swal.fire(
        'Error!',
        data.Msj,
        'error',
    );
}

function CloseModalBox() {
    var modal = $("#modalBox");
    setTimeout(function () {
        modal.modal("hide");
    }, 1000);

}
function valideKey(evt) {

    // code is the decimal ASCII representation of the pressed key.
    var code = (evt.which) ? evt.which : evt.keyCode;

    if (code == 8) { // backspace.
        return true;
    } else if (code >= 48 && code <= 57) { // is a number.
        return true;
    } else { // other keys.
        return false;
    }
}
function calcularEdad(fecha) {
    var actual = new Date();
    var nacimiento = new Date(fecha);
    var anios = actual.getFullYear() - nacimiento.getFullYear();
    var meses = actual.getMonth() - nacimiento.getMonth();
    if (meses < 0 || (meses === 0 && actual.getDate() < nacimiento.getDate())) {
        anios--;
    }
    return anios;
}