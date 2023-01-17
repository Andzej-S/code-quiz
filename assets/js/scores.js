const highscoreList = document.getElementById("highscores");
const clearBtn = document.getElementById("clear");

if(highscoreList){
    const displayHighscores = () => {
        let allHighscores = JSON.parse(localStorage.getItem("allHighscores"));

        if (allHighscores !== null) {
            allHighscores.forEach(score => {
                let newLi = document.createElement("li");
                newLi.textContent = `${score.initials} - ${score.score}`;
                highscoreList.appendChild(newLi);
            });
        }
    }
    displayHighscores();
}


clearBtn.addEventListener("click", () => {
    localStorage.removeItem("allHighscores");
    highscoreList.innerHTML = "";
    displayHighscores();
});