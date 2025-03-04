import React from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import Header from '/pages/header.tsx'
// import Home from '/pages/home/home.tsx'
// import Rambles from '/pages/rambles/rambles.tsx'
// import Projects from '/pages/projects/projects.tsx'
import ToDoList from '/pages/projects/to-do-list/to-do-list.tsx'
// import ArticleBuilder from '/pages/projects/article-builder/article-builder.tsx'

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Header />

        <main>
            <ToDoList />
        </main>
    </React.StrictMode>
);