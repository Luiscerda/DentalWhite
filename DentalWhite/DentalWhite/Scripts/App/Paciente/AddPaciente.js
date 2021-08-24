var ObjetoGuardarPaciente = {};
var user;
$(document).ready(function () {
    hideElementSpan();
    validation();
    user = getCookieGeneral('UsuarioDW');
    user = JSON.parse(Base64.decode(user));
    GuardarPacienteClick();
    var stepper = new Stepper($('.bs-stepper')[0])
    
    $("#BtnNext").on("click", function (event) {
        stepper.next();
        event.preventDefault();
    });
    $("#BtnPre").on("click", function (event) {
        stepper.previous()
        event.preventDefault();
    });
    $("#BtnNext2").on("click", function (event) {
        stepper.next();
        event.preventDefault();
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
    $('#BtnNext').addClass('disabled').prop('disabled', true);
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

        if (input1.length > 7) {
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
    CloseLoading();
    if (data.Is_Error) {
        swal.fire({
            icon: 'error',
            title: 'Atención',
            text: data.Msj,
        });
        ObjetoGuardarPaciente = {};
    } else {

        swal.fire({
            icon: 'success',
            title: "Atención",
            text: data.Msj,
        })
        ObjetoGuardarPaciente = {};
    }
}