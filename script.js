let textToType = document.getElementById('text-to-type');
let userInput = document.getElementById('user-input');
let startButton = document.getElementById('start-button');
let timeDisplay = document.getElementById('time');
let wpmDisplay = document.getElementById('wpm');
let accuracyDisplay = document.getElementById('accuracy');

let textSample = "The quick brown fox jumps over the lazy dog.";
let startTime, endTime;
let typedText = "", correctChars = 0, totalChars = 0;
let timer, timeElapsed = 0;

let isTestRunning = false;

function startTest() {
    if (isTestRunning) return;

    isTestRunning = true;
    userInput.value = "";
    userInput.disabled = false;
    userInput.focus();

    textToType.innerText = textSample;
    startButton.innerText = "Restart Test";

    typedText = "";
    correctChars = 0;
    totalChars = 0;
    timeElapsed = 0;
    clearInterval(timer);
    
    startTime = Date.now();

    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    timeDisplay.innerText = `Time: ${timeElapsed}s`;
    
    let wpm = calculateWPM();
    wpmDisplay.innerText = `Words Per Minute: ${wpm}`;
    
    let accuracy = calculateAccuracy();
    accuracyDisplay.innerText = `Accuracy: ${accuracy}%`;
    
    if (typedText === textSample) {
        clearInterval(timer);
        userInput.disabled = true;
        alert("Test completed!");
    }
}

function calculateWPM() {
    // Calculate WPM: (number of words / time in minutes)
    let words = typedText.split(" ").length;
    return Math.floor((words / timeElapsed) * 60);
}

function calculateAccuracy() {
    // Calculate accuracy: correct chars / total chars * 100
    return Math.floor((correctChars / totalChars) * 100);
}

userInput.addEventListener('input', function() {
    typedText = userInput.value;

    // Calculate correct characters and total characters typed
    correctChars = 0;
    totalChars = 0;

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === textSample[i]) {
            correctChars++;
        }
        totalChars++;
    }
});

startButton.addEventListener('click', startTest);
