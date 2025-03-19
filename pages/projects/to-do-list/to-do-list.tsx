import React, { useState, useEffect, useRef } from 'react'

import './to-do-list.css'

type ToDoData = [number, string, boolean];
type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
type Ref<T> = React.RefObject<T>;

export default function ToDoList() {
    return (
        <div className='list-container'>
            <h1>To-Do List</h1>

            <hr />

            <List />
        </div>
    );
}

function List() {
    const [todo, setToDo] = useState<ToDoData[]>(JSON.parse(localStorage.getItem('todo-data') ?? '[]'));
    const textInputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => localStorage.setItem('todo-data', JSON.stringify(todo)), [todo]);

    return (
        <>
            <div className='input-area'>
                <textarea name='text-input' placeholder='Type a task' ref={textInputRef}></textarea>
                <button onClick={() => addToList(textInputRef as Ref<HTMLTextAreaElement>, todo, setToDo)} type='button'>Insert</button>
            </div>

            <div className='list'>
                <div className='incomplete-container'>
                    <h2>Incomplete Tasks</h2>
                    <ul>
                        <GetData
                            isDone={false}
                            todo={todo}
                            setToDo={setToDo}
                        />
                    </ul>
                </div>

                <div className='completed-container'>
                    <h2>Completed Tasks</h2>
                    <ul>
                        <GetData
                            isDone={true}
                            todo={todo}
                            setToDo={setToDo}
                        />
                    </ul>
                </div>
            </div>
        </>
    );
}

function addToList(
    textInputRef: Ref<HTMLTextAreaElement>,
    todo: ToDoData[],
    setToDo: StateSetter<ToDoData[]>
) {
    const textInputElem = textInputRef.current;
    const textInput = textInputElem.value.trim();
    
    textInputElem.value = '';

    if (textInput == '') return;

    setToDo(todo.concat([[Date.now(), textInput, false]]));
}

function GetData({ isDone, todo, setToDo }: {
    isDone: boolean,
    todo: ToDoData[],
    setToDo: StateSetter<ToDoData[]>
}) {
    let out: React.JSX.Element[] = [];

    for (let i of todo) {
        if (isDone === i[2]) out.push(<MakeListElem listElem={i} todo={todo} setToDo={setToDo} key={i[0]} />);
    }

    return <>{out}</>;
}

function MakeListElem({ listElem, todo, setToDo }: {
    listElem: ToDoData,
    todo: ToDoData[],
    setToDo: StateSetter<ToDoData[]>
}) {
    const [id, , isDone] = listElem;
    const currIndex = todo.indexOf(listElem);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [textInput, setTextInput] = useState<string>(listElem[1]);
    const editableRef = useRef<HTMLTextAreaElement>(null);

    return (
        <li className={isDone ? 'yesCheck-JS' : 'noCheck-JS'} key={id}>
            {/* mover */}
            <div className='task-mover'>
                <img
                    src='/img/up.svg'
                    onClick={() => (currIndex !== 0) && setToDo(taskMover(true, currIndex, todo))}
                    alt='up'
                ></img>
                <img
                    src='/img/down.svg'
                    onClick={() => (currIndex !== todo.length - 1) && setToDo(taskMover(false, currIndex, todo))}
                    alt='down'
                ></img>
            </div>

            {/* check */}
            <button onClick={() => setToDo(todo.toSpliced(currIndex, 1, [id, textInput, !isDone]))} type='button'>
                <img src='/img/check.svg' alt='check'></img>
            </button>

            {/* text */}
            <EditableText
                textInput={textInput}
                setTextInput={setTextInput}
                isEdit={isEdit}
                editableRef={editableRef}
            />

            {/* edit */}
            <EditButton
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                todo={todo}
                setToDo={setToDo}
                currIndex={currIndex}
                id={id}
                isDone={isDone}
                currEditable={editableRef.current}
            />

            {/* del */}
            <button onClick={() => setToDo(todo.toSpliced(currIndex, 1))} type='button'>
                <img src='/img/x.svg' alt='delete'></img>
            </button>
        </li>
    );
}

function taskMover(
    isUp: boolean,
    currIndex: number,
    todo: ToDoData[]
): ToDoData[] {
    let otherIndex: number = (isUp) ? currIndex - 1 : currIndex + 1;
    let currIndexData: ToDoData = todo[currIndex];
    
    return todo.toSpliced(currIndex, 1, todo[otherIndex]).toSpliced(otherIndex, 1, currIndexData);
}

function EditableText({ textInput, setTextInput, isEdit, editableRef }: { 
    textInput: string, 
    setTextInput: StateSetter<string>, 
    isEdit: boolean, 
    editableRef: Ref<HTMLTextAreaElement | null>
}) {
    useEffect(() => {
        isEdit && heightChanger(editableRef.current!);
    });

    return (isEdit) ?
        <textarea
            className='task-edit-on'
            onChange={() => setTextInput(editableRef.current!.value)}
            ref={editableRef}
            defaultValue={textInput}
        ></textarea>
        :
        <p>{textInput}</p>;
}

function heightChanger(currEditable: HTMLTextAreaElement) {
    currEditable.style.height = '1px';
    currEditable.style.height = `${currEditable.scrollHeight}px`;
}
    
function EditButton({ isEdit, setIsEdit, todo, setToDo, currIndex, id, isDone, currEditable }: {
    isEdit: boolean,
    setIsEdit: StateSetter<boolean>,
    todo: ToDoData[],
    setToDo: StateSetter<ToDoData[]>,
    currIndex: number,
    id: number,
    isDone: boolean,
    currEditable: HTMLTextAreaElement | null
}) {
    let src: string = isEdit ? 'check' : 'edit';

    let handleClick = () => {
        setIsEdit(!isEdit);

        isEdit && setToDo(todo.toSpliced(currIndex, 1, [id, currEditable!.value, isDone]));
    };

    return <img src={`/img/${src}.svg`} onClick={handleClick} alt={src}></img>;
}