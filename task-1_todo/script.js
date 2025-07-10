const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function createTaskElement(text) {
	const li = document.createElement("li");

	const span = document.createElement("span");
	span.textContent = text;
	span.classList.add("task-text");
	span.onclick = () => {
		span.classList.toggle("completed");
	};

	const editBtn = document.createElement("button");
	editBtn.classList.add("icon-button");
	const editImg = document.createElement("img");
	editImg.src = "public/edit_1.png";
	editImg.alt = "Edit";
	editBtn.appendChild(editImg);
	editBtn.onclick = () => editTask(span);

	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("icon-button");
	const deleteImg = document.createElement("img");
	deleteImg.src = "public/delete_1.png";
	deleteImg.alt = "Delete";
	deleteBtn.appendChild(deleteImg);
	deleteBtn.onclick = () => li.remove();

	const container = document.createElement("div");
	container.appendChild(editBtn);
	container.appendChild(deleteBtn);

	li.appendChild(span);
	li.append(container);
	return li;
}

function addTask() {
	const text = taskInput.value.trim();
	if (text !== "") {
		const task = createTaskElement(text);
		taskList.appendChild(task);
		taskInput.value = "";
	}
}

function editTask(span) {
	const newText = prompt("Edit your task:", span.textContent);
	if (newText !== null && newText.trim() !== "") {
		span.textContent = newText.trim();
	}
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") addTask();
});
