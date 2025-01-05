function addToList() {
    const textInput = document.getElementById("text-input").value;
    
    if (textInput == "") {
        return;
    }
    
    let check = document.createElement("button");
    check.setAttribute("onclick", "changeCheckJS(this.parentElement)");
    
    let checkImg = document.createElement("img");
    checkImg.setAttribute("src", "/img/check.svg");
    
    check.appendChild(checkImg);
    
    let del = document.createElement("button");
    del.setAttribute("onclick", "delFromList(this.parentElement)");
    
    let delImg = document.createElement("img");
    delImg.setAttribute("src", "/img/x.svg");
    
    del.appendChild(delImg);
    
    let newInsert = document.createElement("li");
    newInsert.setAttribute("class", "noCheck-JS");

    newInsert.appendChild(check);
    newInsert.innerHTML += textInput;
    newInsert.appendChild(del);
    
    document.getElementById("todolist").appendChild(newInsert);
    
    saveList();
    
    document.getElementById("text-input").value = "";
}

function delFromList(elem) {
    elem.remove();
    saveList();
}

function saveList() {
    localStorage.setItem("todolist-data", document.getElementById("todolist").innerHTML);
}

function showList() {
    document.getElementById("todolist").innerHTML = localStorage.getItem("todolist-data");
}

function changeCheckJS(elem) {
    elem.className = (elem.className === "noCheck-JS") ? "yesCheck-JS" : "noCheck-JS";
}

// window.onload = showList;