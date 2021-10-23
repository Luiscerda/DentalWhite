$(document).ready(function () {
    EventPlaceholder();
    validarLogin();
    $("#inputUserError").hide();
    $("#inputPassError").hide();

    $("#btnlogin").on("click", function (event) {
        if (validarUserName()) {
            var password = $("#Password").val();
            var userName = $("#UserName").val();
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
function validarLogin() {
    $('input[name=UserName]').on('keyup', () => {

        var input1 = $('.userNa').val();

        if (input1.length == 0) {
            unhighlight('input[name=UserName]');
            $("#inputUserError").hide();
        }
        else if (input1.length > 7) {
            unhighlight('input[name=UserName]');
            $("#inputUserError").hide();
        }
        else {
            highLight('input[name=UserName]')
            $("#inputUserError").show();
        }
    });
    $('input[name=Password]').on('keyup', () => {

        var input1 = $('.Pass').val();

        if (input1.length == 0) {
            unhighlight('input[name=Password]');
        }
        else if(input1.length < 6) {
            highLight('input[name=Password]')
        } else {
            unhighlight('input[name=Password]')   
        }
    });
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
function validarUserName() {
    let valido = false;
    var userName = $("#UserName").val();
    var pass = $("#Password").val();
    if (userName == "") {
        highLight('input[name=UserName]')
        $("#inputUserError").show();
    } else if (userName.length < 8) {
        highLight('input[name=UserName]')
        $("#inputUserError").show();
    } else {
        unhighlight('input[name=UserName]');
        $("#inputUserError").hide();
    }
    if (pass.length < 6) {
        highLight('input[name=Password]');
        return valido;
    }
    if (userName != "") {
        if (pass != "") {
            valido = true;
        }
    }
    return valido;
}