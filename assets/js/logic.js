const startQuizBtn = document.getElementById("start");
const startScreen = document.querySelector(".start");
const endScreen = document.getElementById("end-screen");
const questionEl = document.getElementById("question-title");
const questionWrapperEl = document.getElementById("questions");
const choicesEl = document.getElementById("choices");

let currentQuestion = 0;


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


// Function to display questions and choices
const displayQuestion = () => {
    for(let i = 0; i < quizQuestions.length; i++) {
        if(i === currentQuestion) {

            // Un-hide the elements that display question and choices
            questionWrapperEl.classList.remove("hide");
            questionEl.innerHTML = quizQuestions[i].question;
            choicesEl.innerHTML = "";

            // Shows all the choices for a particular question
            quizQuestions[i].choices.map((choice, index) => {
                choicesEl.innerHTML += `<input type="radio" name="answer" value="${choice}"> ${index + 1}. ${choice}<br>`;
            });
        }
    }
}


// Event listener for when the user clicks on Start Quiz button
startQuizBtn.addEventListener("click", () => {
    startTimer();
    hideStart();
    displayQuestion();
});