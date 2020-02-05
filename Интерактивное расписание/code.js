'use strict';
//Исходные данные
const subjects = {
    1:[
        [0,0],
        [
            {name:'Базы данных',cab:'ЛК-232',type:'Л',prep:'Болдырева'},
            {name:'Базы данных',cab:'ЛК-232',type:'Л',prep:'Болдырева'}
        ],
        [
            {name:'Базы данных',cab:'ЛК-415',type:'ПЗ',prep:'Болдырева'},
            {name:'Базы данных',cab:'ЛК-415',type:'ПЗ',prep:'Болдырева'}
        ],
        [0,0]
    ],
    2:[
        [0,0],
        [
            {name:'Предметно-ориентированные эк. инф. системы',cab:'ЛК-226',type:'Л',prep:'Показаньев'},
            {name:'Интеллектуализация инф. систем',cab:'ЛК-232',type:'Л',prep:'-'}
        ],
        [
            {name:'Предметно-ориентированные эк. инф. системы',cab:'ЛК-108',type:'ПЗ',prep:'Показаньев'},
            {name:'Предметно-ориентированные эк. инф. системы',cab:'ЛК-108',type:'ПЗ',prep:'Показаньев'},
        ],
        [
            {name:'Интеллектуализация инф. систем',cab:'ЛК-108',type:'ПЗ',prep:'-'},
            {name:'Интеллектуализация инф. систем',cab:'ЛК-108',type:'ПЗ',prep:'-'}
        ],

    ],
    3:[
        [
            {name:'Корпоративные инф. системы',cab:'БЦ-108',type:'ЛЗ',prep:'Терехова'},
            {name:'Корпоративные инф. системы',cab:'БЦ-108',type:'ЛЗ',prep:'Терехова'}
        ],
        [
            {name:'Физкультура',cab:'Сп-К',type:'',prep:''},
            {name:'Физкультура',cab:'Сп-К',type:'',prep:''}
        ],
        [0,0],
        [0,0]
    ],
    4:[
        [
            0,
            {name:'Корпоративные инф. системы',cab:'БЦ-18',type:'ЛЗ',prep:'Терехова'}
        ],
        [
            {name:'Корпоративные инф. системы',cab:'БЦ-18',type:'Л',prep:'Терехова'},
            {name:'Корпоративные инф. системы',cab:'БЦ-18',type:'Л',prep:'Терехова'}
        ],
        [
            {name:'Корпоративные инф. системы',cab:'БЦ-18',type:'ЛЗ',prep:'Терехова'},
            {name:'Корпоративные инф. системы',cab:'БЦ-18',type:'ЛЗ',prep:'Терехова'}
        ],
        [
            {name:'Распр. системы и облачные вычисления',cab:'ЛК-117',type:'ЛЗ',prep:'-'},
            {name:'Распр. системы и облачные вычисления',cab:'ЛК-117',type:'ЛЗ',prep:'-'}
        ]
    ],
    5:[
        [
            {name:'Распр. системы и облачные вычисления',cab:'ЛК-117',type:'ЛЗ',prep:'-'},
            {name:'Распр. системы и облачные вычисления',cab:'ЛК-117',type:'ЛЗ',prep:'-'}
        ],
        [
            {name:'Физкультура',cab:'Сп-К',type:'',prep:''},
            {name:'Распр. системы и облачные вычисления',cab:'ЛК-311',type:'Л',prep:'-'}
        ],
        [
            {name:'Компьютерная графика и программирование игр',cab:'ЛК-117',type:'ЛЗ',prep:'Якунина'},
            {name:'Компьютерная графика и программирование игр',cab:'ЛК-117',type:'ЛЗ',prep:'Якунина'}
        ],
        [
            {name:'Компьютерная графика и программирование игр',cab:'ЛК-232',type:'Л',prep:'Якунина'},
            {name:'Компьютерная графика и программирование игр',cab:'ЛК-232',type:'Л',prep:'Якунина'}
        ]
    ],
    6:[
        [0,0],
        [0,0],
        [0,0],
        [0,0]
    ],
    0:[
        [0,0],
        [0,0],
        [0,0],
        [0,0]
    ],
}
const SRS = {
    2:[12,18,22,24,28],
    3:[5,10,14,18,26,30],
    4:[3],
}
const timeTable = {
    1:[[11,35],[13,5]],
    2:[[13,15],[14,45]],
    3:[[15,25],[16,55]],
    4:[[17,5],[18,35]],
};
const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const weekDays = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];
//Генерируемые данные
let table = document.querySelector('#main-table');
let timeNowText = document.querySelector('#current-time');
let timeTillNextPairText = document.querySelector('#time-till-next');
let timeTillSRSText = document.querySelector('#time-till-srs');


timeTillNextPairText.addEventListener('mouseover',() => {
    document.querySelectorAll('.next').forEach(elem => {
        elem.classList.toggle('selected');
    });
});
timeTillNextPairText.addEventListener('mouseout',() => {
    document.querySelectorAll('.selected').forEach(elem => {
        elem.classList.toggle('selected');
    });
});

let currDate = new Date();
let showDaysAhead = 7;

UpdateInteractive();

//Автоматическое обновление
let timer = setInterval(() => UpdateInteractive(),60000);
let timer2 = setInterval(() => {
    currDate = new Date();
    SetText(timeNowText,`${currDate.getDate()} ${months[currDate.getMonth()]} ${currDate.getFullYear()}, время: ${currDate.getHours()}:${currDate.getMinutes()}:${currDate.getSeconds()}`)
},1000);

//Интерактивный --> Классический
let interactive = document.querySelector('#a-interactive');
let classic = document.querySelector('#a-classic');
interactive.addEventListener('click',() => {
    interactive.classList.add('active');
    classic.classList.remove('active');
    UpdateInteractive();
    timer = setInterval(() => UpdateInteractive(),60000);
});
classic.addEventListener('click',() => {
    classic.classList.add('active');
    interactive.classList.remove('active');
    UpdateClassic();
    clearInterval(timer);
});


function UpdateInteractive(){
    let date = new Date();
    let weekEven = true;
    let nextPair = null;
    let currentPair = null;
    let nextSRS = null;


    table.innerHTML = '';
    for (let i = 0; i < showDaysAhead; i++) {
        let tr = TableAddTr(table);
        let textEven = weekEven ? 'чет': 'нечет';
        TableAddTh(tr,textEven,2);
        TableAddTh(tr,`${date.getDate()} ${months[date.getMonth()]}, ${weekDays[date.getDay()]}`,3);
        let thSRS = TableAddTh(tr,``);

        if(SRS[date.getMonth() + 1].indexOf(date.getDate()) !== -1){
            thSRS.innerHTML = 'СРС';
            thSRS.classList.toggle('srs');
            if(nextSRS === null){
                nextSRS = date;
                SetText(timeTillSRSText,`Следующая СРС в ${weekDays[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`);
                if(date.getDate() === new Date().getDate()){
                    SetText(timeTillSRSText,`CРС сегодня!`);
                }

            }
        }

        //Информация о предметах
        let day = date.getDay();
        let even = weekEven ? 0 : 1;

        for (let a = 0; a < 4; a++) {
            let tr = TableAddTr(table);
            TableAddTd(tr,timeTable[a+1][0].join(':')).classList.toggle('time');
            TableAddTd(tr,timeTable[a+1][1].join(':')).classList.toggle('time');

            if(subjects[day][a][even].name){
                TableAddTd(tr,subjects[day][a][even].name);
                TableAddTd(tr,subjects[day][a][even].cab);
                TableAddTd(tr,subjects[day][a][even].prep);
                TableAddTd(tr,subjects[day][a][even].type);


                let pairBegin = new Date(date.getFullYear(),date.getMonth(),date.getDate(),timeTable[a+1][0][0],timeTable[a+1][0][1]); 
                let pairEnd = new Date(date.getFullYear(),date.getMonth(),date.getDate(),timeTable[a+1][1][0],timeTable[a+1][1][1]);
                //Текущая пара
                if(i === 0 && date > pairBegin && date < pairEnd){
                    tr.classList.toggle('now');
                    currentPair = subjects[day][a][even];
                    let timetill = Math.round((pairEnd-date)/60000);
                    SetText(timeTillNextPairText,`\"${subjects[day][a][even].name}\" кончится через ${timetill} минут`);
                }
                //Следующая пара
                if(currentPair === null && nextPair === null && currDate < pairBegin){
                    tr.classList.toggle('next');
                    nextPair = subjects[day][a][even];
                    let timetill = Math.round((pairBegin-currDate)/60000);
                    SetText(timeTillNextPairText,`\"${subjects[day][a][even].name}\" в <b>${subjects[day][a][even].cab}</b> через ${timetill} минут`);
                }
            }
            //Пар в это время нет
            else{
                TableAddTd(tr,'-',4);
            }
        }

        //Обновление даты
        date.setDate(date.getDate() + 1);
        weekEven = date.getDay() === 1 ? !weekEven : weekEven;
    }
}

function UpdateClassic(){
    table.innerHTML = '';
    //Дни СРС
    let tr = TableAddTr(table);
    TableAddTh(tr,'Месяц',2);
    TableAddTh(tr,'Дни СРС',2);
    for(let month of Object.keys(SRS)){
        let tr = TableAddTr(table);
        TableAddTd(tr,month,2).classList.toggle('time');
        TableAddTd(tr,SRS[month].join('; '),2);
    }
    //Само расписание
    for (let i = 0; i < 6; i++) {
        let tr = TableAddTr(table);
        TableAddTh(tr,weekDays[i+1],2);
        TableAddTh(tr,'Нечетная');
        TableAddTh(tr,'Четная');
        let day = i+1;
        for (let a = 0; a < 4; a++) {
            let tr = TableAddTr(table);
            TableAddTd(tr,timeTable[a+1][0].join(':')).classList.toggle('time');
            TableAddTd(tr,timeTable[a+1][1].join(':')).classList.toggle('time');

            if(subjects[day][a][0].name !== subjects[day][a][1].name){
                TableAddTd(tr,GetDescr(subjects[day][a][0]));
                TableAddTd(tr,GetDescr(subjects[day][a][1]));
            }
            else{
                TableAddTd(tr,GetDescr(subjects[day][a][0]),2);
            }

            function GetDescr(subject){
                if(subject.name){
                    return `${subject.name} ${subject.cab} (${subject.type})`;
                }
                else{
                    return '';
                } 
            }                
        }
    }
}


function SetText(p,text){
    p.innerHTML = text;
}
function TableAddTd(tr,info,colspan=1){
    let td = document.createElement('td');
    if(info){
        td.innerHTML = info;
    }
    td.colSpan = colspan;
    tr.append(td);
    return td;
}
function TableAddTh(tr,info,colspan=1){
    let th = document.createElement('th');
    if(info){
        th.innerHTML = info;
    }
    th.colSpan = colspan;
    tr.append(th);
    return th;
}
function TableAddTr(table){
    let tr = document.createElement('tr');
    table.append(tr);
    return tr;
}