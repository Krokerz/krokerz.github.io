const textModElems = document.querySelectorAll('.modify-text');

for (let i of textModElems) {
    const wantToMod = i.previousElementSibling;

    wantToMod.addEventListener('input', () => {
        if (wantToMod.textContent !== '') {
            return;
        }

        let elemToDel = [];

        for (let j of wantToMod.children) {
            if (j.className === 'modified-text') {
                return;
            }
            else {
                elemToDel.push(j);
            }
        }

        elemToDel.forEach(i => i.remove());
    });

    const container = i.parentElement;
    let isFlex = false;

    container.addEventListener('mousedown', () => {
        if (!isFlex) {
            const pos = wantToMod.getBoundingClientRect();

            i.style.right = (pos.left + window.scrollX) + 'px';
            i.style.top = (pos.bottom + window.scrollY) + 'px';
            i.style.display = 'flex';

            isFlex = true;

            window.addEventListener('click', function clickElsewhereCheck(e) {
                if ((e.target !== container) && (!container.contains(e.target))) {
                    i.style.display = 'none';

                    isFlex = false;

                    this.removeEventListener('click', clickElsewhereCheck);
                }
            });
        }
    });

    wantToMod.addEventListener('focus', () => {
        const moddedElems = wantToMod.getElementsByClassName('modified-text');
        const moddedElemsLen = moddedElems.length;

        if (moddedElemsLen > 0) moddedElems[moddedElemsLen - 1].focus();
    });

    const textModPositioner = new ResizeObserver(() => {
        const pos = wantToMod.getBoundingClientRect();

        i.style.right = (pos.left + window.scrollX) + 'px';
        i.style.top = (pos.bottom + window.scrollY) + 'px';
    });

    textModPositioner.observe(wantToMod);

    let wantStrike, wantItalic, wantBold, wantUnder;
    wantStrike = wantItalic = wantBold = wantUnder = wantFont = false;

    switch (wantToMod.id) {
        case 'article-title':
            wantBold = true;
        break;

        case 'article-desc':
            wantItalic = true;
        break;

        case 'article-paragraphs':
            wantFont = true;
        break;
    }

    const modifyText = (fontSize = null, isFontDisplay = false) => {
        const moddedElems = wantToMod.getElementsByClassName('modified-text');
        const moddedElemsLen = moddedElems.length;
        
        if (moddedElemsLen > 0) {
            const lastModdedElem = moddedElems[moddedElems.length - 1];

            if (lastModdedElem.textContent === '\u200B') lastModdedElem.remove();
        }    

        const caretPos = window.getSelection();
        const range = (isFontDisplay) ? document.createRange() : caretPos.getRangeAt(0);
        let span = document.createElement('span');
        
        span.className = 'modified-text';
        span.textContent = '\u200B'; // zero width space
        span.style.display = 'inline-block';

        let textDec = '';

        if (wantStrike) textDec += 'line-through ';
        if (wantUnder) textDec += 'underline';

        span.style.textDecoration = (textDec !== '') ? textDec : 'none'; 
        span.style.fontStyle = (wantItalic) ? 'italic' : 'normal';
        span.style.fontWeight = (wantBold) ? 'bold' : (wantToMod.id === 'article-desc') ? '200' : 'normal';

        if (wantFont) span.style.fontSize = fontSize;

        (isFontDisplay) ? range.selectNodeContents(wantToMod.appendChild(span)) : range.insertNode(span);

        range.collapse(false);

        caretPos.removeAllRanges();
        caretPos.addRange(range);
    };

    for (let j of i.children) {
        switch (j.className) {
            case 'article-strikethrough-toggle':
                j.addEventListener('click', () => {
                    wantStrike = !wantStrike;

                    j.setAttribute('data-checked', wantStrike);

                    modifyText();
                });
            break;

            case 'article-underline-toggle':
                j.addEventListener('click', () => {
                    wantUnder = !wantUnder;

                    j.setAttribute('data-checked', wantUnder);

                    modifyText();
                });
            break;

            case 'article-italic-toggle':
                j.addEventListener('click', () => {
                    wantItalic = !wantItalic;

                    j.setAttribute('data-checked', wantItalic);

                    modifyText();
                });
            break;

            case 'article-bold-toggle':
                j.addEventListener('click', () => {
                    wantBold = !wantBold;

                    j.setAttribute('data-checked', wantBold);

                    modifyText();
                });
            break;

            case 'article-font-size-container':
                const fontSizeDisplay = j.children[0];
                const fontSizeParent = j.parentElement;

                fontSizeDisplay.textContent = window.getComputedStyle(fontSizeParent).fontSize.replace('px', '');

                fontSizeDisplay.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                    
                        fontSizeDisplay.blur();
                    }
                });
                
                fontSizeDisplay.addEventListener('blur', () => {
                    if (fontSizeDisplay.textContent === '') {
                        fontSizeDisplay.textContent = window.getComputedStyle(fontSizeParent).fontSize.replace('px', '');
                    }
                    else {
                        fontSizeDisplay.textContent = fontSizeDisplay.textContent.replaceAll(/[a-zA-Z\s]/g, '');
                    }
                    
                    modifyText(fontSizeDisplay.textContent + 'px', true);
                });

                const fontSizeButtons = j.children[1];
                const fontSizeButtonElems = fontSizeButtons.children;

                fontSizeButtonElems[0].addEventListener('click', () => {
                    fontSizeDisplay.textContent = +fontSizeDisplay.textContent + 1;

                    modifyText(fontSizeDisplay.textContent + 'px');
                });

                fontSizeButtonElems[1].addEventListener('click', () => {
                    fontSizeDisplay.textContent = +fontSizeDisplay.textContent - 1;

                    modifyText(fontSizeDisplay.textContent + 'px');
                });
            break;
        }
    }

    if (wantToMod.id === 'article-paragraphs') {
        wantToMod.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                
                const tab = document.createTextNode('\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0');
                const moddedElems = wantToMod.getElementsByClassName('modified-text');
                const moddedElemsLen = moddedElems.length;
                const range = document.createRange();
                
                if (moddedElemsLen > 0) {
                    range.selectNodeContents(moddedElems[moddedElemsLen - 1].appendChild(tab));
                }
                else {
                    range.selectNodeContents(wantToMod.appendChild(tab));
                }

                range.collapse(false);

                const caretPos = window.getSelection();
                
                caretPos.removeAllRanges();
                caretPos.addRange(range);
            }
        });

        // this creates a visual bug but at this point idfc
        wantToMod.addEventListener('mousedown', (e) => {
            const wantStyle = e.target.style;
            const textModContainer = wantToMod.nextElementSibling;
            const textMod = textModContainer.children;

            wantBold = wantStyle.fontWeight.includes('bold');
            textMod[0].setAttribute('data-checked', wantBold);

            wantItalic = wantStyle.fontStyle.includes('italic');
            textMod[1].setAttribute('data-checked', wantItalic);

            wantStrike = wantStyle.textDecoration.includes('line-through');
            textMod[2].setAttribute('data-checked', wantStrike);

            wantUnder = wantStyle.textDecoration.includes('underline');
            textMod[3].setAttribute('data-checked', wantUnder);

            if (wantStyle.fontSize !== '') {
                textMod[4].children[0].textContent = wantStyle.fontSize.replace('px', '');
            }
            else {
                textMod[4].children[0].textContent = window.getComputedStyle(textModContainer).fontSize.replace('px', '');
            }
        });
    }
}

const tagButtons = document.getElementById('tag-buttons');
const tagButtonElems = tagButtons.children;
const tagElems = document.getElementById('tags');

tagButtonElems[0].addEventListener('click', () => {
    let tag = document.createElement('div');

    tag.setAttribute('placeholder', '?');
    tag.setAttribute('contenteditable', 'true');

    tagElems.appendChild(tag);
});

tagButtonElems[1].addEventListener('click', () => {
    let tag = tagElems.lastElementChild;
    tag.remove();
});

tagElems.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
    else if (e.target.firstElementChild) {
        e.target.firstElementChild.remove();
    }
});

document.getElementById('save-article').addEventListener('click', () => {
    if (document.getElementById('article-title').textContent === '') {
        alert('Title is empty');
        return;
    }
    else if (document.getElementById('article-desc').textContent === '') {
        alert('Description is empty');
        return;
    }
    else if (document.getElementById('article-paragraphs').textContent === '') {
        alert('Paragraph is empty');
        return;
    }

    let date = new Date();
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    document.getElementById('time').textContent = `${String(date.getDate()).padStart(2, 0)}/${months[date.getMonth()]}/${date.getFullYear()}`;

    for (let i of tagElems.children) {
        if (i.textContent === '') {
            i.remove();
        }
        else {
            i.removeAttribute('contenteditable');
        }
    }

    tagButtons.remove();

    textModElems.forEach(i => {i.previousElementSibling.removeAttribute('contenteditable'); i.remove()});

    let article = document.getElementById('article-builder').innerHTML.trim();

    let download = document.createElement('a');

    download.href = 'data:text/html,' + encodeURI(article);
    download.target = '_blank';
    download.download = 'articbuildindex.html';

    download.click();
});