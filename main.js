import { initClock } from "./src/clock.js";
import { initTodo } from "./src/todo.js";
import { initWeather } from "./src/weather.js";
import { initTheme } from "./src/theme.js";

const loginBtn = document.getElementById('login-btn');
const storedUsername = localStorage.getItem('username');

if (storedUsername) {
    showDashboard(storedUsername);
}

loginBtn.addEventListener("click", () => {
    const name = document.getElementById('name-input').value;
    localStorage.setItem('username', name);
    showDashboard(name);
});

function showDashboard(name) {
    document.getElementById('user-name').innerText = name;
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    
    // Start the modules only after login
    initClock();
    initTodo();
    initWeather();
    initTheme();
}