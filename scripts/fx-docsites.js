let asideOpen = false;
const aside = document.querySelector('.aside');

document.querySelector('#aside-btn').addEventListener('click', ()=> {
    if (asideOpen) {
        aside.classList.remove('open');
        asideOpen = false;
    }
    else {
        aside.classList.add('open');
        asideOpen = true;
    }
});

document.querySelector('#docsite-banner').addEventListener('load', ()=> {
    document.querySelector('#docsite-banner').style.opacity = '1';
});

function applyDocsiteData(project) {
    document.querySelector('.metadata').querySelector('.icon').alt = project.tags;
    document.querySelector('.metadata').querySelector('h1').textContent = project.name;
    document.querySelector('.metadata').querySelector('time').dateTime = `${project.last.getFullYear()}-${project.last.getMonth()+1}-${project.last.getDate()}`
    document.querySelector('.metadata').querySelector('time').textContent = `Last modified: ${project.last.getDate()}-${project.last.getMonth()+1}-${project.last.getFullYear()}`;
    document.querySelector('#docsite-banner').alt = project.tags;
    document.querySelector('#desc').textContent = `'${project.desc}'`;
    document.querySelector('#repo').href = project.repo;
    document.querySelector('#repo').innerHTML = project.repo;
    document.querySelector('#type').textContent = `'${project.type}'`;
    // set languages
    project.langs.forEach(lang => {
        let langElemt = document.createElement('div');
        langElemt.classList.add('icon', lang);
        if (lang == 'html') {
            langElemt.setAttribute('title', 'HTML');
        }
        else if (lang == 'css') {
            langElemt.setAttribute('title', 'CSS');
        }
        else if (lang == 'js') {
            langElemt.setAttribute('title', 'JavaScript');
        }
        document.querySelector('#append-langs').appendChild(langElemt);
    });
    // set getIts
    let documentFragment = document.createDocumentFragment();
    for (let i = 0; i < project.getIt.length; i++) {
        let li = document.createElement('li');
        let p = document.createElement('p');
        p.classList.add('token', 'string');
        p.innerHTML = `'<a href="${project.getIt[i].url}" target="_blank">${project.getIt[i].title}</a>'`;
        li.appendChild(p);
        if (project.getIt.length > i+1) {
            let tokenPunct = document.createElement('span');
            tokenPunct.classList.add('token', 'punctuation');
            tokenPunct.textContent = ',';
            li.appendChild(tokenPunct);
        }
        documentFragment.appendChild(li);
    }
    document.querySelector('#append-getIts ul').appendChild(documentFragment);
    // set licence text
    document.querySelector('#licence').textContent = `'${project.licence}'`;
}

for (let i = 0; i < projectsArray.length; i++) {
    if (document.URL.slice(document.URL.lastIndexOf('/projects') + 10).split('/')[0] == projectsArray[i].this) {
        applyDocsiteData(projectsArray[i]);
    }
}

let lastIntersectingScroll = 0;

const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.intersectionRatio < .5 && lastIntersectingScroll > window.scrollY) {
            // console.log(entry);
            // console.log(`salir de ${entry.target.id}`);
            document.querySelector(`.aside ul.nav li a[href="#${entry.target.id}"]`).parentElement.classList.remove('act');
            if (document.querySelector(`.aside ul.nav li a[href="#${entry.target.id}"]`).parentElement.previousElementSibling) {
                document.querySelector(`.aside ul.nav li a[href="#${entry.target.id}"]`).parentElement.previousElementSibling.querySelector('a').parentElement.classList.add('act');
            }
        }
        if (entry.isIntersecting && entry.intersectionRatio >= .5) {
            // console.log(entry);
            // console.log(`entrar a ${entry.target.id}`);
            lastIntersectingScroll = window.scrollY;
            document.querySelector(`.aside ul.nav li a[href="#${entry.target.id}"]`).parentElement.classList.add('act');
            if (document.querySelector(`.aside ul.nav li a[href="#${entry.target.id}"]`).parentElement.previousElementSibling) {
                document.querySelector(`.aside ul.nav li a[href="#${entry.target.id}"]`).parentElement.previousElementSibling.querySelector('a').parentElement.classList.remove('act');
            }
            if (document.querySelector(`.aside ul.nav li a[href="#${entry.target.id}"]`).parentElement.nextElementSibling) {
                document.querySelector(`.aside ul.nav li a[href="#${entry.target.id}"]`).parentElement.nextElementSibling.querySelector('a').parentElement.classList.remove('act');
            }
        }
    });
}

let observer = new IntersectionObserver(callback, {
    rootMargin: "0px",
    threshold: .5
});

document.querySelectorAll('.article h2').forEach(element => {
    observer.observe(element);
});