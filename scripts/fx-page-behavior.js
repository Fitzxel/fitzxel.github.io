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

indexN = 5;

function navCreateLiElemts() {
    let documentFragment = document.createDocumentFragment();
    projectsArray.forEach(project => {
        let li = document.createElement('li');
        li.classList.add('list', 'sub');
        let a = document.createElement('a');
        if (document.URL.slice(document.URL.lastIndexOf('/projects') + 10).split('/')[0] == project.this) {
            a.classList.add('act');
        }
        a.tabIndex = indexN;
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
        indexN++;
    });
    document.querySelector('#projects-submenu').appendChild(documentFragment);
}
navCreateLiElemts();

const indexNavElems = document.querySelectorAll('.aside .content .nav a');// select all 'a' elements from index nav
indexNavElems.forEach(a => {// set tab index to all 'a' in index nav
    a.tabIndex = indexN;
    indexN++;
});

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
    {// simplite
        title: projectsArray.find(element => element.this == 'simplite').name,
        url: projectsArray.find(element => element.this == 'simplite').url,
        desc: projectsArray.find(element => element.this == 'simplite').desc,
        relevant: true
    }
];

document.addEventListener('submit', (e)=> {
    e.preventDefault();
});

const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');
let searchFocus = false;
let notBlur = false;

searchInput.addEventListener('focus', ()=> {
    searchFocus = true;
    searchResults.style.display = 'block';
    showRelevantsResults();
});
searchInput.addEventListener('blur', ()=> {
    searchFocus = false;
    if (notBlur == false) {
        searchResults.style.display = '';
    }
});

searchResults.addEventListener('mouseenter', ()=> {
    notBlur = true;
});
searchResults.addEventListener('mouseleave', ()=> {
    notBlur = false;
});
searchResults.addEventListener('mouseup', ()=> {
    searchResults.style.display = '';
});

searchInput.addEventListener('input', ()=> {
    let allA = searchResults.querySelectorAll('a');
    let string = searchInput.value;
    if (searchInput.value.length > 0) {
        let documentFragment = document.createDocumentFragment();
        searchResultsList.forEach(searchResult => {
            if (searchResult.title.toLocaleLowerCase().includes(string) || searchResult.desc.toLocaleLowerCase().includes(string)) {
                let a = document.createElement('a');
                a.href = searchResult.url;
                let span = document.createElement('span');
                span.textContent = searchResult.title;
                a.appendChild(span);
                let h3 = document.createElement('h3');
                h3.textContent = searchResult.desc;
                a.appendChild(h3);
                documentFragment.appendChild(a);
                
            }
            else {
                searchResults.querySelector('.over-text').innerHTML = 'Not results';
            }

            // NOT WORKING 100%
            // if (searchResult.title != prevResult) {
            //     searchInput.value.split(' ').forEach(string => {
            //         string = string.toLocaleLowerCase();
            //         if (searchResult.title.toLocaleLowerCase().includes(string) || searchResult.desc.toLocaleLowerCase().includes(string)) {
            //             let title_pos = [
            //                 searchResult.title.toLocaleLowerCase().indexOf(string),
            //                 searchResult.title.toLocaleLowerCase().indexOf(string) + string.length
            //             ];
            //             let desc_pos = [
            //                 searchResult.desc.toLocaleLowerCase().indexOf(string),
            //                 searchResult.desc.toLocaleLowerCase().indexOf(string) + string.length
            //             ];
            //             let a = document.createElement('a');
            //             a.href = searchResult.url;
            //             let span = document.createElement('span');
            //             span.innerHTML = searchResult.title.replaceAll(searchResult.title.slice(title_pos[0], title_pos[1]), `<b>${searchResult.title.slice(title_pos[0], title_pos[1])}</b>`);
            //             // span.textContent = searchResultsList[i].title.toLocaleLowerCase().replaceAll(searchInput.value.toLocaleLowerCase(), `<b>${searchResultsList[i].title.slice(searchInput.value.toLocaleLowerCase(), searchInput.value.length)}</b>`);
            //             a.appendChild(span);
            //             let h3 = document.createElement('h3');
            //             h3.innerHTML = searchResult.desc.replaceAll(searchResult.desc.slice(desc_pos[0], desc_pos[1]), `<b>${searchResult.desc.slice(desc_pos[0], desc_pos[1])}</b>`);
            //             a.appendChild(h3);
            //             documentFragment.appendChild(a);
                        
            //         }
            //         else {
            //             searchResults.querySelector('.over-text').innerHTML = 'Not results';
            //         }
            //     });
            // }
        });
        allA.forEach(element => {
            element.remove();
        });
        searchResults.appendChild(documentFragment);
        allA = searchResults.querySelectorAll('a');
        allA[0].classList.add('act');
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
            if (i == 0) {
                a.classList.add('act');
            }
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
});

document.addEventListener('keydown', (e)=> {
    if (searchFocus) {
        let allA = searchResults.querySelectorAll('a');
        let a = searchResults.querySelector('a.act');
        if (e.key == 'ArrowUp') {
            e.preventDefault();
            if (a.previousElementSibling.nodeName == 'A') {
                a.classList.remove('act');
                a.previousElementSibling.classList.add('act');
            }
            else {
                a.classList.remove('act');
                allA[allA.length-1].classList.add('act');
            }
        }
        if (e.key == 'ArrowDown') {
            e.preventDefault();
            if (a.nextElementSibling && a.nextElementSibling.nodeName == 'A') {
                a.classList.remove('act');
                a.nextElementSibling.classList.add('act');
            }
            else {
                a.classList.remove('act');
                allA[0].classList.add('act');
            }
        }
        if (e.key == 'Enter') {
            a.click();
        }
    }
});