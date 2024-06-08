

function formatTime(strDate) {
    const [date, time] = strDate.split('T');
    const newTime = time.split('.')[0];
    

    return `${date} ${newTime}`;
}

function getLabel(array, key) {
    let labelArray = [];
    if (!array) return labelArray;  // Return empty array if input is undefined
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
        url:'http://127.0.0.1:8000/api/getMapData',
        type:'GET',
        success: function(data){
            console.log(data)
            let isClicked = false
        
            let xCoordinate
            let yCoordinate
            var map = L.map('map').setView([0, 0], 2);
            
            var baselayer = new L.tileLayer('http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/celestia_mars-shaded-16k_global/{z}/{x}/{y}.png', {
                zoom: 3,
                maxZoom: 6,
                tms: true,
            }).addTo(map).setZIndex(0);
            
            for(let i = 0; i<data.length;i++){
                var marker = L.marker([ data[i]['yCoordinate'],data[i]['xCoordinate']]).addTo(map);
                marker.id = i
                
                marker.on('click',function(){
                    console.log(this.id)
                })
                
            }

            $('#addObject').click(function(){
                
                isClicked = !isClicked
                
                if(isClicked) {
                    alert('Kliknij na mape aby dodac placówke, kliknij przycisk ponownie aby zrezygnować')
                }else{
                    alert('test')
                }
            })
            map.on('click',function(e){
                if(isClicked){
                    yCoordinate = e.latlng['lat']
                    
                    xCoordinate = e.latlng['lng']
                    
                    $('#small-modal').removeClass('hidden');
                }
            })
            $('#objectForm').submit(function(e){
                e.preventDefault();
            
                
                if (typeof xCoordinate !== 'undefined' && typeof yCoordinate !== 'undefined') {
                    
                    
                    $('#xCoordinates').val(parseFloat(xCoordinate.toFixed(4))) 
                    $('#yCoordinates').val(parseFloat(yCoordinate.toFixed(4))) 
                    let formData = $(this).serialize();
                    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
                    console.log(formData)
                    
            
                    $.ajax({
                        url: 'http://127.0.0.1:8000/api/createObject',
                        type: 'POST',
                        data: formData,
                        beforeSend: function(xhr, settings) {
                            xhr.setRequestHeader('X-CSRFToken', csrftoken);
                        },
                        success: function(){
                            location.reload()
                        }
                    });
                } else {
                    console.log('Coordinates are not set.'); // Log if coordinates are not set
                }
            })
        }
    })
    
    $.ajax({
        url: 'http://127.0.0.1:8000/api/getResources',
        type: 'GET',
        success: function(data) {
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                $('#wykresSelect').append(`<option value='${i}'>${data[i]['name']}</option>`);
            }
            
            let selectedValue = parseInt($('#wykresSelect').val());

            function updateChart() {
                selectedValue = parseInt($('#wykresSelect').val());
                if (!data[selectedValue] || !data[selectedValue]['resourceAudit']) {
                    
                    return;
                }
                const progressPoints = getLabel(data[selectedValue]['resourceAudit'], 'quantity');
                const timestamps = getLabel(data[selectedValue]['resourceAudit'], 'timestamp');

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
                        label: 'ilosc zasobów w czasie',
                        data: [],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            ticks: {
                                callback: function(value, index, values) {
                                    // Show every 5th label
                                    return index % 5 === 0 ? this.getLabelForValue(value) : '';
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false // Disable legend
                        }
                    }
                }
            });

            // Initial chart update
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