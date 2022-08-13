let nav = document.querySelector('#newspapers');
let navOld = document.querySelector('#newspapers-old');

let names = [
    { type: 'old',          name : 'Румайности 2014' },
    { type: 'retro-old',    name : 'Эпизоды Румайностей 2013' },
    { type: 'old-2015',     name : 'Румайности 2015' },
    { type: 'old-2016',     name : 'Румайности 2016-2018' },
    { type: 'old-2017',     name : 'Румайности 2017' },
    { type: 'old-2018',     name : 'Румайности 2018' },
    { type: 'new',          name : 'Румайности 2019+' },
];
let versions = [
    { type: 'retro-old', name: '01.01.13', href: '../2013/01.01.13.html' },
    { type: 'retro-old', name: '26.01.13', href: '../2013/26.01.13.html' },

    { type: 'old', name: '07.07.14', href: '../2014/14.07.07.html' },
    { type: 'old', name: '08.07.14', href: '../2014/14.07.08.html' },
    { type: 'old', name: '09.07.14', href: '../2014/14.07.09.html' },
    { type: 'old', name: '10.07.14', href: '../2014/14.07.10.html' },
    { type: 'old', name: '11.07.14', href: '../2014/14.07.11.html' },
    { type: 'old', name: '12.07.14', href: '../2014/14.07.12.html' },
    { type: 'old', name: '13.07.14', href: '../2014/14.07.13.html' },
    { type: 'old', name: '14.07.14', href: '../2014/14.07.14.html' },

    { type: 'old-2015', name: '25.03.15', href: '../2015/15.03.25.html' },
    { type: 'old-2015', name: '26.03.15', href: '../2015/15.03.26.html' },
    { type: 'old-2015', name: '27.03.15', href: '../2015/15.03.27.html' },
    { type: 'old-2015', name: '28.03.15', href: '../2015/15.03.28.html' },
    { type: 'old-2015', name: '29.03.15', href: '../2015/15.03.29.html' },
    { type: 'old-2015', name: '30.03.15', href: '../2015/15.03.30.html' },
    { type: 'old-2015', name: '31.03.15', href: '../2015/15.03.31.html' },
    { type: 'old-2015', name: '01.04.15', href: '../2015/15.04.01.html' },
    { type: 'old-2015', name: '02.04.15', href: '../2015/15.04.02.html' },

    { type: 'old-2016', name: '12.04.16', href: '../2016/16.04.12.html' },
    { type: 'old-2016', name: '10.06.16', href: '../2016/16.06.10.html' },
    { type: 'old-2016', name: '06.07.16', href: '../2016/16.07.06.html' },
    { type: 'old-2016', name: '07.07.16', href: '../2016/16.07.07.html' },
    { type: 'old-2016', name: '08.07.16', href: '../2016/16.07.08.html' },

    { type: 'old-2016', name: '28.05.17', href: '../2017/17.05.28.html' },
    { type: 'old-2016', name: '19.10.18', href: '../2018/18.10.19.html' },

    { type: 'new', name: '2019 год', href: '../2019/21.10.19.html' },
    { type: 'new', name: '2020 год', href: '../2020/21.10.20.html' },
    { type: 'new', name: '2021 год', href: '../2021/2021.html' },
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
        // console.log('Ага, попался!');
        // console.log(v);
    }

    li.innerHTML = `<a class="${add}" href="${v.href}">${v.name}</a>`;
    uls[v.type].append(li);
});

if(nav){
    for (const key in uls) {
        let li = document.createElement('li');
        li.append(uls[key]);
    
        li.setAttribute('data-logotype', key);
        nav.append(li);
    }
}


if(navOld){
    let uls = {};


    versions.forEach(v => {
        if(!uls[v.type]){
            uls[v.type] = document.createElement('ul');
        }
        let liOld = document.createElement('li');
    
        let add = '';
        let current = document.head.querySelector('meta[data-date]');
        if(current && current.getAttribute('data-date') === v.name){
            console.log('Ага попался');
            add = 'current-link';
        }
    
    
        liOld.innerHTML = `<a class="${add}" href="${v.href}">${v.name}</a>`;
        liOld.setAttribute('data-logotype', v.type)
    
        uls[v.type].append(liOld);
    });

    
    let newsHeader = document.createElement("h4");
    newsHeader.innerHTML = "Список выпусков";
    navOld.append(newsHeader);
    for (const key in uls) {
        let details = document.createElement('details');

        let summary = document.createElement('summary');
        let header = document.createElement('h4');
        header.innerHTML = names.find(n => n.type == key).name;
        summary.append(header);
        details.append(summary);
        details.append(uls[key]);

        if(uls[key].querySelector(".current-link")){
            details.setAttribute("open", '');
        }

        navOld.append(details);
    }
}


