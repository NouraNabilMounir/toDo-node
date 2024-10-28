async function fetchTodos() {
  const response = await fetch("/api/todos");
  const todos = await response.json();
  renderTodos(todos);
}

async function addTodo() {
  const title = document.getElementById("todo-input").value.trim();
  if (title === '') {
      alert('Please Enter a ToDo item');
      return;
  }
  
  const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
  });

  if (response.ok) {
      document.getElementById("todo-input").value = "";
      fetchTodos();
  } else {
      alert('Failed to add ToDo item');
  }
}

async function deleteTodo(id) {
  await fetch(`/api/todos/${id}`, { method: "DELETE" });
  fetchTodos();
}

async function toggleComplete(id) {
  const response = await fetch(`/api/todos/${id}`);
  const todo = await response.json();
  await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed })
  });
  fetchTodos();
}

function renderTodos(todos) {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  todos.forEach((todo) => {
      const item = document.createElement("li");
      item.textContent = todo.title;
      item.style.textDecoration = todo.completed ? "line-through" : "none";
      item.onclick = () => toggleComplete(todo.id);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = (e) => {
          e.stopPropagation();
          deleteTodo(todo.id);
      };

      item.appendChild(deleteButton);
      list.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", fetchTodos);
