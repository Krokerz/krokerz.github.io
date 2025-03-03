import React from 'react'
import { createRoot } from 'react-dom/client';

import './to-do-list.css'

export default function ToDoList() {
    const [items, setItems] = useState(document.getElementById('not-done').innerHTML = localStorage.getItem('not-done-data'));
    
    return (
        <>
            <div className='list-container'>
                <h1>To-Do List</h1>

                <hr />

                <div className='input-area'>
                    <textarea name='text-input' id='text-input' placeholder='Type a task'></textarea>
                    <button onClick={addToList} type='button'>Insert</button>
                </div>

                <div className='list' id='todolist'>
                    <div className='incomplete-container'>
                        <h2>Incomplete Tasks</h2>
                        <ul id='not-done'></ul>
                    </div>

                    <div className='completed-container'>
                        <h2>Completed Tasks</h2>
                        <ul id='done'></ul>
                    </div>
                </div>
            </div>
        </>
    );
}

// TODO: make below work

function addToList() {
    const textInput = document.getElementById('text-input').value.trim();
    
    if (textInput == '') {
        return;
    }

    const newInsert = (
        <li className='noCheck-JS'>
            {/* mover */}
            <div className='task-mover'>
                <img src='/img/up.svg' onClick={() => {listOrderIncrease(this.parentElement.parentElement)}}></img>
                <img src='/img/down.svg' onClick={() => {listOrderDecrease(this.parentElement.parentElement)}}></img>
            </div>

            {/* check */}
            <button onClick={() => {changeCheckJS(this.parentElement)}}>
                <img src='/img/check.svg'></img>
            </button>

            {/* text */}
            <textarea onInput={() => {textAreaHeightChanger(this)}}>
                {textInput}
            </textarea>

            {/* del */}
            <button onClick={() => {delFromList(this.parentElement)}}>
                <img src='/img/x.svg'></img>
            </button>

            {/* edit */}
            <img src='/img/edit.svg' onClick={() => {toggleEdit(this.previousElementSibling)}}></img>
        </li>
    );

    createRoot(document.getElementById('not-done')).render(newInsert);

    // to make textarea's height in accordance with the content. Placed here cuz its after li gets rendered
    // let textareaTemp = document.getElementById('not-done').lastElementChild.getElementsByTagName('textarea')[0];
    
    // textAreaHeightChanger(textareaTemp);
    
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

function textAreaHeightChanger(elem) {
    elem.style.height = `${Math.max(1, elem.scrollHeight)}px`;
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