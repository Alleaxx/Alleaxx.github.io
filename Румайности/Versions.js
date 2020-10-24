let nav = document.querySelector('#newspapers');


let versions = [
    { type: 'old', name: '07.07.14', href: '../2014/07.07.14.html' },
    { type: 'old', name: '08.07.14', href: '../2014/08.07.14.html' },
    { type: 'old', name: '09.07.14', href: '../2014/09.07.14.html' },
    { type: 'old', name: '10.07.14', href: '../2014/10.07.14.html' },
    { type: 'old', name: '11.07.14', href: '../2014/11.07.14.html' },
    { type: 'old', name: '12.07.14', href: '../2014/12.07.14.html' },
    { type: 'old', name: '13.07.14', href: '../2014/13.07.14.html' },
    { type: 'old', name: '14.07.14', href: '../2014/14.07.14.html' },
    { type: 'new', name: '2019 год', href: '../2019/21.10.19.html' },
    { type: 'new', name: '2020 год', href: '../2020/21.10.20.html' },
];

let uls = {};
versions.forEach(v => {
    if(!uls[v.type]){
        uls[v.type] = document.createElement('ul');
        uls[v.type].classList.toggle('row');
    }
    let li = document.createElement('li');

    let current = document.head.querySelector('meta[data-date]');
    let add = '';
    if(current && current.getAttribute('data-date') === v.name){
        add = 'current-link';
        console.log('Ага, попался!');
        console.log(v);
    }

    li.innerHTML = `<a class="${add}" href="${v.href}">${v.name}</a>`;
    uls[v.type].append(li);
});

for (const key in uls) {
    let li = document.createElement('li');
    li.append(uls[key]);

    li.setAttribute('data-logotype', key);
    nav.append(li);
}