let ObjetoGuardarHorario = {};
$(document).ready(function () {
    $("#inputSelectDocError").hide();
    $("#inputSelectHoraError").hide();
    $('.select2').select2()
    validacionCampos()
    Get_DataPost(GetDoctores, '/Doctor/GetDoctores')
    Get_DataPost(GetHoras, '/Horario/GetHoras')
    $("#btnRegistrar").on("click", function () {
        if (validarDoctor()) {
            ObjetoGuardarHorario = {
                Identificacion: $("#selectDoctor").val(), CodHora: $("#selectHora").val(), CodEstado: "001", UserReg: userGlobal.UserId
            }
            Save_DataPost(GuardarHorario, '/Horario/SaveHorario', ObjetoGuardarHorario)
        }
    });
    $("#btnCancelar").on("click", function () {
        Cancelar()
    });
    $("#tableHorarios").DataTable({
        "responsive": true,
        "lengthChange": false,
        "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print"]
    }).buttons().container().appendTo('#tableHorarios_wrapper .col-md-6:eq(0)');
    TablaHorarios = $('#tableHorarios').DataTable();
    Get_DataPost(GetHorarios, '/Horario/GetHorarios')
})

function validarDoctor() {
    let valido = false;
    var tipoDoc = $("#selectDoctor").val();
    var hora = $("#selectHora").val();
    if (tipoDoc == "") {
        document.getElementById("selectDoctor").style.borderColor = "red";
        $("#inputSelectDocError").show();
    } else {
        unhighlight('input[name=selectDoctor]');
        $("#inputSelectDocError").hide();
    }
    if (hora == "") {
        document.getElementById("selectHora").style.borderColor = "red";
        $("#inputSelectHoraError").show();
    } else {
        document.getElementById("selectHora").style.borderColor = "none";
        $("#inputSelectHoraError").hide();
    }
    if (tipoDoc != "") {
        if (hora != "") {
            valido = true;
        }
    }
    return valido;
}
function validacionCampos() {
    $("#selectDoctor").on("change", function () {
        var input1 = this.value;
        if (input1 != "") {
            $("#inputSelectDocError").hide();
        }
    });
    $("#selectHora").on("change", function () {
        var input1 = this.value;
        if (input1 != "") {
            $("#inputSelectHoraError").hide();
            document.getElementById("selectHora").style.borderColor = "#ced4da";
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
function GetHoras(data) {
    let ArrayHoras = data.Objeto;
    let htmlHora = "";
    htmlHora += "<option value=''>Seleccionar</option>";
    $.each(ArrayHoras, function (index, item) {
        htmlHora += "<option value=" + item.CodHora.trim() + ">" + item.Hora.trim() + "</option>";
    })
    $("#selectHora").html(htmlHora);
}
function Cancelar() {
    $("#inputSelectDocError").hide();
    $("#inputSelectHoraError").hide();
    document.getElementById("selectHora").style.borderColor = "#ced4da";
    $('#selectHora').val('').trigger("change");
    $('#selectDoctor').val('').trigger("change");
}
function GuardarHorario(data) {
    if (data.Is_Error) {
        Swal.fire(
            'Error!',
            data.Msj,
            'error',
        );
        ObjetoGuardarHorario = {};
    } else {
        Swal.fire(
            'Exito!',
            data.Msj,
            'success'
        );
        ObjetoGuardarHorario = {};
        Cancelar();
        Get_DataPost(GetHorarios, '/Horario/GetHorarios')
    }
}
function GetHorarios(data) {
    var ArrayHorarios = data.Objeto;
    TablaHorarios.clear().draw();
    $.each(ArrayHorarios, function (index, item) {
        TablaHorarios.row.add([
            item.Identificacion,
            item.PrimerNombre + " " + item.PrimerApellido,
            item.Hora,
            '<a style="font-size:25px" id="edit_' + item.HorarioId + '" data-toggle="modal" data-target="#modalUpdateDoctor"><i class="fas fa-edit" title="Modificar" style="color:#007bff"></i></a>'
        ]).draw(true);
        //$("#edit_Doctor_" + item.IdDoctor).on("click", function () {
        //    //hideElementSpanUpd();
        //    //$("#identificacionUpdate").val(item.Identificacion);
        //    //$("#nombreUpdate").val(item.PrimerNombe + " " + item.PrimerApellido);
        //    //$("#celularFieldUpdt").val(item.Celular);
        //    //$("#telefonoFieldUpd").val(item.Telefono);
        //    //$("#correoFieldUpd").val(item.Correo);
        //    //$("#selectDepartamentosUpd").val(item.CodDepartamento).trigger('change');
        //    //$("#selectMunicipiosUpd").val(item.CodMunicipio).trigger('change');
        //    //$("#barrioUpd").val(item.Barrio);
        //    //$("#direccionUpd").val(item.Direccion);
        //});
    });
}