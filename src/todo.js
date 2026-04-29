let todos = [];
const todoList = document.getElementById('todo-list');

export function initTodo() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos); // Convert the JSON string back to an array of todo objects
        paintTodos();
    }
    document.getElementById('todo-form').addEventListener("submit", handleTodoSubmit);
}

function paintTodos(filteredTodos = todos) {
    todoList.innerHTML = '';

    filteredTodos.forEach((todo) => {
        const li = document.createElement('li');
        li.id = todo.id;

        const span = document.createElement('span');
        span.innerText = todo.text;

        if (todo.completed) {
            span.style.textDecoration = 'line-through';
            span.style.opacity = '0.5';
        }

        span.addEventListener('click', () => toggleTodo(todo.id));

        const button = document.createElement('button');
        button.innerText = 'Delete';
        button.addEventListener('click', deleteTodo);

        li.appendChild(span); // Add the todo text to the list item
        li.appendChild(button); // Add the delete button to the list item
        todoList.appendChild(li); // Add the list item to the todo list
    })
}

function handleTodoSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
    const todoText = todoInput.value.trim();
    if (todoText) {
        const todo = {
            id: Date.now(),
            text: todoText,
            completed: false
        }; // Create a new todo object with a unique ID and the entered text
        todos.push(todo);
        paintTodos();
        todoInput.value = '';
        saveTodos();
    }
}

function deleteTodo(event) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the list item, which would toggle the todo
    const li = event.target.parentElement;
    todos = todos.filter((todo) => todo.id !== parseInt(li.id));
    li.remove();
    saveTodos();
    paintTodos();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        paintTodos();
    }

}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos)); // Convert the todos array to a JSON string and save it in localStorage
}