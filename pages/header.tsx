import React from 'react'

export default function Header() {
    return (
        <header>
            <div className='header-container'>
                <div className='home'>
                    <a href='/'>
                        <img src='/img/icon.jpeg' alt='Home' />
                    </a>
                </div>
                <nav className='main-nav'>
                    <ul>
                        <li>
                            <a href='/projects'>Projects</a>
                        </li>
                        <li>
                            <a href='/rambles'>Rambles</a>
                        </li>
                    </ul>
                </nav>
                <div className='theme-button-wrapper'>
                    <button className='theme-button' type='button' title='Change Theme'>
                        <img src='/img/moon.svg' alt='Night mode' />
                    </button>
                </div>
            </div>
        </header>
    );
}