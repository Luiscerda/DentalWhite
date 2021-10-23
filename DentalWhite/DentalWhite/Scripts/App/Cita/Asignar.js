$(document).ready(function () {
    let userGlobal = getCookieGeneral('UsuarioDW');
    userGlobal = JSON.parse(Base64.decode(userGlobal));
    FechaMin();
    Get_DataPost(GetDoctores, '/Doctor/GetDoctores')
    if (userGlobal.CodRol.trim() == "001") {
        Get_DataPost(GetPacientes, '/Paciente/GetPacientes')
    }
    
    $('.select2').select2()
    $("#selectDoctor").change(function () {
        let identificacion = $("#selectDoctor").val();
        Get_DataPost(GetHorarios, '/Horario/GetHorariosByIdentificacion?' + "&ID=" + identificacion + "&o=")
    });
})

function GetDoctores(data) {
    let ArrayDocs = data.Objeto;
    let htmlDocs = "";
    htmlDocs += "<option value=''>Seleccionar</option>";
    $.each(ArrayDocs, function (index, item) {
        htmlDocs += "<option value=" + item.Identificacion.trim() + ">" + item.PrimerNombre.trim() + " " + item.PrimerApellido.trim() + "</option>";
    })
    $("#selectDoctor").html(htmlDocs);
}
function GetPacientes(data) {
    let ArrayPacientes = data.Objeto;
    let htmlPacientes = "";
    htmlPacientes += "<option value=''>Seleccionar</option>";
    $.each(ArrayPacientes, function (index, item) {
        htmlPacientes += "<option value=" + item.Identificacion.trim() + ">" + item.Identificacion.trim()+ " - " + item.PrimerNombre.trim() + " " + item.PrimerApellido.trim() + "</option>";
    })
    $("#selectPaciente").html(htmlPacientes);
}
function GetHorarios(data) {
    let ArrayHorarios = data.Objeto;
    let htmlHorarios = "";
    htmlHorarios += "<option value=''>Seleccionar</option>";
    $.each(ArrayHorarios, function (index, item) {
        htmlHorarios += "<option value=" + item.CodHora + ">" + item.Hora + "</option>";
    })
    $("#selectHorario").html(htmlHorarios);
}

function FechaMin() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("fecha").setAttribute("min", today);
}