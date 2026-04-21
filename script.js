const API_KEY = config.API_KEY; // OpenWeatherMap API key
const storedUsername = localStorage.getItem('username');
const usernameDisplay = document.getElementById('user-name');
const loginContainer = document.getElementById('login-container');
const dashboard = document.getElementById('dashboard');

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
let todos = [];

function init() {
    const storedUsername = localStorage.getItem('username');
    const usernameDisplay = document.getElementById('user-name');
    if (storedUsername) {
        usernameDisplay.innerText = storedUsername;
        loginContainer.classList.add('hidden');
        dashboard.classList.remove('hidden');
    }
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos); // Convert the JSON string back to an array of todo objects
        paintTodos();
    }
    updateTimeandGreeting();
    setInterval(updateTimeandGreeting, 1000);
}

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

function paintTodos() {
    todoList.innerHTML = '';

    todos.forEach((todo) => {
        const li = document.createElement('li');
        li.id = todo.id;

        const span = document.createElement('span');
        span.innerText = todo.text;

        const button = document.createElement('button');
        button.innerText = 'Delete';
        button.addEventListener('click', deleteTodo);

        li.appendChild(span); // Add the todo text to the list item
        li.appendChild(button); // Add the delete button to the list item
        todoList.appendChild(li); // Add the list item to the todo list
    })
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    todos = todos.filter((todo) => todo.id !== parseInt(li.id));
    li.remove();
    saveTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos)); // Convert the todos array to a JSON string and save it in localStorage
}

function onGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    // Fetch the weather data from the OpenWeatherMap API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temp = document.getElementById('temp');
            const city = document.getElementById('city');
            temp.innerText = `${Math.round(data.main.temp)}°C`; // Display the temperature in Celsius, rounded to the nearest whole number
            city.innerText = data.name;

            const weatherCondition = data.weather[0].main.toLowerCase();
            document.body.style.backgroundImage = `url('images/${weatherCondition}.jpg')`;

            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";

            console.log(weatherCondition);
        })
}

function onGeoError() {
    alert("Can't find you. No weather for you!");
}

init();
document.getElementById("login-btn").addEventListener("click", displayUsername);
todoForm.addEventListener("submit", handleTodoSubmit);
navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
