const storedUsername = localStorage.getItem('username');
const usernameDisplay = document.getElementById('user-name');
const loginContainer = document.getElementById('login-container');
const dashboard = document.getElementById('dashboard');
let todos = [];

function updateTimeandGreeting() {
    const clock = document.getElementById('clock');
    const greetingLabel = document.getElementById('greeting-text');
    const now = new Date();
    const hour = now.getHours();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    clock.innerText = timeString;

    let greetingText = '';
    if (hour < 12) {
        greetingText = 'Good Morning';
    } else if (hour < 18) {
        greetingText = 'Good Afternoon';
    } else {
        greetingText = 'Good Evening';
    }
    greetingLabel.textContent = greetingText;

}
function displayUsername() {
    const username = usernameInput.value.trim();

    if (username) {
        localStorage.setItem('username', username);
        usernameDisplay.innerText = username;
        loginContainer.classList.add('hidden');
        dashboard.classList.remove('hidden');
    }
    else {
        alert('Please enter your name');
    }
}

function init() {
    const storedUsername = localStorage.getItem('username');
    const usernameDisplay = document.getElementById('user-name');
    if (storedUsername) {
        usernameDisplay.innerText = storedUsername;
        loginContainer.classList.add('hidden');
        dashboard.classList.remove('hidden');
    }
    updateTimeandGreeting();
    setInterval(updateTimeandGreeting, 1000);
}
init();
document.getElementById("login-btn").addEventListener("click", displayUsername);

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function handleTodoSubmit(event) {
    event.preventDefault(); 
    const todoText = todoInput.value.trim();
    if (todoText) {
        const todo = {
            id : Date.now(),
            text : todoText,
            completed : false
        };
        todos.push(todo);
        renderTodos();
        todoInput.value = '';
    }
}

function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach((todo) => {
        const li = document.createElement('li');
        li.id = todo.id;

        const span = document.createElement('span');
        span.innerText = todo.text;

        const button = document.createElement('button');
        button.innerText = 'Delete';
        button.addEventListener('click', deleteTodo);

        li.appendChild(span);
        li.appendChild(button);
        todoList.appendChild(li);
    })
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    todos = todos.filter((todo) => todo.id !== parseInt(li.id));
    li.remove();
}
todoForm.addEventListener("submit", handleTodoSubmit);
