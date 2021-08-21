$(document).ready(function () {
    EventPlaceholder();

    $("#btnlogin").on("click", function (event) {
        var userName = $("#UserName").val();
        var password = $("#Password").val()
        if (userName.trim() != "") {
            if (password.trim() != "") {
                ServiceLogin(userName, password);
            } else {
                swal.fire({
                    title: "¡Error!",
                    text: "Digite su contraseña",
                    type: "error",
                    closeOnConfirm: true,
                });
            }
        } else {
            swal.fire({
                title: "¡Error!",
                text: "Digite su usuario",
                type: "error",
                closeOnConfirm: true,
            });
        }
        
    });
});

function EventPlaceholder() {
    $("#UserName").on("keyup", function () {
        this.setAttribute('value', this.value);
    });
    $("#Password").on("keyup", function () {
        this.setAttribute('value', this.value);
    })
}

function ServiceLogin(userName, password) {
    var form_data = new FormData();
    var Obj = { UserName: userName, Password: password };
    form_data.append("UserName", userName);
    form_data.append("Password", password);

    var formURL = SetUrlForQuery('/Login/Login');

    $.ajax(
        {
            url: formURL,
            type: "POST",
            dataType: "json",
            data: JSON.stringify(Obj),
            contentType: "application/json",
            processData: false,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                if (!data.Is_Error) {
                    setCookieGeneral("UsuarioDW", Base64.encode(JSON.stringify(data.Objeto)), 1);
                    window.location.href = data.Url;
                    ShowError(data.Msj);
                } else {
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}