let TaskValue = document.querySelector("#task");
let ButtonAdd = document.querySelector("#ButtonAdd");
let TaskList = document.querySelectorAll(".todolist_ul_li");
let ButtonDelete = document.querySelector("#ButtonDelete");
const paragraph = document.querySelector(".todolist_ul_li_p");

ButtonAdd.addEventListener('click', function(){
    if(TaskValue.value !== ""){
        /*add text in p */
        TaskList.forEach(function(item) {
            item.style.display = "flex";
        });
        paragraph.textContent = TaskValue.value;
        TaskValue.value = "";
    }
});

ButtonDelete.addEventListener('click', function(){
    TaskList.forEach(function(item) {
        item.style.display = "none";
    });
    TaskValue.value = "";
});
