import React from 'react'

import './article-builder.css'

export default function ArticleBuilder() {
    return (
        <>
            <div class="article-builder" id="article-builder">
                <div class="main-article-info" id="main-article-info">
                    <div class="article-title-container">
                        <h1 id="article-title" placeholder="Insert Title Here" contenteditable="true"></h1>
                        <div class="modify-text" id="modify-text-title">
                            <button class="article-italic-toggle" data-checked="false">
                                <img src="/img/italic.svg" alt="Italic" />
                            </button>
                            <button class="article-strikethrough-toggle" data-checked="false">
                                <img src="/img/strikethrough.svg" alt="Strikethrough" />
                            </button>
                            <button class="article-underline-toggle" data-checked="false">
                                <img src="/img/underline.svg" alt="Underline" />
                            </button>
                        </div>
                    </div>
                    <div class="article-desc-container">
                        <h2 id="article-desc" placeholder="Insert Description Here" contenteditable="true"></h2>
                        <div class="modify-text" id="modify-text-desc">
                            <button class="article-bold-toggle" data-checked="false">
                                <img src="/img/bold.svg" alt="Bold" />
                            </button>
                            <button class="article-strikethrough-toggle" data-checked="false">
                                <img src="/img/strikethrough.svg" alt="Strikethrough" />
                            </button>
                            <button class="article-underline-toggle" data-checked="false">
                                <img src="/img/underline.svg" alt="Underline" />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="side-article-info">
                    <time id="time">dd/Month/yyyy</time>
                    <div class="article-tags">
                        <div class="tags" id="tags">
                            <div placeholder="?" contenteditable="true"></div>
                        </div>
                        <div class="tag-buttons" id="tag-buttons">
                            <button>Add Tag</button>
                            <button>Delete Tag</button>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="article-paragraphs-container">
                    <p id="article-paragraphs" placeholder="Insert Paragraph(s) Here" contenteditable="true"></p>
                    <div class="modify-text" id="modify-text-para">
                        <button class="article-bold-toggle" data-checked="false">
                            <img src="/img/bold.svg" alt="Bold" />
                        </button>
                        <button class="article-italic-toggle" data-checked="false">
                            <img src="/img/italic.svg" alt="Italic" />
                        </button>
                        <button class="article-strikethrough-toggle" data-checked="false">
                            <img src="/img/strikethrough.svg" alt="Strikethrough" />
                        </button>
                        <button class="article-underline-toggle" data-checked="false">
                            <img src="/img/underline.svg" alt="Underline" />
                        </button>
                        <div class="article-font-size-container">
                            <div class="article-font-size-display" id="article-font-size-display" contenteditable="true"></div>
                            <div class="article-font-size-buttons" id="article-font-size-buttons">
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
            <button class="save-article" id="save-article">Save</button>
        </>
    );
}