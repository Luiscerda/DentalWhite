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