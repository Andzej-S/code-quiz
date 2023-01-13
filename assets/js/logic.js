const startQuizBtn = document.getElementById("start");
const startScreen = document.querySelector(".start");

// Function to hide whole start class to make space for the quizQuestions
const hideStart = () => {
    startScreen.classList.remove("start")
    startScreen.classList.add("hide");
};

startQuizBtn.addEventListener("click", () => {
    hideStart();
});