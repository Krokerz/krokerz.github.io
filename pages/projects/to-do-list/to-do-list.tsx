import { useState } from 'react'
import React from 'react'

import './to-do-list.css'

export default function ToDoList() {
    const [todo, setToDo] = useState(JSON.parse(localStorage.getItem('todo-data') ?? '{}'));
    // [[text, isDone]]
    
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
                        <ul id='not-done'>
                            <GetData data={todo} isDone={false}/>
                        </ul>
                    </div>

                    <div className='completed-container'>
                        <h2>Completed Tasks</h2>
                        <ul id='done'>
                            <GetData data={todo} isDone={true}/>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

// TODO: make below work

function GetData({ data, isDone }: { data: any, isDone: boolean }) {
    let out: React.JSX.Element[] = [];

    for (let i of data) {
        if (isDone === i[1]) out.push(makeListElem(i[0], i[1]));
    }

    return <>{out}</>;
}

function makeListElem(textInput: string, isDone: boolean) {
    return (
        <li className={isDone ? 'yesCheck-JS' : 'noCheck-JS'}>
            {/* mover */}
            <div className='task-mover'>
                <img src='/img/up.svg' onClick={() => {listOrderIncrease(this.parentElement.parentElement)}} alt='up'></img>
                <img src='/img/down.svg' onClick={() => {listOrderDecrease(this.parentElement.parentElement)}} alt='down'></img>
            </div>

            {/* check */}
            <button onClick={() => {changeCheckJS(this.parentElement)}} type='button'>
                <img src='/img/check.svg' alt='check'></img>
            </button>

            {/* text */}
            <textarea onInput={() => {textAreaHeightChanger(this)}}>
                {textInput}
            </textarea>

            {/* del */}
            <button onClick={() => {delFromList(this.parentElement)}} type='button'>
                <img src='/img/x.svg' alt='delete'></img>
            </button>

            {/* edit */}
            <img src='/img/edit.svg' onClick={() => {toggleEdit(this.previousElementSibling)}} alt='edit'></img>
        </li>
    );
}

function addToList() {
    const textInput: string = (document.getElementById('text-input') as HTMLInputElement).value.trim();
    
    if (textInput == '') {
        return;
    }

    // to make textarea's height in accordance with the content. Placed here cuz its after li gets rendered
    // let textareaTemp = document.getElementById('not-done').lastElementChild.getElementsByTagName('textarea')[0];
    
    // textAreaHeightChanger(textareaTemp);
    
    // saveList();
    
    // document.getElementById('text-input').value = '';

    return makeListElem(textInput, false);
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
    // localStorage.setItem('not-done-data', document.getElementById('not-done').innerHTML);
    // localStorage.setItem('done-data', document.getElementById('done').innerHTML);

    localStorage.setItem('data', items);
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