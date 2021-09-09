$(document).ready(function () {
    $("#inputSelectDocError").hide();
    $('.select2').select2()
    $("#selectDoctor").on("change", function () {
        var input1 = this.value;
        if (input1 != "") {
            $("#inputSelectDocError").hide();
        }
    });
    Get_DataPost(GetDoctores, '/Doctor/GetDoctores')
    $("#btnRegistrar").on("click", function () {
        if (validarDoctor()) {

        }
    });
})

function validarDoctor() {
    let valido = false;
    var tipoDoc = $("#selectDoctor").val();
    if (tipoDoc == "") {
        document.getElementById("selectDoctor").style.borderColor = "red";
        $("#inputSelectDocError").show();
    } else {
        unhighlight('input[name=selectDoctor]');
        $("#inputSelectDocError").hide();
    }
    if (tipoDoc != "") {
        valido = true;
    }
    return valido;
}
function validacionCampos() {
    $('input[name=IdDoc]').on('keyup', () => {

        var input1 = $('.inputIdDoc').val();

        if (input1.length == 0) {
            unhighlight('input[name=IdDoc]');
            $("#inputIdDocError").hide();
        }
        else if (input1.length > 7) {
            unhighlight('input[name=IdDoc]');
            $("#inputIdDocError").hide();
        }
        else {
            highLight('input[name=IdDoc]')
            $("#inputIdDocError").show();
        }
    });
}
function GetDoctores(data) {
    let ArrayDocs = data.Objeto;
    let htmlDocs = "";
    htmlDocs += "<option value=''>Seleccionar</option>";
    $.each(ArrayDocs, function (index, item) {
        htmlDocs += "<option value=" + item.Identificacion.trim() + ">" + item.PrimerNombe.trim() +" " + item.PrimerApellido.trim() + "</option>";
    })
    $("#selectDoctor").html(htmlDocs);
}