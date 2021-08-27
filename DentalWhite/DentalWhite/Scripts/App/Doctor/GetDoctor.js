$(document).ready(function () {
    $("#tableDoctores").DataTable({
        "responsive": true,
        "lengthChange": false,
        "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#tableDoctores_wrapper .col-md-6:eq(0)');
    TablaDoctores = $('#tableDoctores').DataTable();
    Get_DataPost(GetDoctores, '/Doctor/GetDoctores')
});

function GetDoctores(data) {
    var ArrayDoctores = data.Objeto;
    TablaDoctores.clear().draw();
    $.each(ArrayDoctores, function (index, item) {
        TablaDoctores.row.add([
            item.Identificacion,
            item.PrimerNombe,
            item.PrimerApellido,
            item.Edad,
            item.Celular,
            item.Correo,
            '<a style="font-size:25px" id="edit_Doctor_' + item.IdDoctor + '" data-toggle="modal" data-target="#modalUpdateDoctor"><i class="fas fa-edit" title="Modificar" style="color:#007bff"></i></a>'
        ]).draw(true);
        $("#edit_Doctor_" + item.IdDoctor).on("click", function () {
            //hideElementSpanUpd();
            //$("#identificacionUpdate").val(item.Identificacion);
            //$("#nombreUpdate").val(item.PrimerNombe + " " + item.PrimerApellido);
            //$("#celularFieldUpdt").val(item.Celular);
            //$("#telefonoFieldUpd").val(item.Telefono);
            //$("#correoFieldUpd").val(item.Correo);
            //$("#selectDepartamentosUpd").val(item.CodDepartamento).trigger('change');
            //$("#selectMunicipiosUpd").val(item.CodMunicipio).trigger('change');
            //$("#barrioUpd").val(item.Barrio);
            //$("#direccionUpd").val(item.Direccion);
        });
    });
}