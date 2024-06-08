function formatTime(strDate) {
    const [date, time] = strDate.split('T');
    newTime = time.split('.')[0];
    return date + ' ' + newTime;
}

function getLabel(array, key) {
    let labelArray = [];
    for (let i = 0; i < array.length; i++) {
        if (key == "timestamp") {
            labelArray.push(formatTime(array[i][key]));
        } else {
            labelArray.push(array[i][key]);
        }
    }
    return labelArray;
}

$(document).ready(function() {
    $.ajax({
        url: 'http://127.0.0.1:8000/api/getResearches',
        type: 'GET',
        success: function(data) {

            for (let i = 0; i < data.length; i++) {
                $('#wykresSelect').append(`<option value='${i}'>${data[i]['name']}</option>`);
            }

            let selectedValue = parseInt($('#wykresSelect').val());
            
            function updateChart() {
                selectedValue = parseInt($('#wykresSelect').val());
                const progressPoints = getLabel(data[selectedValue]['projectAudit'], 'progress_points');
                const timestamps = getLabel(data[selectedValue]['projectAudit'], 'timestamp');

                chart.data.labels = timestamps;
                chart.data.datasets[0].data = progressPoints;
                chart.update();
            }

            $('#wykresSelect').change(updateChart);

            const ctx = document.getElementById('Wykres_1').getContext('2d');
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'postep badan w czasie',
                        data: [],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false 
                        }
                    }
                }
            });

            
            updateChart();
        }
    });
});


    //document.addEventListener("DOMContentLoaded", function() {
    //    const ctx = document.getElementById('Wykres_2').getContext('2d');
    //    new Chart(ctx, {
    //        type:  'bar',
    //        data: {
    //            labels: ['Czerwone', 'Niebieskie', 'Zółte', 'Zielone ', 'Fioletowe', 'Pomarańczowe'],
    //            datasets: [{
    //                label: 'Wykres 2',
    //                data: [1, 2, 3, 4, 5, 6],
    //                backgroundColor: [
    //                    'rgba(255, 99, 132, 0.2)',
    //                    'rgba(54, 162, 235, 0.2)',
    //                    'rgba(255, 206, 86, 0.2)',
    //                    'rgba(75, 192, 192, 0.2)',
    //                    'rgba(153, 102, 255, 0.2)',
    //                    'rgba(255, 159, 64, 0.2)'
    //                ],
    //                borderColor: [
    //                    'rgba(255, 99, 132, 1)',
    //                    'rgba(54, 162, 235, 1)',
    //                    'rgba(255, 206, 86, 1)',
    //                    'rgba(75, 192, 192, 1)',
    //                    'rgba(153, 102, 255, 1)',
    //                    'rgba(255, 159, 64, 1)'
    //                ],
    //                borderWidth: 1
    //            }]
    //        },
    //        // options: {
    //        //     plugins: {
    //        //         legend: {
    //        //             display: false // Wyłącza legendę
    //        //         }
    //        //     }
    //        // }
    //    });
    //});
    //
    //
    //document.addEventListener("DOMContentLoaded", function() {
    //    const ctx = document.getElementById('Wykres_3').getContext('2d');
    //    new Chart(ctx, {
    //        type:  'bar',
    //        data: {
    //            labels: ['Czerwone', 'Niebieskie', 'Zółte', 'Zielone ', 'Fioletowe', 'Pomarańczowe'],
    //            datasets: [{
    //                label: 'Linia 1',
    //                data: [20, -19, 93, 25, -12, 32],
    //                backgroundColor: [
    //                    'rgba(255, 99, 132, 0.2)',
    //                    'rgba(54, 162, 235, 0.2)',
    //                    'rgba(255, 206, 86, 0.2)',
    //                    'rgba(75, 192, 192, 0.2)',
    //                    'rgba(153, 102, 255, 0.2)',
    //                    'rgba(255, 159, 64, 0.2)'
    //                ],
    //                borderColor: [
    //                    'rgba(255, 99, 132, 1)',
    //                    'rgba(54, 162, 235, 1)',
    //                    'rgba(255, 206, 86, 1)',
    //                    'rgba(75, 192, 192, 1)',
    //                    'rgba(153, 102, 255, 1)',
    //                    'rgba(255, 159, 64, 1)'
    //                ],
    //                borderWidth: 1
    //            }]
    //        },
    //        options: {
    //            plugins: {
    //                legend: {
    //                    display: false // Wyłącza legendę
    //                }
    //            }
    //        }
    //    });
    //});
    //
    //document.addEventListener("DOMContentLoaded", function() {
    //    const ctx = document.getElementById('Wykres_4').getContext('2d');
    //    new Chart(ctx, {
    //        type:  'bar',
    //        data: {
    //            labels: ['Czerwone', 'Niebieskie', 'Zółte', 'Zielone ', 'Fioletowe', 'Pomarańczowe'],
    //            datasets: [{
    //                label: 'Linia 2',
    //                data: [20, -19, 93, 25, -12, 32],
    //                backgroundColor: [
    //                    'rgba(255, 99, 132, 0.2)',
    //                    'rgba(54, 162, 235, 0.2)',
    //                    'rgba(255, 206, 86, 0.2)',
    //                    'rgba(75, 192, 192, 0.2)',
    //                    'rgba(153, 102, 255, 0.2)',
    //                    'rgba(255, 159, 64, 0.2)'
    //                ],
//                borderColor: [
//                    'rgba(255, 99, 132, 1)',
//                    'rgba(54, 162, 235, 1)',
//                    'rgba(255, 206, 86, 1)',
//                    'rgba(75, 192, 192, 1)',
//                    'rgba(153, 102, 255, 1)',
//                    'rgba(255, 159, 64, 1)'
//                ],
//                borderWidth: 1
//            }]
//        },
//        options: {
//            plugins: {
//                legend: {
//                    display: false // Wyłącza legendę
//                }
//            }
//        }
//    });
//});