document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => renderTask(task.text, task.completed));

    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            renderTask(taskText);
            saveTask(taskText, false);
            taskInput.value = "";
        }
    });

    function renderTask(text, completed = false) {
        const li = document.createElement("li");
        li.classList.add("task-item");
        if (completed) li.classList.add("completed");

        li.innerHTML = `
            <span>${text}</span>
            <div>
                <button class="complete-button">✔</button>
                <button class="delete-button">✖</button>
            </div>
        `;

        // Mark as complete
        li.querySelector(".complete-button").addEventListener("click", () => {
            li.classList.toggle("completed");
            updateTask(text, li.classList.contains("completed"));
        });

        // Delete task
        li.querySelector(".delete-button").addEventListener("click", () => {
            taskList.removeChild(li);
            deleteTask(text);
        });

        taskList.appendChild(li);
    }

    function saveTask(text, completed) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ text, completed });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function updateTask(text, completed) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const taskIndex = tasks.findIndex((task) => task.text === text);
        if (taskIndex > -1) {
            tasks[taskIndex].completed = completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }

    function deleteTask(text) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter((task) => task.text !== text);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
