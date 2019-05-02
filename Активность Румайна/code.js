'use strict';
let checkColor = document.getElementById('check-color');
let table = document.getElementsByClassName('activity-table')[0];
checkColor.onchange = ToggleColors;

function ToggleColors(){
    console.log(checkColor.checked);
    for(let r = 1;r < table.rows.length-1;r++){
        for(let c = 1; c < table.rows[r].cells.length;c++){
            table.rows[r].cells[c].classList.toggle('no-background');
        }
    }
}