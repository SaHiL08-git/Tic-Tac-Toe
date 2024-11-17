let buttons = document.querySelectorAll(".box");
let reset = document.querySelector("#clear");
let newbutton = document.querySelector("#new");
let message = document.querySelector(".champion");

let player1 = prompt("Enter Player 1 Name:");
let player2 = prompt("Enter Player 2 Name:");

let playerChance = true;
const winner = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    playerChance = true;
    enableBoxes();
    message.classList.add("hide");
    message.innerText = "";
};

buttons.forEach((box) => {
    box.addEventListener("click", () => {
        if (playerChance) {
            box.innerText = "X";
        } else {
            box.innerText = "O";
        }
        playerChance = !playerChance;
        box.disabled = true;
        winnerDecider();
    });
});

const disableBoxes = () => {
    buttons.forEach((box) => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    buttons.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    let winnerName = winner === "X" ? player1 : player2;
    message.innerText = `Congratulations, ${winnerName} won!`;
    message.classList.remove("hide");
    disableBoxes();
};

const winnerDecider = () => {
    for (let win of winner) {
        let val1 = buttons[win[0]].innerText;
        let val2 = buttons[win[1]].innerText;
        let val3 = buttons[win[2]].innerText;

        if (val1 !== "" && val1 === val2 && val2 === val3) {
            showWinner(val1);
            return;
        }
    }

    if ([...buttons].every((box) => box.innerText !== "")) {
        message.innerText = "It's a DRAW!";
        message.classList.remove("hide");
    }
};

newbutton.addEventListener("click", () => {
    player1 = prompt("Enter Player 1 Name:");
    player2 = prompt("Enter Player 2 Name:");
    resetGame();
});
reset.addEventListener("click", resetGame);
