let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let getsEl = (e) => document.querySelector(e); //Query selector function

let ul = getsEl(".list-group");
console.log(ul);// clear for end

let form = document.forms["addTodoItem"]
console.log(form);// clear for end

let inputText = form.elements["todoText"]
console.log(inputText);// clear for end

function listTemplate(task) {
    // create list item
    let li = document.createElement("li");
    li.className = "list-group-item d-flex align-items-center";

    let span = document.createElement("span");
    span.textContent = task;

    // create tag and trash

    let iDelete = document.createElement("i");
    iDelete.className = "far fa-trash-alt delete-item ml-auto";

    iDelete.addEventListener("click", (target) => {
        deleteListItem(li)
    });


    let clearBtn = getsEl(".clear-btn");
    clearBtn.addEventListener("click", (target) => {
        deleteListItem(li)
    });


    // add all created tag to "li"
    li.appendChild(span);
    li.appendChild(iDelete);

    // rutern "li"
    return li;
}


function clearList() { // function for clear all tasks in list
    ul.innerHTML = "";
}

function generateList(taskArray) { // function for generate list
    for (let i = 0; i <= taskArray.length; i++) {
        let li = listTemplate(taskArray[i]);
        ul.appendChild(li);
    }
}


function addList(list) {
    tasks.unshift(list); //add item to array

    ul.insertAdjacentElement("afterbegin", listTemplate(list)); //create list

    localStorage.setItem("tasks", JSON.stringify(tasks)); //set data to localStorage

}

function deleteListItem(target) { // delete one item from array and update localStorage data
    let parent = target.closest("li");
    let text = parent.textContent;
    let index = tasks.indexOf(text);

    tasks.splice(index, 1);
    parent.remove();

    localStorage.setItem("tasks", JSON.stringify(tasks)) // update localStorage data
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!inputText.value) {
        inputText.classList.add("is-invalid")
    } else {
        inputText.classList.remove("is-invalid");
        addList(inputText.value);
        form.reset();
    }
});


inputText.addEventListener("keyup", (e) => {
    if (inputText.value) {
        inputText.classList.remove("is-invalid");
    }
})




generateList(tasks);

