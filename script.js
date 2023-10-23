// Оголошення змінних і вибірка елементів DOM
let TaskValue = document.querySelector("#task");
let ButtonAdd = document.querySelector("#ButtonAdd");
let ButtonDelete = document.querySelector("#ButtonDelete");
let ToDoList = document.querySelector(".todolist_ul");
let taskItems = [];

// Обробник події для натискання клавіші "Enter" у полі введення "Task"
TaskValue.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addButtonClickHandler();
    }
});

// Обробник події для кнопки "Додати" (ButtonAdd), яка викликає addButtonClickHandler
ButtonAdd.addEventListener('click', addButtonClickHandler);

// Обробник події для кнопки "Видалити всі", яка видаляє всі завдання та очищає масив taskItems
ButtonDelete.addEventListener("click", () => {
    // Видаляємо всі елементи <li> зі списку завдань
    while (ToDoList.firstChild) {
        ToDoList.removeChild(ToDoList.firstChild);
    }

    // Очищаємо масив taskItems
    taskItems = [];
    saveData();
});

// Функція для додавання завдань та визначення стану перечеркнення тексту
function addButtonClickHandler() {
    const taskText = TaskValue.value.trim(); // Видаляємо зайві пробіли
    if (taskText !== "") {
        const li = document.createElement("li");
        li.className = "todolist_ul_li";

        const p = document.createElement("p");
        p.innerText = taskText;

        const btnDelete = document.createElement("button");
        btnDelete.className = "todolist_ul_li_delete";
        btnDelete.innerText = "Delete";

        li.appendChild(p);
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
            saveData();
        });

        // Обробник події для кнопки "Delete", який видаляє елемент <li>
        btnDelete.addEventListener("click", () => {
            ToDoList.removeChild(li);
            taskItems = taskItems.filter(item => item !== li); // Видаляємо з масиву
            saveData();
        });

        ToDoList.appendChild(li);
        taskItems.push(li);
        TaskValue.value = "";
        saveData();
    }
}

function saveData() {
    // Створюємо масив об'єктів, які представляють завдання і їх стан перечеркнення
    const taskTexts = taskItems.map(item => {
        // Перевіряємо стан перечеркнення тексту і зберігаємо в об'єкті
        const isCrossedOut = item.querySelector("p").style.textDecoration === "line-through";
        return { text: item.querySelector("p").innerText, crossedOut: isCrossedOut };
    });
    // Зберігаємо об'єкти у localStorage після перетворення їх у рядок JSON
    localStorage.setItem("data", JSON.stringify(taskTexts));
}

function showTask() {
    const data = localStorage.getItem("data");
    if (data) {
        const taskTexts = JSON.parse(data);
        taskTexts.forEach(task => {
            TaskValue.value = task.text;
            addButtonClickHandler();
            // Встановлюємо стан перечеркнення збереженого завдання
            const addedTask = taskItems[taskItems.length - 1];
            if (task.crossedOut) {
                addedTask.querySelector("p").style.textDecoration = "line-through";
            }
        });
    }
}

showTask();

