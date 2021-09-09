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