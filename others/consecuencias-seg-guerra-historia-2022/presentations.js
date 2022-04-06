// if (!localStorage.getItem('slidesOn')) {
//     localStorage.setItem('slidesOn', 'true');
// }

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
    }, 4000)
}

// change images

// let sN1 = 0;
// let sN2 = 0;
// let sN3 = 0;

// function slideIn1() {
//     if (localStorage.getItem('slidesOn') == 'true') {
//         if (sN1 <= 5) {
//             sections[0].style.backgroundImage = `url(./img/for1/${sN1}.webp)`;
//             sN1++;
//             setTimeout(() => {
//                 slideIn1();
//             }, 8000);
//         }
//         else {
//             sN1 = 0;
//             slideIn1();
//         }
//     }
// }
// function slideIn2() {
//     if (localStorage.getItem('slidesOn') == 'true') {
//         if (sN2 <= 6) {
//             sections[1].style.backgroundImage = `url(./img/for2/${sN2}.webp)`;
//             sN2++;
//             setTimeout(() => {
//                 slideIn2();
//             }, 8000);
//         }
//         else {
//             sN2 = 0;
//             slideIn2();
//         }
//     }
// }
// function slideIn3() {
//     if (localStorage.getItem('slidesOn') == 'true') {
//         if (sN2 <= 3) {
//             sections[2].style.backgroundImage = `url(./img/for3/${sN3}.webp)`;
//             sN3++;
//             setTimeout(() => {
//                 slideIn3();
//             }, 8000);
//         }
//         else {
//             sN3 = 0;
//             slideIn3();
//         }
//     }
// }

// document.querySelector('#slides-button').addEventListener('click', () => {
//     if (localStorage.getItem('slidesOn') == 'true') {
//         localStorage.setItem('slidesOn', 'false');
//         document.querySelector('#slides-button').classList.remove('active');
//     }
//     else if (localStorage.getItem('slidesOn') == 'false') {
//         localStorage.setItem('slidesOn', 'true');
//         document.querySelector('#slides-button').classList.add('active');
//         slideIn1();
//         slideIn2();
//     }
// })

// if (localStorage.getItem('slidesOn') == 'true') {
//     document.querySelector('#slides-button').classList.add('active');
//     initSlides();
// }

// function initSlides() {
//     setTimeout(() => {
//         slideIn1();
//     }, 8000);
//     setTimeout(() => {
//         slideIn2();
//     }, 9000);
//     setTimeout(() => {
//         slideIn3();
//     }, 10000);
// }