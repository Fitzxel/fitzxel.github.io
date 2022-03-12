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

document.querySelector('#projects-drop-submenu').addEventListener('click', ()=> {
    if (projectsSubmenuOpen == false) {
        projectsList.classList.add('open');
        projectsSubmenuOpen = true;
    }
    else if (projectsSubmenuOpen == true) {
        projectsList.classList.remove('open');
        projectsSubmenuOpen = false;
    }
})

window.addEventListener('resize', ()=> {
    setWidthDsI();
})

function setWidthDsI() {
    if (document.documentElement.getAttribute('fx-site') == 'docsite') {
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