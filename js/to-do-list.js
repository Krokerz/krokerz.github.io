function addToList() {
    const textInput = document.getElementById("text-input").innerHTML;
    
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
    
    document.getElementById("not-done").appendChild(newInsert);
    
    saveList();
    
    document.getElementById("text-input").innerHTML = "";
}

function delFromList(elem) {
    elem.remove();

    saveList();
}

function changeCheckJS(elem) {
    if (elem.className === "noCheck-JS") {
        elem.className = "yesCheck-JS";
        document.getElementById("done").appendChild(elem);
    }
    else {
        elem.className = "noCheck-JS";
        document.getElementById("not-done").appendChild(elem);
    }

    saveList();
}

function saveList() {
    localStorage.setItem("todolist-data", document.getElementById("todolist").innerHTML);
}

function showList() {
    document.getElementById("todolist").innerHTML = localStorage.getItem("todolist-data");
}

window.onload = showList;