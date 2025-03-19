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

    let notDone: React.JSX.Element[] = [];
    let done: React.JSX.Element[] = [];

    for (let i of todo) {
        (i[2]) ?
            done.push(<ListElem listElem={i} todo={todo} setToDo={setToDo} key={i[0]} />)
            :
            notDone.push(<ListElem listElem={i} todo={todo} setToDo={setToDo} key={i[0]} />);
    }

    const handleAddClick = () => {
        const textInputElem: HTMLTextAreaElement = textInputRef.current!;
        const textInput: string = textInputElem.value.trim();
        
        textInputElem.value = '';

        if (textInput == '') return;

        setToDo(todo.concat([[Date.now(), textInput, false]]));
    };

    return (
        <>
            <div className='input-area'>
                <textarea name='text-input' placeholder='Type a task' ref={textInputRef}></textarea>
                <button onClick={handleAddClick} type='button'>Insert</button>
            </div>

            <div className='list'>
                <div className='incomplete-container'>
                    <h2>Incomplete Tasks</h2>
                    <ul>
                        {notDone}
                    </ul>
                </div>

                <div className='completed-container'>
                    <h2>Completed Tasks</h2>
                    <ul>
                        {done}
                    </ul>
                </div>
            </div>
        </>
    );
}

function ListElem({ listElem, todo, setToDo }: {
    listElem: ToDoData,
    todo: ToDoData[],
    setToDo: StateSetter<ToDoData[]>
}) {
    const [id, textInput, isDone] = listElem;
    const currIndex = todo.indexOf(listElem);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const editableRef = useRef<HTMLTextAreaElement>(null);
    const editImgName = isEdit ? 'check' : 'edit';

    const heightSyncer = () => {
        editableRef.current!.style.height = '1px';
        editableRef.current!.style.height = `${editableRef.current!.scrollHeight}px`;
    };

    const handleEditClick = () => {
        setIsEdit(!isEdit);
        
        isEdit && setToDo(todo.toSpliced(currIndex, 1, [id, editableRef.current!.value, isDone]));
    };
    
    const handleTaskMoverClick = (isUp: boolean) => {
        let otherIndex: number = (isUp) ? currIndex - 1 : currIndex + 1;
        let currIndexData: ToDoData = todo[currIndex];
        
        return todo.toSpliced(currIndex, 1, todo[otherIndex]).toSpliced(otherIndex, 1, currIndexData);
    };

    useEffect(() => {
        isEdit && heightSyncer();
    }, [isEdit]);

    return (
        <li className={isDone ? 'yesCheck-JS' : 'noCheck-JS'} key={id}>
            {/* mover */}
            <div className='task-mover'>
                <img
                    src='/img/up.svg'
                    onClick={() => (currIndex !== 0) && setToDo(() => handleTaskMoverClick(true))}
                    alt='up'
                ></img>
                <img
                    src='/img/down.svg'
                    onClick={() => (currIndex !== todo.length - 1) && setToDo(() => handleTaskMoverClick(false))}
                    alt='down'
                ></img>
            </div>

            {/* check */}
            <button onClick={() => setToDo(todo.toSpliced(currIndex, 1, [id, textInput, !isDone]))} type='button'>
                <img src='/img/check.svg' alt='check'></img>
            </button>

            {/* text */}
            {(isEdit) ?
                <textarea
                    className='task-edit-on'
                    onChange={heightSyncer}
                    ref={editableRef}
                    defaultValue={textInput}
                ></textarea>
                :
                <p>{textInput}</p>}

            {/* edit */}
            <img src={`/img/${editImgName}.svg`} onClick={handleEditClick} alt={editImgName}></img>

            {/* del */}
            <button onClick={() => setToDo(todo.toSpliced(currIndex, 1))} type='button'>
                <img src='/img/x.svg' alt='delete'></img>
            </button>
        </li>
    );
}