let buttons = document.querySelectorAll(".box");
let reset = document.querySelector("#clear");
let newbutton = document.querySelector("#new");
let message = document.querySelector(".champion");

let player1 = prompt("Enter Player 1 Name:") || "Player 1";
let player2 = prompt("Enter Player 2 Name:") || "Player 2";

let playerChance = true;
const winner = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6], 
];

const resetGame = () => {
    playerChance = true;
    enableBoxes();
    document.querySelector("#win").innerText = ""; 
    message.classList.add("hide");
};

buttons.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; 

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
    document.querySelector("#win").innerText = `Congratulations, ${winnerName} won!`;
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
        document.querySelector("#win").innerText = "It's a DRAW!";
        message.classList.remove("hide");
        disableBoxes();
    }
};

newbutton.addEventListener("click", () => {
    player1 = prompt("Enter Player 1 Name:") || "Player 1";
    player2 = prompt("Enter Player 2 Name:") || "Player 2";
    resetGame();
});
reset.addEventListener("click", resetGame);
