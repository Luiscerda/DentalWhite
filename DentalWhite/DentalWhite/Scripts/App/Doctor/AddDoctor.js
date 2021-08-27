var stepperDoc;
var edad;
var ObjetoGuardarDoctor = {};
$(document).ready(function () {
    stepperDoc = new Stepper($('.bs-stepper')[0])
    hideElementSpanDoc();
    ValidacionCampos();
    GuardarDoctorClick();
    FechaMax();
    $("#BtnNext").on("click", function (event) {
        if (validarCamposPersonales()) {
            stepperDoc.next();
            event.preventDefault();
        }
        
    });
    $("#BtnPre").on("click", function (event) {
        stepperDoc.previous()
        event.preventDefault();
    });
    $("#BtnNext2").on("click", function (event) {
        if (validarCamposContacto()) {
            stepperDoc.next();
            event.preventDefault();
        }

    });
    $("#BtnPre2").on("click", function (event) {
        stepperDoc.previous()
        event.preventDefault();
    });
    $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
    $('[data-mask]').inputmask()
    $('.select2').select2()
    Get_DataPost(GetTipoDocumentosDoc, '/Comun/GetTipoDocumentos')
    Get_DataPost(GetDepartamentosDoc, '/Comun/GetDepartamentos')
    $("#selectDepartamentosDoc").change(function () {
        var codDepartamento = this.value;
        Get_DataPost(GetMunicipiosDoc, '/Comun/GetMunicipiosByCodDepartamento?' + "&CodDepar=" + codDepartamento + "&o=")
    });
});
function hideElementSpanDoc() {
    $("#inputIdDocError").hide();
    $("#inputCelDocError").hide();
    $("#inputCelDocError2").hide();
    $("#inputCorreoDocError").hide();
    $("#inputCorreoDocError2").hide();
    $("#inputLastNameError").hide();
    $("#inputFirstNameError").hide();
    $("#inputDateError").hide();
    $("#inputTipoError").hide();
}
function GetTipoDocumentosDoc(data) {
    var ArrayTipoDocumentos = data.Objeto;
    var arrayFilter = ArrayTipoDocumentos.filter(function (elemt) {
        return elemt.CodTipo.trim() != "001" ;
    })
    var htmlTipo = "";
    htmlTipo += "<option value=''>Seleccionar</option>";
    $.each(arrayFilter, function (index, item) {
        htmlTipo += "<option value=" + item.CodTipo.trim() + ">" + item.DescTipo + "</option>";
    })
    $('#selectTipoIdDoc').html(htmlTipo);
}
function GetDepartamentosDoc(data) {
    var ArrayDepartamentos = data.Objeto;
    var htmlDepartamentos = "";
    htmlDepartamentos += "<option value=''>Seleccionar</option>";
    $.each(ArrayDepartamentos, function (index, item) {
        htmlDepartamentos += "<option value=" + item.CodDepartamento.trim() + ">" + item.DescDepartamento.trim() + "</option>";
    })
    $("#selectDepartamentosDoc").html(htmlDepartamentos);
}
function GetMunicipiosDoc(data) {
    var ArrayMunicipios = data.Objeto;
    var htmlMunicipios = "";
    htmlMunicipios += "<option value=''>Seleccionar</option>";
    $.each(ArrayMunicipios, function (index, item) {
        htmlMunicipios += "<option value=" + item.CodMunicipio + ">" + item.DescMunicipio.trim() + "</option>";
    })
    $('#selectMunicipiosDoc').html(htmlMunicipios);
}
function validarCamposPersonales() {
    var valido = false;
    var tipoDoc = $("#selectTipoIdDoc").val();
    var identificacion = $("#identificacionFieldDoc").val();
    var primerNombre = $("#primerNombreFieldDoc").val();
    var primerApellido = $("#primerApellidoFieldDoc").val();
    var fechaNa = $("#fechaNacDoc").val();
    if (tipoDoc == "") {
        highLight('input[name=selectTipoIdDoc]')
        $("#inputTipoError").show();
    } else {
        unhighlight('input[name=selectTipoIdDoc]');
        $("#inputTipoError").hide();
    }
    if (identificacion == "") {
        highLight('input[name=identificationDoc]')
        $("#inputIdDocError").show();
    } else if (identificacion.length < 8) {
        highLight('input[name=identificationDoc]')
        $("#inputIdDocError").show();
    } else {
        unhighlight('input[name=identificationDoc]');
        $("#inputIdDocError").hide();
    }
    if (primerNombre == "") {
        highLight('input[name=firstNameDoc]')
        $("#inputFirstNameError").show();
    } else {
        unhighlight('input[name=firstNameDoc]');
        $("#inputFirstNameError").hide();
    }
    if (primerApellido == "") {
        highLight('input[name=lastNameDoc]')
        $("#inputLastNameError").show();
    } else {
        unhighlight('input[name=lastNameDoc]');
        $("#inputLastNameError").hide();
    }
    if (fechaNa == "") {
        highLight('input[name=dateDoc]')
        $("#inputDateError").show();
    } else {
        unhighlight('input[name=dateDoc]');
        $("#inputDateError").hide();
        edad = calcularEdad(fechaNa);
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
function validarCamposContacto() {
    var celular = $("#celularFieldDoc").val();
    celular = celular.trim().replace('-', '');
    celular = celular.trim().replace('-', '');
    var correo = $("#correoFieldDoc").val();
    var valido = false;
    var correoValido = false;
    if (celular == "") {
        highLight('input[name=celularFieldDoc]')
        $("#inputCelDocError").show();
    } else if (celular.includes('_')) {
        $("#inputCelDocError").hide();
        highLight('input[name=celularFieldDoc]')
        $("#inputCelDocError2").show();
    } else {
        $("#inputCelDocError").hide();
        unhighlight('input[name=celularFieldDoc]');
        $("#inputCelDocError2").hide();
    }
    if (correo == "") {
        highLight('input[name=correoFieldDoc]')
        $("#inputCorreoDocError").show();
    } else if (!correo.includes('@')) {
        $("#inputCorreoDocError").hide();
        highLight('input[name=correoFieldDoc]')
        $("#inputCorreoDocError2").show();
    } else {
        unhighlight('input[name=correoFieldDoc]');
        $("#inputCorreoDocError2").hide();
        correoValido = true;
    }
    if (celular != "") {
        if (correoValido) {
            valido = true;
        }
    }
    return valido;
}
function calcularEdad(fecha) {
    var actual = new Date();
    var nacimiento = new Date(fecha);
    var anios = actual.getFullYear() - nacimiento.getFullYear();
    var meses = actual.getMonth() - nacimiento.getMonth();
    if (meses < 0 || (meses === 0 && actual.getDate() < nacimiento.getDate())) {
        anios--;
    }
    return anios;
}
function ValidacionCampos() {
    $('input[name=identificationDoc]').on('keyup', () => {

        var input1 = $('.inputIdDoc').val();

        if (input1.length == 0) {
            unhighlight('input[name=identificationDoc]');
            $("#inputIdDocError").hide();
        }
        else if (input1.length > 7) {
            unhighlight('input[name=identificationDoc]');
            $("#inputIdDocError").hide();
        }
        else {
            highLight('input[name=identificationDoc]')
            $("#inputIdDocError").show();
        }
    });
    $('input[name=firstNameDoc]').on('keyup', () => {

        var input1 = $('.inputFirsDoc').val();
        if (input1.length > 0) {
            unhighlight('input[name=firstNameDoc]');
            $("#inputFirstNameError").hide();
        }else {
            highLight('input[name=firstNameDoc]')
            $("#inputFirstNameError").show();
        }
    });
    $('input[name=lastNameDoc]').on('keyup', () => {

        var input1 = $('.inputLastDoc').val();
        if (input1.length > 0) {
            unhighlight('input[name=lastNameDoc]');
            $("#inputLastNameError").hide();
        } else {
            highLight('input[name=lastNameDoc]')
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
    $("#selectTipoIdDoc").on("change", function () {
        var input1 = this.value;
        if (input1 != "") {
            $("#inputTipoError").hide();
        }
    });
}
function FechaMax() {
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
function GuardarDoctorClick() {
    $("#BtnSaveDoctor").on("click", function () {
        ObjetoGuardarDoctor = {
            CodTipoDoc: $("#selectTipoIdDoc").val(), Identificacion: $("#identificacionFieldDoc").val(), PrimerNombe: $("#primerNombreFieldDoc").val(),
            SegundoNombre: $("#segundoNombreField").val(), PrimerApellido: $("#primerApellidoFieldDoc").val(), SegundoApellido: $("#segundoApellidoFieldDoc").val(),
            Edad: edad, FechaNacimiento: $('#fechaNacDoc').val(), Celular: $("#celularFieldDoc").val(), Telefono: $("#telefonoField").val(),
            Correo: $("#correoFieldDoc").val(), CodDepartamento: $("#selectDepartamentosDoc").val(), CodMunicipio: $("#selectMunicipiosDoc").val(),
            Barrio: $("#barrioDoc").val(), Direccion: $("#direccionDoc").val(), UserReg: userGlobal.UserId
        }
        Save_DataPost(GuardarDoctor, '/Doctor/SaveDoctor', ObjetoGuardarDoctor)
    });
}
function limpiarCamposDoc() {
    stepperDoc.to(1);
    $("#identificacionFieldDoc").val('');
    $("#primerNombreFieldDoc").val('');
    $("#segundoNombreField").val('');
    $("#primerApellidoFieldDoc").val('');
    $("#segundoApellidoFieldDoc").val('');
    $('#fechaNacDoc').val('');
    $("#celularFieldDoc").val('');
    $("#telefonoField").val('');
    $("#correoFieldDoc").val('');
    $("#barrioDoc").val('');
    $("#direccionDoc").val('');

    hideElementSpanDoc();
}
function GuardarDoctor(data) {
    if (data.Is_Error) {
        Swal.fire(
            'error',
            'Mensaje',
            data.Msj,
        );
        ObjetoGuardarDoctor = {};
    } else {
        Swal.fire(
            'Exito!',
            data.Msj,
            'success'
        );
        ObjetoGuardarDoctor = {};
        limpiarCamposDoc();
    }
}