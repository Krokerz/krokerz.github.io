import React from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import Header from '/pages/header.jsx'
// import Home from '/pages/home/home.jsx'
// import Rambles from '/pages/rambles/rambles.jsx'
// import Projects from '/pages/projects/projects.jsx'
import ToDoList from '/pages/projects/to-do-list/to-do-list.jsx'
// import ArticleBuilder from '/pages/projects/article-builder/article-builder.jsx'

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Header />

        <main>
            <ToDoList />
        </main>
    </React.StrictMode>
);