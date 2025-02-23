function addToList() {
    const textInput = document.getElementById('text-input').value.trim();
    
    if (textInput == '') {
        return;
    }

    // mover
    let mover = document.createElement('div');
    mover.setAttribute('class', 'task-mover');

    let moverImg1 = document.createElement('img');
    moverImg1.setAttribute('src', '/img/up.svg');
    moverImg1.setAttribute('onclick', 'listOrderIncrease(this.parentElement.parentElement)');

    let moverImg2 = document.createElement('img');
    moverImg2.setAttribute('src', '/img/down.svg');
    moverImg2.setAttribute('onclick', 'listOrderDecrease(this.parentElement.parentElement)');

    mover.appendChild(moverImg1);
    mover.appendChild(moverImg2);

    // check
    let check = document.createElement('button');
    check.setAttribute('onclick', 'changeCheckJS(this.parentElement)');
    
    let checkImg = document.createElement('img');
    checkImg.setAttribute('src', '/img/check.svg');
    
    check.appendChild(checkImg);

    // text
    let text = document.createElement('textarea');
    text.setAttribute('oninput', 'this.style.height = "1px"; this.style.height = (this.scrollHeight) + "px";');

    text.textContent += textInput;

    // del
    let del = document.createElement('button');
    del.setAttribute('onclick', 'delFromList(this.parentElement)');
    
    let delImg = document.createElement('img');
    delImg.setAttribute('src', '/img/x.svg');
    
    del.appendChild(delImg);

    // edit
    let edit = document.createElement('img');
    edit.setAttribute('src', '/img/edit.svg');
    edit.setAttribute('onclick', 'toggleEdit(this.previousElementSibling)');

    // newInsert
    let newInsert = document.createElement('li');
    newInsert.setAttribute('class', 'noCheck-JS');

    newInsert.appendChild(mover);
    newInsert.appendChild(check);
    newInsert.appendChild(text);
    newInsert.appendChild(edit);
    newInsert.appendChild(del);
    
    document.getElementById('not-done').appendChild(newInsert);

    // to make textarea's height in accordance with the content. Placed here cuz its after li gets rendered
    let textareaTemp = document.getElementById('not-done').lastElementChild.getElementsByTagName('textarea')[0];
    
    textareaTemp.style.height = '1px';
    textareaTemp.style.height = (textareaTemp.scrollHeight) + 'px';
    
    saveList('not-done');
    
    document.getElementById('text-input').value = '';
}

function delFromList(elem) {
    let className = elem.className;

    elem.remove();

    saveListByClass(className);
}

function changeCheckJS(elem) {
    if (elem.className === 'noCheck-JS') {
        elem.className = 'yesCheck-JS';
        document.getElementById('done').appendChild(elem);
    }
    else {
        elem.className = 'noCheck-JS';
        document.getElementById('not-done').appendChild(elem);
    }

    saveList();
}

function listOrderIncrease(elem) {
    let temp = elem.querySelector('textarea').outerHTML;

    elem.querySelector('textarea').outerHTML = elem.previousElementSibling.querySelector('textarea').outerHTML;
    elem.previousElementSibling.querySelector('textarea').outerHTML = temp;

    saveListByClass(elem.className);
}

function listOrderDecrease(elem) {
    let temp = elem.querySelector('textarea').outerHTML;

    elem.querySelector('textarea').outerHTML = elem.nextElementSibling.querySelector('textarea').outerHTML;
    elem.nextElementSibling.querySelector('textarea').outerHTML = temp;

    saveListByClass(elem.className);
}

function toggleEdit(elem) {
    if (window.getComputedStyle(elem).getPropertyValue('pointer-events') === 'none') {
        elem.setAttribute('class', 'task-edit-on');

        elem.nextElementSibling.setAttribute('src', '/img/check.svg');
    }
    else {
        elem.textContent = elem.value;

        elem.removeAttribute('class');

        elem.nextElementSibling.setAttribute('src', '/img/edit.svg');

        saveListByClass(elem.parentElement.className);
    }
}

function saveList() {
    localStorage.setItem('not-done-data', document.getElementById('not-done').innerHTML);
    localStorage.setItem('done-data', document.getElementById('done').innerHTML);
}

function saveListByClass(className) {
    if (className === 'noCheck-JS') {
        localStorage.setItem('not-done-data', document.getElementById('not-done').innerHTML);
    }
    else {
        localStorage.setItem('done-data', document.getElementById('done').innerHTML);
    }
}

function showList() {
    document.getElementById('not-done').innerHTML = localStorage.getItem('not-done-data');
    document.getElementById('done').innerHTML = localStorage.getItem('done-data');
}

window.onload = showList;