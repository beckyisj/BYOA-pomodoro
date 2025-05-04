let timeLeft;
let timerId;
let isRunning = false;
let currentMode = 'pomodoro';
const defaultTitle = 'Pomodoro Timer';

const timeDisplay = document.querySelector('.time-display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeButtons = document.querySelectorAll('.mode-btn');
const longBreakSlider = document.getElementById('longBreakSlider');
const longBreakValue = document.getElementById('longBreakValue');
const longBreakControls = document.querySelector('.long-break-controls');

// Initialize timer with default 25 minutes
resetTimer();

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Long break slider event listener
longBreakSlider.addEventListener('input', () => {
    const value = longBreakSlider.value;
    longBreakValue.textContent = value;
    
    // If currently in long break mode, update the timer
    if (currentMode === 'long break') {
        resetTimer();
    }
});

modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        modeButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Set current mode and reset timer
        currentMode = button.textContent.toLowerCase();
        
        // Show/hide long break controls based on mode
        if (currentMode === 'long break') {
            longBreakControls.classList.add('visible');
        } else {
            longBreakControls.classList.remove('visible');
        }
        
        resetTimer();
    });
});

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerId = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerId);
        document.title = defaultTitle;
    }
}

function resetTimer() {
    pauseTimer();
    const activeButton = document.querySelector('.mode-btn.active');
    let minutes;
    
    if (activeButton.textContent.toLowerCase() === 'long break') {
        minutes = parseInt(longBreakSlider.value);
    } else {
        minutes = parseInt(activeButton.dataset.time);
    }
    
    timeLeft = minutes * 60;
    updateDisplay();
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        // Timer has finished
        pauseTimer();
        // Play a sound or show a notification
        alert('Time is up!');
    }
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timeDisplay.textContent = timeString;
    
    // Update the page title with the current time
    if (isRunning) {
        document.title = `${timeString} - ${defaultTitle}`;
    }
} 