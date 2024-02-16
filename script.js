const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
    } else {
        let task = inputBox.value.trim();
        let li = document.createElement('li');
        li.textContent = task;
        
        // Adding cross for each task
        let span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);
        
        listContainer.appendChild(li);
        inputBox.value = '';
        saveData(); // Save all tasks
    }
}

inputBox.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        addTask();
    }
});

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(); // Save all tasks
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(); // Save all tasks
    }
}, false);

function saveData() {
    let tasks = [];
    listContainer.querySelectorAll("li").forEach(li => {
        let task = {
            text: li.textContent,
            checked: li.classList.contains("checked")
        };
        tasks.push(task);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.textContent = task.text;
        if (task.checked) {
            li.classList.add("checked");
        }
        
        // Adding cross for each task
        let span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);
        
        listContainer.appendChild(li);
    });
}
showTask();


