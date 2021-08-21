function SetUrlForQuery(stringrelativeserver) {

    return window.location.origin + stringrelativeserver;
}
function setCookieGeneral(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function ShowError(error) {
    $("#msj").html(error);
}

function SwalErrorMsj(data) {
    CloseModalBox();
    swal.fire({
        title: "¡Error!",
        text: data.Msj,
        //confirmButtonColor: "#ab2328",
        type: "error",
        closeOnConfirm: true,
    });
}

function CloseModalBox() {
    var modal = $("#modalBox");
    setTimeout(function () {
        modal.modal("hide");
    }, 1000);

}