$(document).ready(function () {
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