'use strict';
let Statistics = {
    2011: {7:0, 8:0, 9:0, 10:3089, 11:738, 12:316},
    2012: {1:704, 2:453, 3:261, 4:284, 5:1014, 6:3886, 7:5459, 8:11968, 9: 8061, 10:6747, 11:9847, 12:17800 },
    2013: {1:40243, 2:32079, 3:57191, 4:77337, 5:55329, 6:67017, 7:54037, 8:51312, 9: 33062, 10:31113, 11:35405, 12:41363 },
    2014: {1:28971, 2:18159, 3:37441, 4:31273, 5:42402, 6:40749, 7:61880, 8:66823, 9: 15433, 10:14963, 11:12437, 12:19432 },
    2015: {1:27884, 2:15072, 3:11116, 4:11732, 5:8031, 6:6226, 7:14169, 8:15086, 9: 6733, 10:6298, 11:6245, 12:5087 },
    2016: {1:4227, 2:3586, 3:13842, 4:10674, 5:6400, 6:6522, 7:20100, 8:30920, 9: 10396, 10:4865, 11:1876, 12:4714 },
    2017: {1:8566, 2:10462, 3:10748, 4:5408, 5:4418, 6:8590, 7:4805, 8:7078, 9: 5528, 10:7996, 11:3545, 12:2717 },
    2018: {1:4377, 2:2309, 3:2588, 4:2872, 5:2549, 6:4050, 7:2550, 8:1382, 9: 736, 10:906, 11:839, 12:963 },
    2019: {1:773, 2:802, 3:1111, 4:1650, 5:1530, 6:2276, 7:3271, 8:1541, 9: 1119, 10:1702, 11:814, 12:2287 },
}
let colors = [
    {min: 1,max: 1000, color:'#ffc7ce'},
    {min: 1001,max: 3000, color:'#efec8a'},
    {min: 3001,max: 10000, color:'#c6efce'},
    {min: 10001,max: 40000, color:'#c7e7fd'},
    {min: 40001,max: 1000000, color:'#decefe'},
]
let selectedYears = [];
let checkPages = document.getElementById('check-pages');
let checkPerDay = document.getElementById('check-perDay');

let tableID = document.getElementsByClassName('id-activity-table')[0];
let ctx = document.getElementById('chart-stat').getContext('2d');

checkPages.onchange = () => {
    RecountStatisticsID();

    if(checkPages.checked){
        tableID.rows[0].cells[0].innerHTML = tableID.rows[0].cells[0].innerHTML.replace('постов','страниц');
    }
    else{
        tableID.rows[0].cells[0].innerHTML = tableID.rows[0].cells[0].innerHTML.replace('страниц','постов');
    }
}
checkPerDay.onchange = () => {
    RecountStatisticsID();

    if(checkPerDay.checked){
        tableID.rows[0].cells[0].innerHTML = tableID.rows[0].cells[0].innerHTML.replace('всего','в день');
    }
    else{
        tableID.rows[0].cells[0].innerHTML = tableID.rows[0].cells[0].innerHTML.replace('в день','всего');
    }
}

FillHeadersID();
FillStatisticsID();
function FillHeadersID(){
    tableID.innerHTML = '';
    AddTableRow(tableID,[GetTableCell('постов<br>всего',1,'th'),GetTableCell('I',3,'th'),GetTableCell('II',3,'th'),
                        GetTableCell('III',3,'th'),GetTableCell('IV',3,'th'),GetTableCell('Статистика года',2,'th')])
    AddTableRow(tableID,['Год','Янв.','Февр.','Март','Апр.','Май','Июнь','Июль','Авг.','Сент.','Окт.','Нояб.','Дек.','Всего'],'th');
}
function RecountStatisticsID(){
    for (let i = 0; i < Object.keys(Statistics).length; i++) {
        let years = Object.keys(Statistics);
        let row = tableID.rows[i+2];
        let sum = 0;
        let avg = 0;

        for (let a = 1; a < 13; a++) {
            let messages = Statistics[years[i]][a];
            let td = row.cells[a];
            if(messages !== undefined){
                messages = checkPerDay.checked ? (messages/30) : messages;
                messages = checkPages.checked ? (messages/20) : messages;

                td.innerHTML = Math.ceil(messages * 10) / 10;
                avg++;
                sum += messages;    
            }
        }

        avg = sum / avg;
        // row.cells[13].innerHTML = Math.round(sum);
        // row.cells[14].innerHTML = Math.round(avg);

    }
}
function FillStatisticsID(){
    for (let i = 0; i < Object.keys(Statistics).length; i++) {
        let years = Object.keys(Statistics);
        let row = AddTableRow(tableID);
        let sum = 0;
        let avg = 0;

        let thYear = AddTableCell(row,years[i],1,'th');
        thYear.classList.toggle('year');
        thYear.onclick = function(){
            let year = thYear.textContent;
            if(selectedYears.includes(year)){
                selectedYears.splice(selectedYears.indexOf(year),1);
            }
            else{
                selectedYears.push(year);
            }
            thYear.classList.toggle('active');

            let labels = []
            let data = [];
            selectedYears.sort();
            selectedYears.forEach(year => {
                Object.keys(Statistics[year]).forEach(elem => {labels.push(`${year}-${elem}`)});
                Object.values(Statistics[year]).forEach(elem => {data.push(elem)});
            });
            
            let chartStat = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `Количество постов в ${selectedYears.join(' - ')}`,
                    data: data,
                    backgroundColor: ['rgba(255, 224, 166, 0.2)',],
                    borderColor: ['rgb(236, 154, 2)'],
                    borderWidth: 1
                }]
            }
        });
        };

        for (let a = 1; a < 13; a++) {
            let messages = Statistics[years[i]][a];
            let td = AddTableCell(row,'');
            if(messages !== undefined){
                td.innerHTML = messages;
                colors.forEach(condition => {
                    if(messages >= condition.min && messages <= condition.max){
                        td.style.backgroundColor = condition.color;
                    }
                });
                avg++;
                sum += messages;    
            }
        }

        avg = sum / avg;
        AddTableCell(row,sum);
        // AddTableCell(row,Math.round(avg));    

    }
}


function AddTableRow(table,tds,type){
    let tr = document.createElement('tr');
    if(tds){
        for (let i = 0; i < tds.length; i++) {
            if(type === 'td' || type === 'th'){
                AddTableCell(tr,tds[i],1,type);   
            }
            else{
                tr.appendChild(tds[i]); 
            }
        }
    }
    table.appendChild(tr);
    return tr;  
}
function AddTableCell(tr,content,colspan=1,type='td'){
    let td = GetTableCell(content,colspan,type);
    tr.appendChild(td);
    return td;
}
function GetTableCell(content,colspan=1,type='td'){
    let td = document.createElement(type);
    td.colSpan = colspan;
    td.innerHTML = content;
    return td;
}