const startQuizBtn = document.getElementById("start");
const startScreen = document.querySelector(".start");
const endScreen = document.getElementById("end-screen");
const questionEl = document.getElementById("question-title");
const questionWrapperEl = document.getElementById("questions");
const choicesEl = document.getElementById("choices");
const scoreEl = document.getElementById("final-score");
const initialsEl = document.getElementById("initials");

// Create audio elements for correct and incorrect answers
const correctSound = new Audio("correct.wav");
correctSound.src = "./assets/sfx/correct.wav";
const incorrectSound = new Audio("incorrect.wav");
incorrectSound.src = "./assets/sfx/incorrect.wav";

let currentQuestion = 0;
let seconds = 75; // Set starting time
let score = 0; // Initial value of the score
let maxCharacters = 3 // Max characters for initials after completing the quiz
let intervalId;

// Function to hide whole start class to make space for the quizQuestions
const hideStart = () => {
    startScreen.classList.remove("start")
    startScreen.classList.add("hide");
};


// Function to calculate and display the score
const scoreCalc = () => {
    score = seconds - intervalId;
    scoreEl.innerHTML = score;
};


// Function to start a timer
const startTimer = () => {

    // Get reference to the timer element within HTML
    const timer = document.querySelector(".timer");
    
    // Create a function to update the timer
    const updateTimer = () => {

        //Update the timer element
        timer.innerHTML = seconds;

        // Check if the timer has reached 0 OR if end-screen reached and stop the count
        if(seconds === 0 || currentQuestion === quizQuestions.length) {
            clearInterval(intervalId);
            endScreen.classList.remove("hide");
            scoreCalc();
        }
        seconds--;
    }

    // Update the timer every 1000ms (1s)
    intervalId = setInterval(updateTimer, 1000);
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
};


// Function to listen to clicks on choices and progress the quiz
const answerListener = () => {
    choicesEl.addEventListener("click", (event) => {
        if(event.target.tagName === "INPUT") {
            let selectedAnswer = event.target.value;
            let feedbackEl = document.getElementById("feedback");
            feedbackEl.classList.remove("hide");
            if(selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
                feedbackEl.innerHTML = "Correct!";
                correctSound.play();
            } else {

                // Deducts 10 seconds for each wrong answer
                feedbackEl.innerHTML = "Wrong!"
                let timer = parseInt(document.querySelector(".timer").innerHTML);
                if(timer >= 10){
                    seconds -= 10;
                }else{
                    seconds = 0;

                    // Removes remaining questions if time runs out
                    choicesEl.classList.add("hide");
                    questionEl.classList.add("hide");
                    endScreen.classList.remove("hide");
                }
                incorrectSound.play();
            }

            // Makes feedback disappear after 1 second
            setTimeout(function() {
                feedbackEl.innerHTML = "";
            }, 1000);

            // Progresses the quiz after answering the question
            currentQuestion++;
            if(currentQuestion < quizQuestions.length) {
                displayQuestion(currentQuestion);
            } else {
                choicesEl.classList.add("hide");
                questionEl.classList.add("hide");
                endScreen.classList.remove("hide");
            }
        }
    })
};
answerListener();


// Event listener for when the user clicks on Start Quiz button that calls all relevant functions
startQuizBtn.addEventListener("click", () => {
    startTimer();
    hideStart();
    displayQuestion();
});


// Function that limits the amount of character input and prevents symbols, number and non-English letters
initialsEl.addEventListener("input", function() {
    if (this.value.length > maxCharacters) {
      this.value = this.value.slice(0, maxCharacters);
    }
    this.value = this.value.replace(/[^a-zA-Z]/g, "");
});