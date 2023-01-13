const startQuizBtn = document.getElementById("start");
const startScreen = document.querySelector(".start");
const endScreen = document.getElementById("end-screen");
const questionEl = document.getElementById("question-title");
const questionWrapperEl = document.getElementById("questions");
const choicesEl = document.getElementById("choices");

let currentQuestion = 0;
let seconds = 75; // Set starting time

// Function to hide whole start class to make space for the quizQuestions
const hideStart = () => {
    startScreen.classList.remove("start")
    startScreen.classList.add("hide");
};


// Function to start a timer
const startTimer = () => {

    // Get reference to the timer element within HTML
    const timer = document.querySelector(".timer");
    
    // Create a function to update the timer
    const updateTimer = () => {

        //Update the timer element
        timer.innerHTML = seconds;

        // Check if the timer has reached 0
        if(seconds === 0) {
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