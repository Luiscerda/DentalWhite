$(document).ready(function () {
    $("#tableCitas").DataTable({
        "responsive": true,
        "lengthChange": false,
        "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#tableCitas_wrapper .col-md-6:eq(0)');
    TablaCitas = $('#tableCitas').DataTable();
    Get_DataPost(GetCitas, '/Cita/GetCitas')
});

function GetCitas(data) {
    var ArrayCitas = data.Objeto;
    TablaCitas.clear().draw();
    $.each(ArrayCitas, function (index, item) {
        TablaCitas.row.add([
            item.IdentificacionPaciente,
            item.PrimerNombrePaciente + " " + item.PrimerApellidoPaciente,
            item.Identificacion,
            item.PrimerNombre,
            item.CodEstado,
            item.Hora,
            item.DescEstado
            //'<a style="font-size:25px" id="edit_Doctor_' + item.IdDoctor + '" data-toggle="modal" data-target="#modalUpdateDoctor"><i class="fas fa-edit" title="Modificar" style="color:#007bff"></i></a>'
        ]).draw(true);
        //$("#edit_Doctor_" + item.IdDoctor).on("click", function () {
        //    hideElementSpanUpdD();
        //    $("#identificacionUpdateD").val(item.Identificacion);
        //    $("#nombreUpdateD").val(item.PrimerNombre + " " + item.PrimerApellido);
        //    $("#celularFieldUpdtD").val(item.Celular);
        //    $("#telefonoFieldUpdD").val(item.Telefono);
        //    $("#correoFieldUpdD").val(item.Correo);
        //    $("#selectDepartamentosUpdD").val(item.CodDepartamento).trigger('change');
        //    $("#selectMunicipiosUpdD").val(item.CodMunicipio).trigger('change');
        //    $("#barrioUpdD").val(item.Barrio);
        //    $("#direccionUpdD").val(item.Direccion);
        //});
    });
}