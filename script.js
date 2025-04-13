let tasks = [];
let isEditing = false;
let editTaskId = null;
let currentTaskSpan = null;

let inputElement = document.getElementById("inputfield");
let tasklist = document.getElementById("list");
let button = document.getElementById("bttn");

button.addEventListener("click", function () {
  let inputText = inputElement.value.trim();

  if (inputText === "") {
    alert("Please Enter Your Task!");
    return;
  }

  if (isEditing) {
    // Update existing task
    let taskToUpdate = tasks.find((task) => task.id === editTaskId);
    if (taskToUpdate) {
      taskToUpdate.text = inputText;
      currentTaskSpan.textContent = inputText;
      ResetInput();
    }
  } else {
    // Create new task
    let taskObj = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };
    tasks.push(taskObj);
    CreateTask(taskObj);
    inputElement.value = "";
  }
});

function CreateTask(task) {
  let listItem = document.createElement("li");
  let wrapper = document.createElement("div");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  let taskSpan = document.createElement("span");
  taskSpan.textContent = task.text;

  let updatebtn = document.createElement("button");
  updatebtn.textContent = "Update";

  let deletebtn = document.createElement("button");
  deletebtn.textContent = "Delete";

  checkbox.addEventListener("change", function () {
    task.completed = checkbox.checked;
    updateTaskStyle();
  });

  function updateTaskStyle() {
    if (task.completed) {
      taskSpan.style.textDecoration = "line-through";
      taskSpan.style.color = "gray";
    } else {
      taskSpan.style.textDecoration = "none";
      taskSpan.style.color = "black";
    }
  }

  updateTaskStyle();

  deletebtn.addEventListener("click", function () {
    tasks = tasks.filter((t) => t.id !== task.id);
    tasklist.removeChild(listItem);
  });

  updatebtn.addEventListener("click", function () {
    inputElement.value = task.text;
    button.textContent = "Update";
    isEditing = true;
    editTaskId = task.id;
    currentTaskSpan = taskSpan;
  });

  wrapper.appendChild(checkbox);
  wrapper.appendChild(taskSpan);
  wrapper.appendChild(updatebtn);
  wrapper.appendChild(deletebtn);
  listItem.appendChild(wrapper);
  tasklist.appendChild(listItem);
}

function RefreshTasks() {
  tasklist.innerHTML = "";
  tasks.forEach((task) => CreateTask(task));
}

function ResetInput() {
  inputElement.value = "";
  button.textContent = "Create";
  isEditing = false;
  editTaskId = null;
}
