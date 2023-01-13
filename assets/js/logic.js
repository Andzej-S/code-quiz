const startQuizBtn = document.getElementById("start");
const startScreen = document.querySelector(".start");
const endScreen = document.getElementById("end-screen");

// Function to hide whole start class to make space for the quizQuestions
const hideStart = () => {
    startScreen.classList.remove("start")
    startScreen.classList.add("hide");
};

// Function to start a timer
const startTimer = () => {

    // Set starting time
    let seconds = 75;

    // Get reference to the timer element within HTML
    const timer = document.querySelector(".timer");
    
    // Create a function to update the timer
    const updateTimer = () => {

        //Update the timer element
        timer.innerHTML = seconds;

        // Check if the timer has reached 0
        if(seconds <= 0) {
            clearInterval(intervalId);
            endScreen.classList.remove("hide");
        }
        seconds--;
    }

    // Update the timer every 1000ms (1s)
    const intervalId = setInterval(updateTimer, 1000);
};

startQuizBtn.addEventListener("click", () => {
    startTimer();
    hideStart();
});