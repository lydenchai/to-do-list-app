let tasks = [
  { text: "test1", completed: false },
  { text: "test2", completed: false },
  { text: "test3", completed: false },
  { text: "test4", completed: false },
  { text: "test5", completed: false },
];
let completedTasks = [];
let isUpdateMode = false;
let updateIndex = null;

function addOrUpdateTask() {
  const taskInput = document.getElementById("taskInput");
  const taskValue = taskInput.value.trim();

  if ((event.key === "Enter" || event.type === "click") && taskValue !== "") {
    if (isUpdateMode) {
      tasks[updateIndex].text = taskValue;
      isUpdateMode = false;
      updateIndex = null;
      document.getElementById("addButton").innerText = "Add Task";
    } else {
      tasks.push({ text: taskValue, completed: false });
    }

    taskInput.value = "";
    renderTasks();
  }
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  const completedTasksList = document.getElementById("completedTasks");
  taskList.innerHTML = "";
  completedTasksList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span class="${task.completed ? "completed" : ""}">${index + 1}. ${
      task.text
    }</span> 
      <div style="display: flex;">
        <button class="markAsCompleted" onclick="markAsCompleted(${index})">
          <img src="./images/completed.svg" width="18" >
        </button>
        <button class="update" onclick="updateTask(${index})">
          <img src="./images/update.svg" width="20" >
        </button>
        <button class="delete" onclick="removeTask(${index})">
          <img src="./images/delete.svg" width="20" >
        </button>
      </div>
    `;
    taskList.appendChild(listItem);
  });

  completedTasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span class="completed">${index + 1}. ${task.text}</span>
      <div style="display: flex;">
        <button class="restore" onclick="restoreTask(${index})">
          <img src="./images/restore.svg" width="18" >
        </button>
        <button class="delete" onclick="removeCompletedTask(${index})">
          <img src="./images/delete.svg" width="20" >
        </button>
      </div>
    `;
    completedTasksList.appendChild(listItem);
  });

  document.getElementById("noTask").style.display =
    tasks.length < 1 ? "block" : "none";

  document.getElementById("showText").style.display =
    completedTasks.length > 0 ? "block" : "none";
}

function renderCompletedTasks() {
  const completedTasksList = document.getElementById("completedTasks");
  completedTasksList.innerHTML = "";

  completedTasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span class="completed">${index + 1}. ${task.text}</span> 
      <div style="display: flex;">
        <button class="restore" onclick="restoreTask(${index})"> 
          <img src="./images/restore.svg" width="18" >
        </button>
        <button class="delete" onclick="removeCompletedTask(${index})">
          <img src="./images/delete.svg" width="20" >
        </button>
      </div>
    `;
    completedTasksList.appendChild(listItem);
  });
}

function restoreTask(index) {
  const restoredTask = completedTasks[index];
  completedTasks.splice(index, 1);
  tasks.push(restoredTask);
  renderTasks();
  renderCompletedTasks();
}

function markAsCompleted(index) {
  tasks[index].completed = true;
  completedTasks.push(tasks[index]);
  tasks.splice(index, 1);
  renderTasks();
  renderCompletedTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function removeCompletedTask(index) {
  completedTasks.splice(index, 1);
  renderCompletedTasks();
  renderTasks();
}

function updateTask(index) {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;
  isUpdateMode = true;
  updateIndex = index;
  document.getElementById("addButton").innerText = "Update";
}

renderTasks();

document
  .getElementById("taskInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addOrUpdateTask();
    }
  });

document.getElementById("addButton").addEventListener("click", addOrUpdateTask);
