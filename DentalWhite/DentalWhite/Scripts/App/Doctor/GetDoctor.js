$(document).ready(function () {
    $("#tableDoctores").DataTable({
        "responsive": true,
        "lengthChange": false,
        "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#tableDoctores_wrapper .col-md-6:eq(0)');
    $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
    $('[data-mask]').inputmask()
    $('.select2').select2()
    TablaDoctores = $('#tableDoctores').DataTable();
    Get_DataPost(GetDoctores, '/Doctor/GetDoctores')
    Get_DataPost(GetDepartamentosUpdD, '/Comun/GetDepartamentos')
    $("#selectDepartamentosUpdD").change(function () {
        var codDepartamento = $("#selectDepartamentosUpdD").val();
        Get_DataPost(GetMunicipiosUpdD, '/Comun/GetMunicipiosByCodDepartamento?' + "&CodDepar=" + codDepartamento + "&o=")
    });

    $("#BtnModificarDoctor").on("click", function () {
        var celular = $("#celularFieldUpdtD").val();
        var correo = $("#correoFieldUpdD").val();
        if (celular == "") {
            highLight('input[name=celularFieldUpdtD]')
            $("#inputCelUpdError").show();
        } else {
            celular = celular.trim().replace('-', '');
            celular = celular.trim().replace('-', '');
            if (celular.includes('_')) {
                highLight('input[name=celularFieldUpdtD]');
                $("#inputCelUpdError2").show();
            } else {
                if (correo == "") {
                    highLight('input[name=correoFieldUpdD]')
                    $("#inputCorreoUpdError").show();
                } else {
                    if (!correo.includes('@')) {
                        $("#inputCorreoUpdError").hide();
                        $("#inputCorreoUpdError2").show();
                    } else {
                        $("#inputCorreoUpdError2").hide();
                        var objetoModificarDoctor = {
                            Identificacion: $("#identificacionUpdateD").val(), Celular: $("#celularFieldUpdtD").val(), Telefono: $("#telefonoFieldUpdD").val(),
                            Correo: $("#correoFieldUpdD").val(), CodDepartamento: $("#selectDepartamentosUpdD").val(), CodMunicipio: $("#selectMunicipiosUpdD").val(),
                            Barrio: $("#barrioUpdD").val(), Direccion: $("#direccionUpdD").val(), UserReg: userGlobal.UserId
                        }
                        Save_DataPost(ModificarDoctor, '/Doctor/UpdateDoctor', objetoModificarDoctor)
                    }
                }
            }
        }
    });

    $('input[name=celularFieldUpdtD]').on('keyup', () => {

        var input2 = $('.celularUpd').val();
        input2 = input2.trim().replace('-', '');
        input2 = input2.trim().replace('-', '');
        if (input2.includes('_')) {
            highLight('input[name=celularFieldUpdtD]');
            $("#inputCelUpdError").hide();
            $("#inputCelUpdError2").show();
        } else {
            unhighlight('input[name=celularFieldUpdtD]');
            $("#inputCelUpdError2").hide();
        }

    });
    $('input[name=correoFieldUpdD]').on('keyup', () => {

        var input2 = $('.correoUpd').val();
        if (!input2.includes('@')) {
            highLight('input[name=correoFieldUpdD]');
            $("#inputCorreoUpdError").hide();
            $("#inputCorreoUpdError2").show();
        } else {
            unhighlight('input[name=correoFieldUpdD]');
            $("#inputCorreoUpdError2").hide();
        }

    });
});

function hideElementSpanUpdD() {
    $("#inputCelUpdError").hide();
    $("#inputCelUpdError2").hide();
    $("#inputCorreoUpdError").hide();
    $("#inputCorreoUpdError2").hide();
}

function GetDepartamentosUpdD(data) {
    var ArrayDepartamentos = data.Objeto;
    var htmlDepartamentos = "";
    htmlDepartamentos += "<option value=''>Seleccionar</option>";
    $.each(ArrayDepartamentos, function (index, item) {
        htmlDepartamentos += "<option value=" + item.CodDepartamento.trim() + ">" + item.DescDepartamento.trim() + "</option>";
    })
    $('#selectDepartamentosUpdD').html(htmlDepartamentos);
}

function GetMunicipiosUpdD(data) {
    var ArrayMunicipios = data.Objeto;
    var htmlMunicipios = "";
    htmlMunicipios += "<option value=''>Seleccionar</option>";
    $.each(ArrayMunicipios, function (index, item) {
        htmlMunicipios += "<option value=" + item.CodMunicipio + ">" + item.DescMunicipio.trim() + "</option>";
    })
    $('#selectMunicipiosUpdD').html(htmlMunicipios);
}

function GetDoctores(data) {
    var ArrayDoctores = data.Objeto;
    TablaDoctores.clear().draw();
    $.each(ArrayDoctores, function (index, item) {
        TablaDoctores.row.add([
            item.Identificacion,
            item.PrimerNombre,
            item.PrimerApellido,
            item.Edad,
            item.Celular,
            item.Correo,
            '<a style="font-size:25px" id="edit_Doctor_' + item.IdDoctor + '" data-toggle="modal" data-target="#modalUpdateDoctor"><i class="fas fa-edit" title="Modificar" style="color:#007bff"></i></a>'
        ]).draw(true);
        $("#edit_Doctor_" + item.IdDoctor).on("click", function () {
            hideElementSpanUpdD();
            $("#identificacionUpdateD").val(item.Identificacion);
            $("#nombreUpdateD").val(item.PrimerNombre + " " + item.PrimerApellido);
            $("#celularFieldUpdtD").val(item.Celular);
            $("#telefonoFieldUpdD").val(item.Telefono);
            $("#correoFieldUpdD").val(item.Correo);
            $("#selectDepartamentosUpdD").val(item.CodDepartamento).trigger('change');
            $("#selectMunicipiosUpdD").val(item.CodMunicipio).trigger('change');
            $("#barrioUpdD").val(item.Barrio);
            $("#direccionUpdD").val(item.Direccion);
        });
    });
}

function ModificarDoctor(data) {
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
        Get_DataPost(GetDoctores, '/Doctor/GetDoctores')
    }
}
function CloseModal() {
    var modal = $("#modalUpdateDoctor");
    setTimeout(function () {
        modal.modal("hide");
    }, 1000);

}