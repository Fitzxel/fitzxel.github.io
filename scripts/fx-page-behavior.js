let navOpen = false;
const navMenu = document.querySelector('#navigation-menu');

document.querySelector('#menu-btn').addEventListener('click', ()=> {
    if (navOpen) {
        navMenu.classList.remove('open');
        navOpen = false;
    }
    else {
        navMenu.classList.add('open');
        navOpen = true;
    }
});

document.querySelector('#projects-submenu').style.height = 50*projectsArray.length + 'px';

const toggleSubMenuBtns = document.querySelectorAll('.drop-submenu');

for (let i = 0; i < toggleSubMenuBtns.length; i++) {
    toggleSubMenuBtns[i].addEventListener('click', ()=> {
        if (toggleSubMenuBtns[i].parentElement.parentElement.classList.value.includes('open')) {
            toggleSubMenuBtns[i].parentElement.parentElement.querySelector('.submenu').style.height = ``;
            toggleSubMenuBtns[i].parentElement.parentElement.classList.remove('open');
        }
        else if (!toggleSubMenuBtns[i].parentElement.parentElement.classList.value.includes('open')) {
            toggleSubMenuBtns[i].parentElement.parentElement.querySelector('.submenu').style.height = 50*projectsArray.length + 'px';
            toggleSubMenuBtns[i].parentElement.parentElement.classList.add('open');
        }
    })
}

function navCreateLiElemts() {
    let documentFragment = document.createDocumentFragment();
    projectsArray.forEach(project => {
        let li = document.createElement('li');
        li.classList.add('list', 'sub');
        let a = document.createElement('a');
        if (document.URL.slice(document.URL.lastIndexOf('/projects') + 10).split('/')[0] == project.this) {
            a.classList.add('act');
        }
        a.href = project.url;
        li.appendChild(a);
        let icon = document.createElement('img');
        icon.classList.add('icon');
        icon.src = `../../projects/${project.this}/icon.svg`;
        a.appendChild(icon);
        let span = document.createElement('span');
        span.classList.add('title');
        span.textContent = project.name;
        a.appendChild(span);
        documentFragment.appendChild(li);
    });
    document.querySelector('#projects-submenu').appendChild(documentFragment);
}
navCreateLiElemts();

function createArticlesElements() {
    let documentFragment = document.createDocumentFragment();
    projectsArray.forEach(project => {
        let a = document.createElement('a');
        a.classList.add('articles-card');
        a.setAttribute('href', project.url);
        let banner = document.createElement('img');
        banner.classList.add('banner');
        banner.src = `../projects/${project.this}/banner.png`;
        banner.alt = project.tags;
        a.appendChild(banner);
        let info = document.createElement('div');
        info.classList.add('info');
        let icon = document.createElement('img');
        icon.classList.add('icon');
        icon.src = `../projects/${project.this}/icon.svg`;
        info.appendChild(icon);
        let h2 = document.createElement('h2');
        h2.classList.add('docsite-page-title');
        h2.textContent = project.name;
        info.appendChild(h2);
        let span = document.createElement('span');
        span.classList.add('date');
        span.textContent = `Last modified: ${project.last.getDate()}-${project.last.getMonth() + 1}-${project.last.getFullYear()}`;
        info.appendChild(span);
        a.appendChild(info);
        let h3 = document.createElement('h3');
        h3.classList.add('docsite-page-desc');
        h3.textContent = project.desc;
        a.appendChild(h3);
        documentFragment.appendChild(a);
    });
    document.querySelector('.flex-articles-container').appendChild(documentFragment);
}

let projectsSubmenuOpen = false;
const projectsList = document.querySelector('#projects-list');

if (document.URL.includes('/projects')) {
    projectsList.classList.add('open');
    projectsSubmenuOpen = true;
    if (document.URL.length == document.URL.lastIndexOf('/projects') + 10) {
        createArticlesElements();
    }
}


const searchResultsList = [
    {
        title: 'Projects',
        url: '../../projects/',
        desc: '',
        relevant: true
    },
    {
        title: 'Simplite',
        url: '../../projects/simplite',
        desc: projectsArray.find(element => element.this == 'simplite').desc,
        relevant: true
    }
];

const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');

searchInput.addEventListener('focus', ()=> {
    searchResults.style.display = 'block';
    showRelevantsResults();
});

searchInput.addEventListener('input', ()=> {
    let allA = searchResults.querySelectorAll('a');
    if (searchInput.value.length > 0) {
        let documentFragment = document.createDocumentFragment();
        for (let i = 0; i < searchResultsList.length; i++) {
            if (searchResultsList[i].title.slice(0, 5).toLocaleLowerCase().includes(searchInput.value.toLocaleLowerCase()) || searchResultsList[i].desc.toLocaleLowerCase().includes(searchInput.value.toLocaleLowerCase())) {
                let a = document.createElement('a');
                a.href = searchResultsList[i].url;
                a.innerHTML = searchResultsList[i].title;
                let h3 = document.createElement('h3');
                h3.textContent = searchResultsList[i].desc
                a.appendChild(h3);
                documentFragment.appendChild(a);
            }
            else {
                searchResults.querySelector('.over-text').innerHTML = 'Not results';
            }
        }
        allA.forEach(element => {
            element.remove();
        });
        searchResults.appendChild(documentFragment);
    }
    else {
        searchResults.querySelector('.over-text').innerHTML = 'Results';
        showRelevantsResults();
    }
});

function showRelevantsResults() {
    let allA = searchResults.querySelectorAll('a');
    allA.forEach(element => {
        element.remove();
    });
    let documentFragment = document.createDocumentFragment();
    for (let i = 0; i < searchResultsList.length; i++) {
        if (searchResultsList[i].relevant) {
            let a = document.createElement('a');
            a.href = searchResultsList[i].url;
            a.innerHTML = searchResultsList[i].title;
            let h3 = document.createElement('h3');
            h3.textContent = searchResultsList[i].desc
            a.appendChild(h3);
            documentFragment.appendChild(a);
        }
    }
    searchResults.appendChild(documentFragment);
}


document.body.addEventListener('click', (e)=>{
    if (!e.composedPath().find(element => element.nodeName == 'NAV') && navOpen && !e.composedPath().find(element => element.nodeName == 'HEADER')) {
        navMenu.classList.remove('open');
        navOpen = false;
    }
    if (!e.composedPath().find(element => element == searchResults) && !e.composedPath().find(element => element == searchInput)) {
        searchResults.style.display = '';
    }
});