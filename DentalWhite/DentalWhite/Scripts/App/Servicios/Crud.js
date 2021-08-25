function Get_DataPost(callbacksussces, Url) {

    var form_data = new FormData();
    var user = getCookieGeneral('UsuarioDW');
    user = JSON.parse(Base64.decode(user));
    var Obj = { UserName: user.UserName, Password: user.Password };
    
    var formURL = SetUrlForQuery(Url);

    $.ajax( //con json
        {
            url: formURL,
            type: "POST",
            dataType: "json",
            data: JSON.stringify(Obj),
            contentType: "application/json",
            processData: false,
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    callbacksussces(data)
                } else {

                    SwalErrorMsj(data);


                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

}

function Save_DataPost(callbacksussces, Url, ObjPost, TituloMsj, EnvioDesdeModal, IsRecargar) {

    var form_data = new FormData();


    var formURL = SetUrlForQuery(Url);

    $.ajax( //con json
        {
            url: formURL,
            type: "POST",
            dataType: "json",
            data: JSON.stringify(ObjPost),
            contentType: "application/json" /*"application/x-www-form-urlencoded; charset=UTF-8"*/, /*application/json*/
            processData: false,
            success: function (data, textStatus, jqXHR) {
                //CloseLoading();
                if (!data.Is_Error) {
                    if (EnvioDesdeModal) {

                        Swal.fire({
                            icon: 'success',
                            title: TituloMsj,
                            text: data.Msj,

                        });

                    }
                    else {
                        Swal.fire({
                            icon: 'success',
                            title: TituloMsj,
                            text: data.Msj,

                        },
                            function (isConfirm) {
                                if (isConfirm) {
                                    window.location.reload(true);
                                }
                            });
                    }
                    callbacksussces(data)
                } else {
                    SwalErrorMsj(data);


                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

}