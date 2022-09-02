document.addEventListener('submit', (e)=> {
    e.preventDefault();
});

document.querySelector('#search-input').parentElement.classList.remove('not-allowed');

const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');
let searchFocus = false;
let notBlur = false;

let documentFragment;

function createAElement(result) {
    let a = createElement('a');
    a.classList.add('type-1');
    a.href = result.page_url;
    a.textContent = result.title;
    let h3 = createElement('h3');
    h3.textContent = result.desc;
    a.appendChild(h3);
    documentFragment.appendChild(a);
}

function showRelevantsResults() {
    let allA = searchResults.querySelectorAll('a');
    allA.forEach(element => {
        element.remove();
    });
    documentFragment = document.createDocumentFragment();
    indexData.forEach(result => {
        if (result.search.relevant) {
            createAElement(result);
        }
        searchResults.appendChild(documentFragment);
        searchResults.querySelector('a').classList.add('act');
    });
}

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
        documentFragment = document.createDocumentFragment();
        indexData.forEach(result => {
            if (result.search.index) {
                if (result.title.toLocaleLowerCase().includes(string) || result.desc.toLocaleLowerCase().includes(string)) {
                    createAElement(result);
                }
                else {
                    searchResults.querySelector('.over-text').textContent = 'Not results';
                }
            }
        });
        allA.forEach(element => {
            element.remove();
        });
        searchResults.appendChild(documentFragment);
        searchResults.querySelector('a').classList.add('act');
    }
    else {
        searchResults.querySelector('.over-text').textContent = 'Results';
        showRelevantsResults();
    }
});

// search form controls
searchInput.addEventListener('keydown', (e)=> {
    let allA = searchResults.querySelectorAll('a');
    let a = searchResults.querySelector('a.act');
    // on press arrow up, switch selected to the upper "a" element
    if (e.key == 'ArrowUp') {
        if (a.previousElementSibling.nodeName == 'A') {
            a.classList.remove('act');
            a.previousElementSibling.classList.add('act');
        }
        else {
            a.classList.remove('act');
            allA[allA.length-1].classList.add('act');
        }
    }
    // on press arrow down, switch selected to the lower "a" element
    if (e.key == 'ArrowDown') {
        if (a.nextElementSibling && a.nextElementSibling.nodeName == 'A') {
            a.classList.remove('act');
            a.nextElementSibling.classList.add('act');
        }
        else {
            a.classList.remove('act');
            allA[0].classList.add('act');
        }
    }
    // on press enter, give click on the "a" element selected
    if (e.key == 'Enter') {
        a.click();
    }
});