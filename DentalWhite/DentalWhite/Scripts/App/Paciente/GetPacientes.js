$(document).ready(function () {
    $("#tablePacientes").DataTable({
        "responsive": true,
        "lengthChange": false,
        "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#tablePacientes_wrapper .col-md-6:eq(0)');

    TablaPacientes = $('#tablePacientes').DataTable();
    Get_DataPost(GetPacientes, '/Paciente/GetPacientes')
});

function GetPacientes(data) {
    var ArrayPacientes = data.Objeto;
    TablaPacientes.clear().draw();
    $.each(ArrayPacientes, function (index, item) {
        TablaPacientes.row.add([
            item.DescTipo,
            item.Identificacion,
            item.PrimerNombe,
            item.PrimerApellido,
            item.Edad,
            item.Celular,
            '<a style="font-size:25px" id="edit_Paciente_' + item.IdPaciente +'"><i class="fas fa-edit" title="Modificar" style="color:#007bff"></i></a>'
        ]).draw(true);
    });
}