document.addEventListener("DOMContentLoaded", function() {
    const ctx = document.getElementById('Wykres_1').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Czerwone', 'Niebieskie', 'Zółte', 'Zielone ', 'Fioletowe', 'Pomarańczowe'],
            datasets: [{
                label: 'Wykres 2',
                data: [-1, -2, -3, -4, -5, -6],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        // options: {
        //     plugins: {
        //         legend: {
        //             display: false // Wyłącza legendę
        //         }
        //     }
        // }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const ctx = document.getElementById('Wykres_2').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Czerwone', 'Niebieskie', 'Zółte', 'Zielone ', 'Fioletowe', 'Pomarańczowe'],
            datasets: [{
                label: 'Wykres 2',
                data: [1, 2, 3, 4, 5, 6],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        // options: {
        //     plugins: {
        //         legend: {
        //             display: false // Wyłącza legendę
        //         }
        //     }
        // }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const ctx = document.getElementById('Wykres_3').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Czerwone', 'Niebieskie', 'Zółte', 'Zielone ', 'Fioletowe', 'Pomarańczowe'],
            datasets: [{
                label: 'Linia 1',
                data: [20, -19, 93, 25, -12, 32],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false // Wyłącza legendę
                }
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const ctx = document.getElementById('Wykres_4').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Czerwone', 'Niebieskie', 'Zółte', 'Zielone ', 'Fioletowe', 'Pomarańczowe'],
            datasets: [{
                label: 'Linia 2',
                data: [20, -19, 93, 25, -12, 32],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false // Wyłącza legendę
                }
            }
        }
    });
});