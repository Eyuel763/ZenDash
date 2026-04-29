export function initClock() {
    updateTimeandGreeting(); // Initial call to set the time and greeting immediately
    setInterval(updateTimeandGreeting, 1000)
}

function updateTimeandGreeting() {
    const clock = document.getElementById('clock');
    const greetingLabel = document.getElementById('greeting-text');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    clock.innerText = timeString;

    let hour = now.getHours();
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