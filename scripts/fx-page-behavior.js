setWidthDsI();

const listButton = document.querySelectorAll('.content-list-aside__button');
function activeLink() {
    listButton.forEach((item) =>
    item.classList.remove('active'));
    this.classList.add('active');
}
listButton.forEach((item) =>
item.addEventListener('click', activeLink));

let navigationOpen = false;
const navigationMenu = document.querySelector('#navigation-menu');

document.querySelector('#navigation-button').addEventListener('click', ()=> {
    if (navigationOpen == false) {
        navigationMenu.classList.add('open');
        navigationOpen = true;
    }
    else if (navigationOpen == true) {
        navigationMenu.classList.remove('open');
        navigationOpen = false;
    }
})

document.querySelector('.section').addEventListener('click', ()=> {
    if (navigationOpen == true) {
        navigationMenu.classList.remove('open');
        navigationOpen = false;
    }
})

let projectsSubmenuOpen = false;
const projectsList = document.querySelector('#projects-list');

if (document.URL.includes('projects/')) {
    projectsList.classList.add('open');
    projectsSubmenuOpen = true;
}

const toggleSubMenuBtns = document.querySelectorAll('.drop-submenu');

for (let i = 0; i < toggleSubMenuBtns.length; i++) {
    toggleSubMenuBtns[i].addEventListener('click', ()=> {
        if (toggleSubMenuBtns[i].parentElement.parentElement.classList.value.includes('open')) {
            toggleSubMenuBtns[i].parentElement.parentElement.querySelector('.submenu').style.height = ``;
            toggleSubMenuBtns[i].parentElement.parentElement.classList.remove('open');
        }
        else if (!toggleSubMenuBtns[i].parentElement.parentElement.classList.value.includes('open')) {
            toggleSubMenuBtns[i].parentElement.parentElement.querySelector('.submenu').style.height = `calc(50px*${projectsArray.length})`;
            toggleSubMenuBtns[i].parentElement.parentElement.classList.add('open');
        }
    })
}

window.addEventListener('resize', ()=> {
    setWidthDsI();
})

function setWidthDsI() {
    if (document.documentElement.getAttribute('fx-site').split(',')[0] == 'docsite') {
        document.querySelector('.docsite-banner').querySelector('.info').style.width = `calc(${window.getComputedStyle(document.querySelector('.docsite-banner')).width} - var(--fx-banner-info-lateral-margin) * 2)`;
    }
}

const buttonsClick = document.querySelectorAll('.click-button');

for (let i = 0; i < buttonsClick.length; i++) {
    buttonsClick[i].addEventListener('click', ()=> {
        buttonsClick[i].querySelector('ion-icon').classList.add('click');
        setTimeout(() => {
            buttonsClick[i].querySelector('ion-icon').classList.remove('click');
        }, 500);
    });
}

// create sub li navigation for projects
for (let i = 0; i < projectsArray.length; i++) {
    navigationCreateLiElement(projectsArray[i]);
}
document.querySelector('#projects-submenu').style.height = `calc(50px*${projectsArray.length})`;

if (document.documentElement.getAttribute('fx-site') == 'projects') {
    for (let i = 0; i < projectsArray.length; i++) {
        createArticleElement(projectsArray[i]);
        // console.log(projectsArray[i].name);
    }
}

else if (document.documentElement.getAttribute('fx-site').includes('docsite')) {
    applyDocsiteData(projectsArray[document.documentElement.getAttribute('fx-site').split(',')[1]]);
}

function createArticleElement(project) {
    let a = document.createElement('a');
    a.setAttribute('href', project.url);
    a.classList.add('articles-tarjet');
    a.innerHTML = `
    <div class="info">
        ${project.icon}
        <h1 class="docsite-page-title">${project.name}</h1>
        <span class="date">Last modified: ${project.last.getDate()}-${project.last.getMonth() + 1}-${simpliteDocsite.last.getFullYear()}</span>
    </div>
    <img src="${project.banner}" alt="simplite extension image" class="img">
    <h3 class="docsite-page-desc">${project.desc}</h3>
    `;
    document.querySelector('.flex-articles-container').appendChild(a);
}

function applyDocsiteData(project) {
    document.querySelector('.info').innerHTML = `
    ${project.icon}
    <h1 class="docsite-page-title">${project.name}</h1>
    <span class="date">Last modified: ${project.last.getDate()}-${project.last.getMonth() + 1}-${simpliteDocsite.last.getFullYear()}</span>
    `;
    document.querySelector('#docsite-banner').src = `.${project.banner}`;
}

function navigationCreateLiElement(project) {
    let li = document.createElement('li');
    li.classList.add('list', 'sub');
    let inPage = '';
    if (document.URL.includes(projectsArray[0].url.split('..')[1])) {
        inPage = 'active';
    }
    li.innerHTML = `
    <a href="${project.url}" class="${inPage}">
        <span class="icon">
            <ion-icon name="folder-open-outline"></ion-icon>
        </span>
        <span class="title">${project.name}</span>
    </a>
    `;
    document.querySelector('#projects-submenu').appendChild(li);
}