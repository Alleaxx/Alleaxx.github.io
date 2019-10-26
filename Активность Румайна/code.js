'use strict';
let checkColor = document.getElementById('check-color');
let checkPages = document.getElementById('check-pages');
let checkPerDay = document.getElementById('check-perDay');

let table1 = document.getElementsByClassName('activity-table')[0];
let table2 = document.getElementsByClassName('id-activity-table')[0];
checkColor.onchange = ToggleColors;
checkPages.onchange = TogglePages;
checkPerDay.onchange = TogglePerDay;
checkPages.checked = false;
checkColor.checked = true;
checkPerDay.checked = false;
function ToggleColors(){
    console.log(checkColor.checked);
    for(let r = 1;r < table1.rows.length-1;r++){
        for(let c = 1; c < table1.rows[r].cells.length;c++){
            table1.rows[r].cells[c].classList.toggle('no-background');
        }
    }
}

function TogglePages(){
    console.log(checkPages.checked);
    for(let r = 1;r < table2.rows.length;r++){
        for(let c = 1; c < table2.rows[r].cells.length;c++){
            let amount = table2.rows[r].cells[c].innerHTML;
            if(!isNaN(amount)){
                if(checkPages.checked){
                    amount /= 20;
                }
                else{
                    amount *= 20;
                }
                table2.rows[r].cells[c].innerHTML = Math.floor(amount * 100) / 100;    
            }
        }
    }
}
function TogglePerDay(){
    console.log(checkPages.checked);
    for(let r = 1;r < table2.rows.length;r++){
        for(let c = 1; c < table2.rows[r].cells.length;c++){
            let amount = table2.rows[r].cells[c].innerHTML;
            if(!isNaN(amount)){
                if(checkPerDay.checked){
                    amount /= 30;
                }
                else{
                    amount *= 30;
                }
                table2.rows[r].cells[c].innerHTML = Math.floor(amount * 100) / 100;    
            }
        }
    }
}