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

document.querySelector('.docsite-section').addEventListener('click', ()=> {
    if (navigationOpen == true) {
        navigationMenu.classList.remove('open');
        navigationOpen = false;
    }
})