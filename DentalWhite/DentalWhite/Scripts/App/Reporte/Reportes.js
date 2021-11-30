let ArrayTempGra = [];
let dataCant = [];
let dataName = [];
$(document).ready(function () {
    //ShowLoading();
    google.charts.load('current', { 'packages': ['corechart'] });
    Get_DataPost(getData, '/Reporte/GetEdades')
});

function getData(data) {
    ArrayTempGra = data.Objeto;
    google.charts.setOnLoadCallback(chartPie);
    //CloseLoading();
}

function chartPie() {
    for (var i in ArrayTempGra) {
        dataName.push(ArrayTempGra[i].Edad);
        dataCant.push(ArrayTempGra[i].Cantidad);
    }
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Pizza');
    data.addColumn('number', 'Populartiy');
    data.addRow([dataName.toString(), Number(dataCant)]);
    for (var i in ArrayTempGra) {
        let arr = [];
        let rango = "";
        switch (true) {
            case (ArrayTempGra[i].Edad < 18):
                rango = "Menor de 18"
                break;
            case (ArrayTempGra[i].Edad >= 18 || ArrayTempGra[i].Edad < 24):
                rango = "Entre 18 y 23";
                break;
            case (ArrayTempGra[i].Edad >= 24 || ArrayTempGra[i].Edad < 34):
                rango = "Entre 24 y 33";
                break;
            default:
        }
        arr.push(rango, ArrayTempGra[i].Cantidad);
        data.addRow(arr);
    }
    var options = { 'width': 500, 'height': 400 };

    var chart = new google.visualization.PieChart(document.getElementById('myChart'));
    chart.draw(data, options);
}