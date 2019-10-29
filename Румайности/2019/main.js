'use strict'

let count = 0;
window.onkeydown = function(){
    let header = document.getElementById('gexon-header');
    let content = document.getElementById('gexon-content');

    if(this.event.key == "f" && count == 0){
        header.innerHTML = "Судьба Гехона";
        content.classList.toggle('hidden');
        count++;
    }
    else if(this.event.key == "f"){
        header.classList.toggle('hidden');
        content.classList.toggle('hidden');
    }

}