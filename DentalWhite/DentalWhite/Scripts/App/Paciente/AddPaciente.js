var ObjetoGuardarPaciente = {};
var user;
var stepper;
$(document).ready(function () {
    hideElementSpan();
    validation();
    user = getCookieGeneral('UsuarioDW');
    user = JSON.parse(Base64.decode(user));
    GuardarPacienteClick();
    stepper = new Stepper($('.bs-stepper')[0])
    
    $("#BtnNext").on("click", function (event) {
        stepper.next();
        event.preventDefault();
    });
    $("#BtnPre").on("click", function (event) {
        stepper.previous()
        event.preventDefault();
    });
    $("#BtnNext2").on("click", function (event) {
        var celular = $("#celularField").val();
        var correo = $("#correoField").val();
        if (celular == "") {
            highLight('input[name=celularField]')
            $("#inputCelError").show();
        } else {
            celular = celular.trim().replace('-', '');
            celular = celular.trim().replace('-', '');
            if (celular.includes('_')) {
                $("#inputCelError").show();
            } else {
                $("#inputCelError2").hide();
                if (correo == "") {
                    highLight('input[name=correoField]');
                    $("#inputCorreoError").show();
                } else {
                    if (!correo.includes('@')) {
                        $("#inputCorreoError").hide();
                        $("#inputCorreoError2").show();
                    } else {
                        $("#inputCorreoError2").hide();
                        stepper.next();
                        event.preventDefault();
                    }
                    
                }
                
            }
            
        }
        
    });
    $("#BtnPre2").on("click", function (event) {
        stepper.previous()
        event.preventDefault();
    });
    $('#fechaC').datetimepicker({
        format: 'L'
    });
    $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
    $('[data-mask]').inputmask()
    $('.select2').select2()
    Get_DataPost(GetTipoDocumentos, '/Comun/GetTipoDocumentos')
    Get_DataPost(GetDepartamentos, '/Comun/GetDepartamentos')
    $("#selectDepartamentos").change(function () {
        var codDepartamento = $("#selectDepartamentos").val();
        Get_DataPost(GetMunicipios, '/Comun/GetMunicipiosByCodDepartamento?' + "&CodDepar=" + codDepartamento + "&o=")
    });
    
});


function GetTipoDocumentos(data) {
    var ArrayTipoDocumentos = data.Objeto;
    var htmlTipo = "";
    htmlTipo += "<option value=''>Seleccionar</option>";
    $.each(ArrayTipoDocumentos, function (index, item) {
        htmlTipo += "<option value=" + item.CodTipo.trim() + ">" + item.DescTipo + "</option>";
    })
    $('#selectTipoId').html(htmlTipo);
}

function highLight(element) {
    $(element).addClass('is-invalid');
}
function unhighlight(element) {
    $(element).removeClass('is-invalid');
}
function hideElementSpan() {
    $("#inputIdError").hide();
    $("#inputCelError").hide();
    $("#inputCelError2").hide();
    $("#inputCorreoError").hide();
    $("#inputCorreoError2").hide();
    $('#BtnNext').addClass('disabled').prop('disabled', true);
    $('input[name=firstName]').prop('disabled', true);
    $('input[name=lastName]').prop('disabled', true);
    $('input[name=age]').prop('disabled', true);
    $('input[name=date]').prop('disabled', true);
}
function GetDepartamentos(data) {
    var ArrayDepartamentos = data.Objeto;
    var htmlDepartamentos = "";
    htmlDepartamentos += "<option value=''>Seleccionar</option>";
    $.each(ArrayDepartamentos, function (index, item) {
        htmlDepartamentos += "<option value=" + item.CodDepartamento.trim() + ">" + item.DescDepartamento.trim() + "</option>";
    })
    $('#selectDepartamentos').html(htmlDepartamentos);
}
function validation() {
    $('input[name=identification]').on('keyup', () => {

        var input1 = $('.inputId').val();

        if (input1.length == 0) {
            $('input[name=firstName]').prop('disabled', true);
            unhighlight('input[name=identification]');
            $("#inputIdError").hide();
            $("#inputLastError").hide();
        }
        else if (input1.length > 7) {
            $('input[name=firstName]').removeAttr('style').removeAttr('disabled');
            unhighlight('input[name=identification]');
            $("#inputIdError").hide();
            $("#inputLastError").hide();
        }
        else {
            $('input[name=firstName]').prop('disabled', true);
            $('input[name=lastName]').prop('disabled', true);
            $('input[name=age]').prop('disabled', true);
            highLight('input[name=identification]')
            $("#inputIdError").show();

            $('#BtnNext').addClass('disabled').prop('disabled', true);
        }
    });
    $('input[name=firstName]').on('keyup', () => {
        var input2 = $('.inputFirs').val();

        if (input2.length > 2) {
            $('input[name=lastName]').removeAttr('style').removeAttr('disabled');
            unhighlight('input[name=firstName]');
        }
        else {
            $('input[name=lastName]').prop('disabled', true);
            $('#BtnNext').addClass('disabled').prop('disabled', true);
        }
    });
    $('input[name=lastName]').on('keyup', () => {
        var input2 = $('.inputLast').val();

        if (input2.length > 2) {
            $('input[name=age]').removeAttr('style').removeAttr('disabled');
            unhighlight('input[name=lastName]');
        }
        else {
            $('input[name=age]').prop('disabled', true);
            $('#BtnNext').addClass('disabled').prop('disabled', true);
        }
    });
    $('input[name=age]').on('keyup', () => {
        var input2 = $('.inputAge').val();

        if (input2.length > 0) {
            $('input[name=date]').removeAttr('style').removeAttr('disabled');
            unhighlight('input[name=age]');
        }
        else {
            $('#BtnNext').addClass('disabled').prop('disabled', true);
        }
    });
    $("#fechaNac").on("change", function () {
        var input2 = $('#fechaNac').val();
        $('#BtnNext').removeClass('disabled').removeAttr('disabled');
    });
    $("#identificacionField").on("keypress", function () {
        return soloNumeros(event);
    });
    $('input[name=celularField]').on('keyup', () => {

        var input2 = $('.celular').val();
        input2 = input2.trim().replace('-', '');
        input2 = input2.trim().replace('-', '');
        if (input2.includes('_')) {
            highLight('input[name=celularField]');
            $("#inputCelError").hide();
            $("#inputCelError2").show();
        } else {
            unhighlight('input[name=celularField]');
            $("#inputCelError2").hide();
        }

    });
    $('input[name=correoField]').on('keyup', () => {

        var input2 = $('.correo').val();
        if (!input2.includes('@')) {
            highLight('input[name=correoField]');            
            $("#inputCorreoError2").show();
        } else {
            unhighlight('input[name=correoField]');
            $("#inputCorreoError2").hide();
        }

    });
}
function GetMunicipios(data) {
    var ArrayMunicipios = data.Objeto;
    var htmlMunicipios = "";
    htmlMunicipios += "<option value=''>Seleccionar</option>";
    $.each(ArrayMunicipios, function (index, item) {
        htmlMunicipios += "<option value=" + item.CodMunicipio + ">" + item.DescMunicipio.trim() + "</option>";
    })
    $('#selectMunicipios').html(htmlMunicipios);
}

function GuardarPacienteClick() {
    $("#BtnSavePatient").on("click", function () {
        ObjetoGuardarPaciente = {
            CodTipoDoc: $("#selectTipoId").val(), Identificacion: $("#identificacionField").val(), PrimerNombe: $("#primerNombreField").val(),
            SegundoNombre: $("#segundoNombreField").val(), PrimerApellido: $("#primerApellidoField").val(), SegundoApellido: $("#segundoApellidoField").val(),
            Edad: $("#edadField").val(), FechaNacimiento: $('#fechaNac').val(), Celular: $("#celularField").val(), Telefono: $("#telefonoField").val(),
            Correo: $("#correoField").val(), CodDepartamento: $("#selectDepartamentos").val(), CodMunicipio: $("#selectMunicipios").val(),
            Barrio: $("#barrio").val(), Direccion: $("#direccion").val(), UserReg: user.UserId
        }
        Save_DataPost(GuardarPaciente, '/Paciente/SavePaciente', ObjetoGuardarPaciente)
    });
}

function GuardarPaciente(data) {
    if (data.Is_Error) {
        Swal.fire({
            icon: 'error',
            title: 'Atención',
            text: data.Msj,
        });
        ObjetoGuardarPaciente = {};
    } else {
        Swal.fire({
            icon: 'success',
            title: "Atención",
            text: data.Msj,
        })
        ObjetoGuardarPaciente = {};
        limpiarCampos();
    }
}
function soloNumeros(evt) {
    var code = (evt.which) ? evt.which : evt.keyCode;
    if (code == 8) {
        return true;
    } else if (code >= 48 && code <= 57) {
        return true;
    } else {
        return false
    }
}
function limpiarCampos() {
    stepper.to(1);
    $("#identificacionField").val('');
    $("#primerNombreField").val('');
    $("#segundoNombreField").val('');
    $("#primerApellidoField").val('');
    $("#segundoApellidoField").val('');
    $("#edadField").val('');
    $('#fechaNac').val('');
    $("#celularField").val('');
    $("#telefonoField").val('');
    $("#correoField").val('');
    $("#barrio").val('');
    $("#direccion").val('');
    
    hideElementSpan();
}