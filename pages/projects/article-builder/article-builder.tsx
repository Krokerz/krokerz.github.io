import React from 'react'

import './article-builder.css'

export default function ArticleBuilder() {
    return (
        <>
            <div className="article-builder" id="article-builder">
                <div className="main-article-info" id="main-article-info">
                    <div className="article-title-container">
                        <h1 id="article-title" data-placeholder="Insert Title Here" contentEditable="true"></h1>
                        <div className="modify-text" id="modify-text-title">
                            <button className="article-italic-toggle" data-checked="false">
                                <img src="/img/italic.svg" alt="Italic" />
                            </button>
                            <button className="article-strikethrough-toggle" data-checked="false">
                                <img src="/img/strikethrough.svg" alt="Strikethrough" />
                            </button>
                            <button className="article-underline-toggle" data-checked="false">
                                <img src="/img/underline.svg" alt="Underline" />
                            </button>
                        </div>
                    </div>
                    <div className="article-desc-container">
                        <h2 id="article-desc" data-placeholder="Insert Description Here" contentEditable="true"></h2>
                        <div className="modify-text" id="modify-text-desc">
                            <button className="article-bold-toggle" data-checked="false">
                                <img src="/img/bold.svg" alt="Bold" />
                            </button>
                            <button className="article-strikethrough-toggle" data-checked="false">
                                <img src="/img/strikethrough.svg" alt="Strikethrough" />
                            </button>
                            <button className="article-underline-toggle" data-checked="false">
                                <img src="/img/underline.svg" alt="Underline" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="side-article-info">
                    <time id="time">dd/Month/yyyy</time>
                    <div className="article-tags">
                        <div className="tags" id="tags">
                            <div data-placeholder="?" contentEditable="true"></div>
                        </div>
                        <div className="tag-buttons" id="tag-buttons">
                            <button>Add Tag</button>
                            <button>Delete Tag</button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="article-paragraphs-container">
                    <p id="article-paragraphs" data-placeholder="Insert Paragraph(s) Here" contentEditable="true"></p>
                    <div className="modify-text" id="modify-text-para">
                        <button className="article-bold-toggle" data-checked="false">
                            <img src="/img/bold.svg" alt="Bold" />
                        </button>
                        <button className="article-italic-toggle" data-checked="false">
                            <img src="/img/italic.svg" alt="Italic" />
                        </button>
                        <button className="article-strikethrough-toggle" data-checked="false">
                            <img src="/img/strikethrough.svg" alt="Strikethrough" />
                        </button>
                        <button className="article-underline-toggle" data-checked="false">
                            <img src="/img/underline.svg" alt="Underline" />
                        </button>
                        <div className="article-font-size-container">
                            <div className="article-font-size-display" id="article-font-size-display" contentEditable="true"></div>
                            <div className="article-font-size-buttons" id="article-font-size-buttons">
                                <button>
                                    <img src="/img/up.svg" alt="Increment" />
                                </button>
                                <button>
                                    <img src="/img/down.svg" alt="Decrement" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="save-article" id="save-article">Save</button>
        </>
    );
}