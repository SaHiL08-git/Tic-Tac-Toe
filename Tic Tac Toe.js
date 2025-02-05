let buttons = document.querySelectorAll(".box");
let reset = document.querySelector("#clear");
let newbutton = document.querySelector("#new");
let message = document.querySelector(".champion");
let winText = document.querySelector("#win");

let player1 = prompt("Enter Player 1 Name:") || "Player 1";
let player2 = prompt("Enter Player 2 Name:") || "Player 2";

let playerChance = true;
const winnerPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6]
];

// Reset the game
const resetGame = () => {
    playerChance = true;
    enableBoxes();
    message.classList.remove("show");
    winText.innerText = "";
};

// Click event for each box
buttons.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;

        box.innerText = playerChance ? "X" : "O";
        box.style.transform = "scale(1.2)";
        setTimeout(() => (box.style.transform = "scale(1)"), 200);

        playerChance = !playerChance;
        box.disabled = true;
        checkWinner();
    });
});

// Disable all boxes when game ends
const disableBoxes = () => {
    buttons.forEach((box) => {
        box.disabled = true;
    });
};

// Enable all boxes for new game
const enableBoxes = () => {
    buttons.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("winning-box", "draw-box");
    });
};

// Display winner
const showWinner = (winner, winCombo) => {
    let winnerName = winner === "X" ? player1 : player2;
    winText.innerText = `🎉 Congratulations, ${winnerName} won! 🎉`;

    // Add animation to winning boxes
    winCombo.forEach((index) => {
        buttons[index].classList.add("winning-box");
    });

    message.classList.add("show");
    disableBoxes();
};

// Check for a winner
const checkWinner = () => {
    for (let win of winnerPatterns) {
        let [a, b, c] = win;
        if (
            buttons[a].innerText !== "" &&
            buttons[a].innerText === buttons[b].innerText &&
            buttons[b].innerText === buttons[c].innerText
        ) {
            showWinner(buttons[a].innerText, win);
            return;
        }
    }

    // Check for draw
    if ([...buttons].every((box) => box.innerText !== "")) {
        winText.innerText = "😲 It's a DRAW!";
        message.classList.add("show");

        // Apply shake animation to all boxes
        buttons.forEach((box) => {
            box.classList.add("draw-box");
        });

        disableBoxes();
    }
};

// New game button
newbutton.addEventListener("click", () => {
    player1 = prompt("Enter Player 1 Name:") || "Player 1";
    player2 = prompt("Enter Player 2 Name:") || "Player 2";
    resetGame();
});

// Reset button
reset.addEventListener("click", resetGame);
