var ObjetoGuardarPaciente = {};
var stepper;
let edadPaci;
$(document).ready(function () {
    hideElementSpan();
    validation();
    FechaMaxPac();
    GuardarPacienteClick();
    stepper = new Stepper($('.bs-stepper')[0])
    
    $("#BtnNext").on("click", function (event) {
        if (ValidarDatosPersonalesPaciente()) {
            stepper.next();
            event.preventDefault();
        }
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
    $("#cancelarDatosPac").on("click", function () {
        cancelarDatosPac();
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

function hideElementSpan() {
    $("#inputTipoError").hide();
    $("#inputLastNameError").hide();
    $("#inputIdError").hide();
    $("#inputFirstNameError").hide();
    $("#inputDateError").hide();
    unhighlight('input[name=identification]');
    unhighlight('input[name=firstName]');
    unhighlight('input[name=lastName]');

    $("#inputCelError").hide();
    $("#inputCelError2").hide();
    $("#inputCorreoError").hide();
    $("#inputCorreoError2").hide();
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
            unhighlight('input[name=identification]');
            $("#inputIdError").hide();
        }
        else if (input1.length > 7) {
            unhighlight('input[name=identification]');
            $("#inputIdError").hide();
        }
        else {
            highLight('input[name=identification]')
            $("#inputIdError").show();
        }
    });
    $('input[name=firstName]').on('keyup', () => {
        var input2 = $('.inputFirs').val();

        if (input2.length == 0) {
            unhighlight('input[name=firstName]');
            $("#inputFirstNameError").hide();
        } else if (input2.length > 0) {
            unhighlight('input[name=firstName]');
            $("#inputFirstNameError").hide();
        }
        else {
            highLight('input[name=firstName]')
            $("#inputFirstNameError").show();
        }
    });
    $('input[name=lastName]').on('keyup', () => {
        var input2 = $('.inputLast').val();

        if (input2.length == 0) {
            unhighlight('input[name=lastName]');
            $("#inputLastNameError").hide();
        }
        else if (input2.length > 0) {
            unhighlight('input[name=lastName]');
            $("#inputLastNameError").hide();
        }
        else {
            highLight('input[name=lastName]')
            $("#inputLastNameError").show();
        }
    });
    $("#fechaNacDoc").on("change", function () {
        var input1 = this.value;
        if (input1 != "") {
            unhighlight('input[name=fechaNacDoc]');
            $("#inputDateError").hide();
        }
    });
    $("#selectTipoId").on("change", function () {
        var input1 = this.value;
        if (input1 != "") {
            $("#inputTipoError").hide();
        }
    });
    $("#identificacionField").on("keypress", function () {
        return valideKey(event);
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
function FechaMaxPac() {
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
    document.getElementById("fechaNacDoc").setAttribute("max", today);
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
function ValidarDatosPersonalesPaciente() {
    let valido = false;
    var tipoDoc = $("#selectTipoId").val();
    var identificacion = $("#identificacionField").val();
    var primerNombre = $("#primerNombreField").val();
    var primerApellido = $("#primerApellidoField").val();
    var fechaNa = $("#fechaNacDoc").val();
    if (tipoDoc == "") {
        highLight('input[name=selectTipoId]')
        $("#inputTipoError").show();
    } else {
        unhighlight('input[name=selectTipoId]');
        $("#inputTipoError").hide();
    }
    if (identificacion == "") {
        highLight('input[name=identification]')
        $("#inputIdError").show();
    } else if (identificacion.length < 8) {
        highLight('input[name=identification]')
        $("#inputIdError").show();
    } else {
        unhighlight('input[name=identification]');
        $("#inputIdError").hide();
    }
    if (primerNombre == "") {
        highLight('input[name=firstName]')
        $("#inputFirstNameError").show();
    } else {
        unhighlight('input[name=firstName]');
        $("#inputFirstNameError").hide();
    }
    if (primerApellido == "") {
        highLight('input[name=lastName]')
        $("#inputLastNameError").show();
    } else {
        unhighlight('input[name=lastName]');
        $("#inputLastNameError").hide();
    }
    if (fechaNa == "") {
        highLight('input[name=dateDoc]')
        $("#inputDateError").show();
    } else {
        unhighlight('input[name=dateDoc]');
        $("#inputDateError").hide();
        edadPaci = calcularEdad(fechaNa);
    }
    if (tipoDoc != "") {
        if (identificacion != "") {
            if (identificacion.length >= 8) {
                if (primerNombre != "") {
                    if (primerApellido != "") {
                        if (fechaNa != "") {
                            valido = true;
                        }
                    }
                }
            }
        }
    }
    return valido;
}
function GuardarPacienteClick() {
    $("#BtnSavePatient").on("click", function () {
        ObjetoGuardarPaciente = {
            CodTipoDoc: $("#selectTipoId").val(), Identificacion: $("#identificacionField").val(), PrimerNombre: $("#primerNombreField").val(),
            SegundoNombre: $("#segundoNombreField").val(), PrimerApellido: $("#primerApellidoField").val(), SegundoApelldo: $("#segundoApellidoField").val(),
            Edad: edadPaci, FechaNacimiento: $('#fechaNacDoc').val(), Celular: $("#celularField").val(), Telefono: $("#telefonoField").val(),
            Correo: $("#correoField").val(), CodDepartamento: $("#selectDepartamentos").val(), CodMunicipio: $("#selectMunicipios").val(),
            Barrio: $("#barrio").val(), Direccion: $("#direccion").val(), UserReg: userGlobal.UserId
        }
        Save_DataPost(GuardarPaciente, '/Paciente/SavePaciente', ObjetoGuardarPaciente)
    });
}

function GuardarPaciente(data) {
    if (data.Is_Error) {
        Swal.fire(
            'error',
            'Mensaje',
            data.Msj,
        );
        ObjetoGuardarPaciente = {};
    } else {
        Swal.fire(
            'Exito!',
            data.Msj,
            'success'
        );
        ObjetoGuardarPaciente = {};
        limpiarCampos();
    }
}
function limpiarCampos() {
    stepper.to(1);
    $("#identificacionField").val('');
    $("#primerNombreField").val('');
    $("#segundoNombreField").val('');
    $("#primerApellidoField").val('');
    $("#segundoApellidoField").val('');
    $("#celularField").val('');
    $("#telefonoField").val('');
    $("#correoField").val('');
    $("#barrio").val('');
    $("#direccion").val('');
    
    hideElementSpan();
}
function cancelarDatosPac() {
    $("#identificacionField").val('');
    $("#primerNombreField").val('');
    $("#segundoNombreField").val('');
    $("#primerApellidoField").val('');
    $("#segundoApellidoField").val('');
    $("#selectTipoId").val('').trigger('change')
    hideElementSpan();
}