'use strict';
//Исходные данные
let subjects = {
    1:[
        [0,0],
        [0,0],
        [0,0],
        [0,0]
    ],
    2:[
        [{name:'Базы данных',cab:'ПА-12',type:'Л',prep:'Болдырева'},{name:'Базы данных',cab:'ПА-12',type:'Л',prep:'Болдырева'}],
        [{name:'Методы и модели анализа данных',cab:'ПА-18',type:'Л',prep:'Крамаренко'},{name:'Методы и модели анализа данных',cab:'ПА-18',type:'Л',prep:'Крамаренко'}],
        [{name:'Базы данных',cab:'ЛК-110',type:'ЛЗ',prep:'Болдырева'},{name:'Базы данных',cab:'ЛК-110',type:'ЛЗ',prep:'Болдырева'}],
        [{name:'Методы и модели анализа данных',cab:'ЛК-114',type:'ЛЗ',prep:'Крамаренко'},{name:'Методы и модели анализа данных',cab:'ЛК-114',type:'ЛЗ',prep:'Крамаренко'}],

    ],
    3:[
        [0,0],
        [{name:'Информационная безопасность',cab:'У-409',type:'Л',prep:'Бадьина'},{name:'Управление проектами',cab:'У-409',type:'Л',prep:'???'}],
        [{name:'Управление проектами',cab:'У-411',type:'ПЗ',prep:'Никитин'},{name:'Управление проектами',cab:'У-411',type:'ПЗ',prep:'Никитин'}],
        [0,0]
    ],
    4:[
        [{name:'Информационная безопасность',cab:'У-417',type:'ЛЗ',prep:'Бадьина'},{name:'Информационная безопасность',cab:'У-417',type:'ЛЗ',prep:'Бадьина'}],
        [{name:'Физкультура',cab:'Сп-К',type:'',prep:''},{name:'Физкультура',cab:'Сп-К',type:'',prep:''}],
        [{name:'РПУР',cab:'ПА-12',type:'Л',prep:'Тимофеева'},{name:'Проектирование систем',cab:'ПА-12',type:'Л',prep:'Шевченко'}],
        [{name:'РПУР',cab:'ЛК-223',type:'ПЗ',prep:'Эльза'},{name:'РПУР',cab:'ЛК-223',type:'ПЗ',prep:'Эльза'}]
    ],
    5:[
        [{name:'Экономика информатизации',cab:'ПА-22',type:'Л',prep:'Данилина'},{name:'Экономика информатизации',cab:'ПА-22',type:'Л',prep:'Данилина'}],
        [{name:'Проектирование систем',cab:'ЛК-110',type:'ЛЗ',prep:'Шевченко'},{name:'Проектирование систем',cab:'ЛК-110',type:'ЛЗ',prep:'Шевченко'}],
        [{name:'Проектирование систем',cab:'ЛК-110',type:'ЛЗ',prep:'Шевченко'},{name:'Экономика информатизации',cab:'ЛК-232',type:'ПЗ',prep:'Данилина'}],
        [{name:'Экономика информатизации',cab:'ЛК-232',type:'ПЗ',prep:'Данилина'},0]
    ],
    6:[
        [0,0],
        [0,{name:'Физкультура',cab:'Сп-К',type:'',prep:''}],
        [{name:'Проектирование систем',cab:'ЛК-311',type:'Л',prep:'Шевченко'},{name:'Проектирование систем',cab:'ЛК-311',type:'Л',prep:'Шевченко'}],
        [{name:'Проектирование систем',cab:'ЛК-110',type:'ЛЗ',prep:'Шевченко'},{name:'Проектирование систем',cab:'ЛК-110',type:'ЛЗ',prep:'Шевченко'}]
    ],
    0:[
        [0,0],
        [0,0],
        [0,0],
        [0,0]
    ],
}
let SRS = {
    12:[1],
    1:[2,4]
}
let timeTable = {
    1:[[11,35],[13,5]],
    2:[[13,15],[14,45]],
    3:[[15,25],[16,55]],
    4:[[17,5],[18,35]],
};
let months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
let weekDays = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];
//Генерируемые данные
let table = document.body.querySelector('#main-table');
let timeText = document.body.querySelector('#current-time');
let timeTillNextText = document.body.querySelector('#time-till-next');
let timeTillEndText = document.body.querySelector('#time-till-end');


let currDate = new Date();
let nextPair = null;
let minTillNextPair = -1;
let currentPair = null;
let showDaysAhead = 7;


UpdateInteractive();
TimeUpdate();
let timer = setInterval(() => UpdateInteractive(),60000);
let timer2 = setInterval(() => TimeUpdate(),1000);

let allInputs = document.body.querySelectorAll('input');
for (let i = 0; i < allInputs.length; i++) {
    const element = allInputs[i];
    if(element.type === 'radio'){
        element.addEventListener('click',() => {
            if(element.value === 'interactive'){
                UpdateInteractive();
                timer = setInterval(() => UpdateInteractive(),60000);
            }
            else{
                UpdateClassic();
                clearInterval(timer);
            }
        });
    }
}

function UpdateInteractive(){
    currDate = new Date();
    let date = new Date();
    let weekEven = true;
    let currentPair = null;
    let nextPair = null;


    table.innerHTML = '';
    for (let i = 0; i < showDaysAhead; i++) {
        let tr1 = document.createElement('tr');
        let headerWeek = document.createElement('th');
        let header = document.createElement('th');
        tr1.append(headerWeek,header);
        table.appendChild(tr1);


        headerWeek.innerText = weekEven ? 'чет': 'нечет';
        headerWeek.colSpan = 2;
        header.innerText = `${date.getDate()} ${months[date.getMonth()]}, ${weekDays[date.getDay()]}`;
        header.colSpan = 4;
        if(SRS[date.getMonth() + 1].indexOf(date.getDate()) !== -1){
            header.innerText += ', СРС!';
            header.classList.toggle('srs');
        }

        //Информация о предметах
        let day = date.getDay();
        let even = weekEven ? 0 : 1;
        for (let a = 0; a < 4; a++) {

                let tr = document.createElement('tr');
                let tdDateBegin = document.createElement('td');
                let tdDateEnd = document.createElement('td');

                tr.append(tdDateBegin,tdDateEnd);
                table.appendChild(tr);

                //Текущий предмет
                tdDateBegin.innerText = timeTable[a+1][0].join(':');
                tdDateBegin.classList.toggle('time');
                tdDateEnd.innerText = timeTable[a+1][1].join(':');
                tdDateEnd.classList.toggle('time');
                if(subjects[day][a][even] !== 0){
                    let td2 = document.createElement('td');
                    let td3 = document.createElement('td');
                    let td4 = document.createElement('td');
                    let td5 = document.createElement('td');
                    tr.append(td2,td3,td4,td5);
    
                    td2.innerText = subjects[day][a][even].name;
                    td3.innerText = subjects[day][a][even].cab;
                    td4.innerText = subjects[day][a][even].type;
                    td5.innerText = subjects[day][a][even].prep;
                    //Проверяем следующую и текущую пару
                    let pairBegin = new Date(date.getFullYear(),date.getMonth(),date.getDate(),timeTable[a+1][0][0],timeTable[a+1][0][1]); 
                    let pairEnd = new Date(date.getFullYear(),date.getMonth(),date.getDate(),timeTable[a+1][1][0],timeTable[a+1][1][1]);
                    if(i === 0 && date > pairBegin && date < pairEnd){
                        let allTd = tr.querySelectorAll('td');
                        for (let i = 0; i < allTd.length; i++) {
                            const element = allTd[i];
                            element.classList.toggle('now');
                        }
                        currentPair = subjects[day][a][even];
                        let timetill = Math.round((pairBegin-currDate)/60000);
                        timeTillEndText = `До конца текущей пары ${timetill} минут`;
                    }
                    if(nextPair === null && currDate < pairBegin){
                        let allTd = tr.querySelectorAll('td');
                        for (let i = 0; i < allTd.length; i++) {
                            const element = allTd[i];
                            element.classList.toggle('next');
                        }
                        nextPair = subjects[day][a][even];
                        let timetill = Math.round((pairBegin-currDate)/60000);
                        timeTillNextText.innerHTML = `Следующая пара \"${subjects[day][a][even].name}\" в <b>${subjects[day][a][even].cab}</b> через ${timetill} минут`;
                    }
                }
                //Пар в этот день нет
                else{
                    let td5 = document.createElement('td');
                    td5.colSpan = 4;
                    tr.appendChild(td5);
                }
        }

        //Обновление даты
        date.setDate(date.getDate() + 1);
        weekEven = date.getDay() === 1 ? !weekEven : weekEven;
    }
}
function UpdateClassic(){
    table.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        let tr = document.createElement('tr');
        let headerDay = document.createElement('th');
        let headerW1 = document.createElement('th');
        let headerW2 = document.createElement('th');

        tr.append(headerDay,headerW1,headerW2);
        table.appendChild(tr);
        headerDay.innerText = weekDays[i+1];
        headerDay.colSpan = 2;
        headerW1.innerText = 'Нечетная';
        headerW2.innerText = 'Четная';

        let day = i+1;
        for (let a = 0; a < 4; a++) {

                let tr = document.createElement('tr');
                let tdDateBegin = document.createElement('td');
                let tdDateEnd = document.createElement('td');

                tr.append(tdDateBegin,tdDateEnd);
                table.appendChild(tr);

                //Текущий предмет
                tdDateBegin.innerText = timeTable[a+1][0].join(':');
                tdDateBegin.classList.toggle('time');
                tdDateEnd.innerText = timeTable[a+1][1].join(':');
                tdDateEnd.classList.toggle('time');

                if(subjects[day][a][0].name !== subjects[day][a][1].name){
                    let td2 = document.createElement('td');
                    let td3 = document.createElement('td');
                    tr.append(td2,td3);
                    td2.innerText = subjects[day][a][0] === 0 ? '' : `${subjects[day][a][0].name} ${subjects[day][a][0].cab} (${subjects[day][a][0].type})`;
                    td3.innerText = subjects[day][a][1] === 0 ? '' : `${subjects[day][a][1].name} ${subjects[day][a][1].cab} (${subjects[day][a][1].type})`;
                }
                else{
                    let td2 = document.createElement('td');
                    tr.append(td2);
                    td2.innerText = subjects[day][a][0] === 0 ? '' : `${subjects[day][a][0].name} ${subjects[day][a][0].cab} (${subjects[day][a][0].type})`;
                    td2.colSpan = 2;
                }
                
        }
    }
}
function TimeUpdate(){
    let now = new Date();
    timeText.innerHTML = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}, текущее время: ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}