if (!localStorage.getItem('slidesOn')) {
    localStorage.setItem('slidesOn', 'true');
    document.querySelector('#slides-button').classList.add('active');
}

const sections = document.querySelectorAll('.presentation-sections');

const curtain = document.querySelector('#curtain');

document.addEventListener('DOMContentLoaded', ()=> {
    window.scrollTo(0, 0);
})

window.onload = ()=> {
    document.querySelector('#load-bar').style.width = '100%';
    curtain.style.backgroundColor = '#353b48';
    setTimeout(() => {
        curtain.style.top = 'calc(-100% + 50px)';
    }, 3300);
    setTimeout(() => {
        for (let i = 0; i < sections.length; i++) {
            sections[i].style.opacity = '1';
        }
    }, 3500);
    setTimeout(() => {
        document.querySelector('.fotter-header').style.opacity = '1';
        curtain.style.boxShadow = '0 5px 20px 0px rgb(36 36 36 / 50%)';
        setInterval(() => {
            if (localStorage.getItem('slidesOn') == 'true') {
                slideIn1();
            }
        }, 3000);
    }, 4000)
}

// change images

imagesFor1 = ['./img/for1-0.jpg','./img/for1-1.jpg'];
let sN1 = 0;

function slideIn1() {
    if (sN1 <= 1) {
        sections[0].style.backgroundImage = `url(${imagesFor1[sN1]})`;
        sN1++;
    }
    else if (sN1 > 1) {
        sN1 = 0;
        slideIn1();
    }
}

document.querySelector('#slides-button').addEventListener('click', () => {
    if (localStorage.getItem('slidesOn') == 'true') {
        localStorage.setItem('slidesOn', 'false');
        document.querySelector('#slides-button').classList.remove('active');
    }
    else if (localStorage.getItem('slidesOn') == 'false') {
        localStorage.setItem('slidesOn', 'true');
        document.querySelector('#slides-button').classList.add('active');
    }
})