$(document).ready(function () {
    hideElementSpanUpd();
    $("#tablePacientes").DataTable({
        "responsive": true,
        "lengthChange": false,
        "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#tablePacientes_wrapper .col-md-6:eq(0)');

    TablaPacientes = $('#tablePacientes').DataTable();
    Get_DataPost(GetPacientes, '/Paciente/GetPacientes')
    $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
    $('[data-mask]').inputmask()
    $('.select2').select2()
    Get_DataPost(GetDepartamentosUpd, '/Comun/GetDepartamentos')
    $("#selectDepartamentosUpd").change(function () {
        var codDepartamento = $("#selectDepartamentosUpd").val();
        Get_DataPost(GetMunicipiosUpd, '/Comun/GetMunicipiosByCodDepartamento?' + "&CodDepar=" + codDepartamento + "&o=")
    });
    $("#BtnModificarPaciente").on("click",function () {
        var celular = $("#celularFieldUpdt").val();
        var correo = $("#correoFieldUpd").val();
        if (celular == "") {
            highLight('input[name=celularFieldUpdt]')
            $("#inputCelUpdError").show();
        } else {
            celular = celular.trim().replace('-', '');
            celular = celular.trim().replace('-', '');
            if (celular.includes('_')) {
                highLight('input[name=celularFieldUpdt]');
                $("#inputCelUpdError2").show();
            } else {
                if (correo == "") {
                    highLight('input[name=correoFieldUpd]')
                    $("#inputCorreoUpdError").show();
                } else {
                    if (!correo.includes('@')) {
                        $("#inputCorreoUpdError").hide();
                        $("#inputCorreoUpdError2").show();
                    } else {
                        $("#inputCorreoUpdError2").hide();
                        var objetoModificarPaciente = {
                            Identificacion: $("#identificacionUpdate").val(), Celular: $("#celularFieldUpdt").val(), Telefono: $("#telefonoFieldUpd").val(),
                            Correo: $("#correoFieldUpd").val(), CodDepartamento: $("#selectDepartamentosUpd").val(), CodMunicipio: $("#selectMunicipiosUpd").val(),
                            Barrio: $("#barrioUpd").val(), Direccion: $("#direccionUpd").val(), UserReg: userGlobal.UserId
                        }
                        Save_DataPost(ModificarPaciente, '/Paciente/UpdatePaciente', objetoModificarPaciente)
                    }
                }
            }
        }
    });
    $('input[name=celularFieldUpdt]').on('keyup', () => {

        var input2 = $('.celularUpd').val();
        input2 = input2.trim().replace('-', '');
        input2 = input2.trim().replace('-', '');
        if (input2.includes('_')) {
            highLight('input[name=celularFieldUpdt]');
            $("#inputCelUpdError").hide();
            $("#inputCelUpdError2").show();
        } else {
            unhighlight('input[name=celularFieldUpdt]');
            $("#inputCelUpdError2").hide();
        }

    });
    $('input[name=correoFieldUpd]').on('keyup', () => {

        var input2 = $('.correoUpd').val();
        if (!input2.includes('@')) {
            highLight('input[name=correoFieldUpd]');
            $("#inputCorreoUpdError").hide();
            $("#inputCorreoUpdError2").show();
        } else {
            unhighlight('input[name=correoFieldUpd]');
            $("#inputCorreoUpdError2").hide();
        }

    });
});

function GetDepartamentosUpd(data) {
    var ArrayDepartamentos = data.Objeto;
    var htmlDepartamentos = "";
    htmlDepartamentos += "<option value=''>Seleccionar</option>";
    $.each(ArrayDepartamentos, function (index, item) {
        htmlDepartamentos += "<option value=" + item.CodDepartamento.trim() + ">" + item.DescDepartamento.trim() + "</option>";
    })
    $('#selectDepartamentosUpd').html(htmlDepartamentos);
}
function GetMunicipiosUpd(data) {
    var ArrayMunicipios = data.Objeto;
    var htmlMunicipios = "";
    htmlMunicipios += "<option value=''>Seleccionar</option>";
    $.each(ArrayMunicipios, function (index, item) {
        htmlMunicipios += "<option value=" + item.CodMunicipio + ">" + item.DescMunicipio.trim() + "</option>";
    })
    $('#selectMunicipiosUpd').html(htmlMunicipios);
}
function hideElementSpanUpd() {
    $("#inputCelUpdError").hide();
    $("#inputCelUpdError2").hide();
    $("#inputCorreoUpdError").hide();
    $("#inputCorreoUpdError2").hide();
}
function GetPacientes(data) {
    var ArrayPacientes = data.Objeto;
    TablaPacientes.clear().draw();
    $.each(ArrayPacientes, function (index, item) {
        TablaPacientes.row.add([
            item.DescTipo,
            item.Identificacion,
            item.PrimerNombre,
            item.PrimerApellido,
            item.Edad,
            item.Celular,
            '<a style="font-size:25px" id="edit_Paciente_' + item.IdPaciente +'" data-toggle="modal" data-target="#modalUpdatePaciente"><i class="fas fa-edit" title="Modificar" style="color:#007bff"></i></a>'
        ]).draw(true);
        $("#edit_Paciente_" + item.IdPaciente).on("click", function () {
            hideElementSpanUpd();
            $("#identificacionUpdate").val(item.Identificacion);
            $("#nombreUpdate").val(item.PrimerNombre + " " + item.PrimerApellido);
            $("#celularFieldUpdt").val(item.Celular);
            $("#telefonoFieldUpd").val(item.Telefono);
            $("#correoFieldUpd").val(item.Correo);
            $("#selectDepartamentosUpd").val(item.CodDepartamento).trigger('change');
            $("#selectMunicipiosUpd").val(item.CodMunicipio).trigger('change');
            $("#barrioUpd").val(item.Barrio);
            $("#direccionUpd").val(item.Direccion);
        });
    });
}
function ModificarPaciente(data) {
    if (data.Is_Error) {
        Swal.fire(
            'error',
            'Mensaje',
            data.Msj,
        );
    } else {
        Swal.fire(
            'Exito!',
            data.Msj,
            'success'
        );
        CloseModal();
        Get_DataPost(GetPacientes, '/Paciente/GetPacientes')
    }
}
function CloseModal() {
    var modal = $("#modalUpdatePaciente");
    setTimeout(function () {
        modal.modal("hide");
    }, 1000);

}