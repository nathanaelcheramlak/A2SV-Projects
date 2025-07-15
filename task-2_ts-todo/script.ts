const myaddTaskBtn = document.getElementById("addTaskBtn") as HTMLButtonElement;
const mytaskInput = document.getElementById("taskInput") as HTMLInputElement;
const mytaskList = document.getElementById("taskList") as HTMLUListElement;

function createTaskElementFn(text: string): HTMLLIElement {
  const li = document.createElement("li");

  const span = document.createElement("span") as HTMLSpanElement;
  span.textContent = text;
  span.classList.add("task-text");
  span.onclick = () => {
    span.classList.toggle("completed");
  };

  const editBtn = document.createElement("button") as HTMLButtonElement;
  editBtn.classList.add("icon-button");
  const editImg = document.createElement("img") as HTMLImageElement;
  editImg.src = "public/edit_1.png";
  editImg.alt = "Edit";
  editBtn.appendChild(editImg);
  editBtn.onclick = () => editTaskFn(span);

  const deleteBtn = document.createElement("button") as HTMLButtonElement;
  deleteBtn.classList.add("icon-button");
  const deleteImg = document.createElement("img") as HTMLImageElement;
  deleteImg.src = "public/delete_1.png";
  deleteImg.alt = "Delete";
  deleteBtn.appendChild(deleteImg);
  deleteBtn.onclick = () => li.remove();

  const container = document.createElement("div") as HTMLDivElement;
  container.appendChild(editBtn);
  container.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(container);
  return li;
}

function addTaskFn(): void {
  const text: string = mytaskInput.value.trim();
  if (text !== "") {
    const task: HTMLLIElement = createTaskElementFn(text);
    mytaskList.appendChild(task);
    mytaskInput.value = "";
  }
}

function editTaskFn(span: HTMLSpanElement): void {
  const newText: string | null = prompt(
    "Edit your task:",
    span.textContent as string | undefined
  );
  if (newText !== null && newText.trim() !== "") {
    span.textContent = newText.trim();
  }
}

myaddTaskBtn.addEventListener("click", addTaskFn);

mytaskInput.addEventListener("keypress", (e: KeyboardEvent) => {
  if (e.key === "Enter") addTaskFn();
});
