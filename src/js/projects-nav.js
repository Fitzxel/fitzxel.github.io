const nav = document.querySelector('.projects-nav');

let documentFragmentProjectsList = document.createDocumentFragment();

indexData.forEach(item => {
    if (item.type == 'project-doc-page' && item.hidden == false) {
        let project = item;
        // on nav ul
        // create li.list.sub element
        let li = createElement('li');
        li.classList.add('list', 'sub');
        // create a element
        let a = createElement('a');
        a.classList.add('type-l', 'tabindex');
        if (docData.name == project.name) {
            a.classList.add('act');
        }
        a.href = project.page_url;
        // append a on li.list.sub
        li.appendChild(a);
        // create span.title element
        let title = createElement('span');
        title.classList.add('title');
        title.textContent = project.title;
        // append title on a
        a.appendChild(title);
        // append li on documentFragment
        documentFragmentProjectsList.appendChild(li);
    }
});

// append documentFragment on ul#projects-list
nav.querySelector('#projects-list').appendChild(documentFragmentProjectsList);
// remove not-allowed class on nav
nav.querySelector('ul.not-allowed').classList.remove('not-allowed');
setTabIndex();