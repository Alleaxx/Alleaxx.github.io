let table = document.querySelector('.newspaper-versions');

table.addEventListener('click', (e) => {
    let tr = e.target.closest('TR');
    if(tr){
        if(tr.getAttribute('data-state') === 'opened'){
            tr.setAttribute('data-state','closed');
        }
        else if(tr.getAttribute('data-state') === 'closed'){
            tr.setAttribute('data-state','opened');
        }
    }
})