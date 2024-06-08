let counter
function compareDate(date2,date1){
    date1 = `${date1}`.split('.')
   
    date2 = `${date2}`.split('-')
    
    for(let i = 0; i < date1.length;i++){
        if(date1[i] != date2[date2.length-i-1]){
            
            return false
        }
        
    
    }
    return true
}

function search(array,target){
    for(let i = 0; i<array.length;i++){
        if(compareDate(array[i]['date'],target)){
            return `${array[i]['work_start']}-${array[i]['work_end']}`
        }
    }
    return ''
}

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
function getNextSunday() {
    let date = new Date();
    let day = date.getDay();
    let nextSunday = new Date(date);
    if (day === 0) {
        // Today is Sunday
        nextSunday.setDate(date.getDate() + counter);
    } else {
        let diff = 7 - day;
        nextSunday.setDate(date.getDate() + diff + counter);
    }
    return nextSunday;
}

function getPreviousMonday() {
    let date = new Date();
    let day = date.getDay();
    let previousMonday = new Date(date);
    if (day === 1) {
        // Today is Sunday
        previousMonday.setDate(date.getDate() + counter);
    } else {
        let diff = (day + 6) % 7;
        previousMonday.setDate(date.getDate() - diff + counter);
    }
    return previousMonday;
}
function formatDate(date){
    let day = `${date.getDate()}`
    let month = `${date.getMonth() +1}`
    let year = `${date.getFullYear() }`

    day = day.padStart(2,'0')
    month = month.padStart(2,'0')
    
    return day+'.'+month+'.'+year
}

function fetchTableData() {
    $.ajax({
        url:'http://127.0.0.1:8000/api/createTable',
        type:'GET',
        data:{
            work_start: $('#date').text().split('--')[0],
            work_end: $('#date').text().split('--')[1]
        },
        success: function(data){
            
            $('#workTableBody').html(``)
            for(let i = 0; i<data.length; i++){
                
                $('#workTableBody').append(`<tr id='${i}'>`)
                for (let j = 0 ;j<=7;j++){
                    if(j == 0){
                        $(`#${i}`).append(`${data[i]['name']}`)
                    }
                    else{
                        let tdDate = getPreviousMonday()
                        tdDate.setDate(tdDate.getDate()+j-1)
                        
                        let value = search(data[i]['workDay'],formatDate(tdDate))
                        $(`#${i}`).append(`<td class="w-12 border border-slate-600"><input name='${data[i]['id']}---${formatDate(tdDate)}' id='${data[i]['id']}---${formatDate(tdDate)}'type='text' value='${value}'class="textarea textarea-ghost resize-none" placeholder="Bio"></td>`)
                        
                       
                    }
                    
                    
                    
                }
                $('workTableBody').append('</tr>')
                
            }
            
        }
    })
}





$(document).ready(function() {
    if(counter == null) {
        counter = 0
    }
    console.log(counter)
    
    
    $('#date').html(`${formatDate(getPreviousMonday())}--${formatDate(getNextSunday())}`)
    
    $('#increment-date').on('click',function(e){
        e.preventDefault()
        counter+=7
        $('#date').html(`${formatDate(getPreviousMonday())}--${formatDate(getNextSunday())}`)
        fetchTableData()
    })
    
    $('#decrement-date').on('click',function(e){
        e.preventDefault()
        counter-=7
        $('#date').html(`${formatDate(getPreviousMonday())}--${formatDate(getNextSunday())}`)
        fetchTableData()
    })
    $('#form').submit(function(e){
        e.preventDefault()
        console.log('metoda post')
        let formData = $(this).serialize()
        console.log(formData)
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
        $.ajax({
            url:'http://127.0.0.1:8000/api/insert',
            type:'POST',
            data: formData,
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('X-CSRFToken', csrftoken);
            },
            success: function(){
                alert('udalo sie dokonac zmian')
                
            },
            error: function(){
                console.log('kys')
            }
            
            
        })
    })
    $.ajax({
        url: 'http://127.0.0.1:8000/api/getResidentAudit',
        type: 'GET',
        success: function(data) {
            console.log(data)
            
            console.log(getLabel(data,'count'))
            const ctx = document.getElementById('Wykres_1').getContext('2d');
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: getLabel(data,'timestamp'),
                    datasets: [{
                        label: 'ilosc mieszkancow w czasie',
                        data: getLabel(data,'count'),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false // Disable legend
                        }
                    }
                }
            });

            // Initial chart update
            
        }
    });
    fetchTableData()
});
 