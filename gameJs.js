
        let randomNumber = Math.floor(Math.random() * 100) + 1;
        const guesses = document.getElementById("guesses");
        const lastResult = document.getElementById("lastResult");
        const lowOrHi = document.getElementById("lowOrHi");
        let guessCount = 0;
        let resetButton;

        function checkGuess() {
            const userGuess = Number(document.getElementById("guessField").value);
            if (guessCount === 0) {
                guesses.textContent = "Previous guesses: ";
            }
            guesses.textContent += userGuess + " ";

            if (userGuess === randomNumber) {
                lastResult.textContent = "Congratulations! You got it right!";
                lastResult.style.backgroundColor = "#56fd01";
                lowOrHi.textContent = "";

                const container = document.getElementById("confetti-container");
                for (let i = 0; i <500; i++) {
                    const confetti = document.createElement("div");
                    confetti.className = "confetti";
                    const r = Math.floor(Math.random() * 256);
                    const g = Math.floor(Math.random() * 256);
                    const b = Math.floor(Math.random() * 256);
                    confetti.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                    confetti.style.left = Math.random() * 100 + "vw";
                    confetti.style.animationDuration = (Math.random() *5 + 2) + "s";
                    confetti.style.animationDelay = Math.random() *0 + "s";
                    container.appendChild(confetti);

                    confetti.addEventListener("animationend", () => {
                        container.removeChild(confetti);
                    });
                }
                setGameOver();
            } else {
                lastResult.textContent = "Wrong!";
                lastResult.style.backgroundColor = "red";
                if (userGuess < randomNumber) {
                    lowOrHi.textContent = "Last guess was too low!";
                } else if (userGuess > randomNumber) {
                    lowOrHi.textContent = "Last guess was too high!";
                }
                guessCount++;
                if (guessCount === 10) {
                    lastResult.textContent = "!!!GAME OVER!!!";
                    setGameOver();
                }
            }
            document.getElementById("guessField").value = "";
            document.getElementById("guessField").focus();
        }

        document.getElementById("guessSubmit").addEventListener("click", checkGuess);

        function setGameOver() {
            document.getElementById("guessField").disabled = true;
            document.getElementById("guessSubmit").disabled = true;
            resetButton = document.createElement("button");
            resetButton.textContent = "Start new game";
            resetButton.classList.add("btn", "btn-primary");
            document.getElementById("buttonContainer").appendChild(resetButton);
            resetButton.addEventListener("click", resetGame);
        }

        function resetGame() {
            guessCount = 0;
            const resetParas = document.querySelectorAll(".resultParas p");
            for (let i = 0; i < resetParas.length; i++) {
                resetParas[i].textContent = "";
            }

            resetButton.parentNode.removeChild(resetButton);
            document.getElementById("guessField").disabled = false;
            document.getElementById("guessSubmit").disabled = false;
            document.getElementById("guessField").value = "";
            document.getElementById("guessField").focus();
            guesses.textContent = "";
            lowOrHi.textContent = "";
            lastResult.textContent = "";
            lastResult.style.backgroundColor = "white";
            randomNumber = Math.floor(Math.random() * 100) + 1;
        }
