let TaskValue = document.querySelector("#task");
let ButtonAdd = document.querySelector("#ButtonAdd");
let TaskList = document.querySelector(".todolist_ul_li");
let ButtonDelete = document.querySelector("#ButtonDelete");
let ToDoList = document.querySelector(".todolist_ul")
let taskItems = [];

TaskValue.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Щоб уникнути додавання нового рядка
        addButtonClickHandler();
    }
});

ButtonAdd.addEventListener('click', addButtonClickHandler);

ButtonDelete.addEventListener("click", () => {
    // Видаляємо всі елементи <li> зі списку завдань
    for (let item of taskItems) {
        ToDoList.removeChild(item);
    }

    // Очищаємо масив taskItems
    taskItems = [];
});

function addButtonClickHandler() {
    if (TaskValue.value !== "") {
        const li = document.createElement("li");
        const p = document.createElement("p")
        const btnDelete = document.createElement("button");
        btnDelete.className = "todolist_ul_li_delete";
        btnDelete.innerText = "Delete";
        li.className = "todolist_ul_li";
        p.innerText = TaskValue.value;
        ToDoList.appendChild(li);
        li.appendChild(p)
        li.appendChild(btnDelete);

        // Змінна для відстеження стану перечеркнення тексту
        let isCrossedOut = false;

        // Додаємо обробник події "click" для перечеркнення / розічеркування тексту
        li.addEventListener("click", () => {
            if (isCrossedOut) {
                p.style.textDecoration = "none"; // Зняти перечеркнення
            } else {
                p.style.textDecoration = "line-through"; // Перечеркнути текст
            }
            isCrossedOut = !isCrossedOut; // Змінюємо стан перечеркнення
        });

        // Додаємо кнопку "Delete" в елемент <li>
        li.appendChild(btnDelete);
        
        btnDelete.addEventListener("click", () => {
            // Видаляємо батьківський елемент <li> з <ul>
            ToDoList.removeChild(li);
        });

        taskItems.push(li);
        TaskValue.value = "";
    }
}