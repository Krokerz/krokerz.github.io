function addToList() {
    const textInput = document.getElementById("text-input").value;
    
    if (textInput == "") {
        return;
    }
    
    let newInsert = document.createElement("li");
    let check = document.createElement("input");
    let del = document.createElement("button");
    
    check.setAttribute("type", "checkbox");
    del.setAttribute("onclick", "delFromList(this)");
    
    newInsert.appendChild(check);
    newInsert.innerHTML += textInput;
    newInsert.appendChild(del);
    
    document.getElementById("todolist").appendChild(newInsert);
    
    saveList();
    
    document.getElementById("text-input").value = "";
}

function delFromList(elem) {
    elem.parentElement.remove();
    saveList();
}

function saveList() {
    localStorage.setItem("todolist-data", document.getElementById("todolist").innerHTML);
}

function showList() {
    document.getElementById("todolist").innerHTML = localStorage.getItem("todolist-data");
}

window.onload = showList;