import React from 'react'

import './home.css'

export default function Home() {
    return (
        <>
            <p>A personal website where I post project stuff and ramble about stuff</p>

            <section className='featured projects'>
                <h1>
                    Projects
                </h1>
                <div className='projects entries'>
                    <a href='/projects/to-do-list'>
                        <section>
                            To-do List
                        </section>
                    </a>
                    <a href='/projects/article-builder'>
                        <section>
                            Article Builder
                        </section>
                    </a>
                    <a href='/'>
                        <section>

                        </section>
                    </a>
                </div>
            </section>

            <section className='featured rambles'>
                <h1>
                    Rambles
                </h1>
                <div className='rambles entries'>
                    <a href='/'>
                        <section>

                        </section>
                    </a>
                    <a href='/'>
                        <section>

                        </section>
                    </a>
                    <a href='/'>
                        <section>

                        </section>
                    </a>
                </div>
            </section>
        </>
    );
}