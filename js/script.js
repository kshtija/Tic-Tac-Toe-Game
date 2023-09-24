// tic tac toe game 
let boxes = document.querySelectorAll(".box");

let turn = "X";
let isGameOver = false;

let xAudio = document.querySelector("#x-audio");
let oAudio = document.querySelector("#o-audio");

boxes.forEach(e =>{
    e.innerHTML = ""
    e.addEventListener("click", ()=>{
        if(!isGameOver && e.innerHTML === ""){
            e.innerHTML = turn;
            playSoundForTurn(turn);
            cheakWin();
            cheakDraw();
            changeTurn();
        }
    })
})

function changeTurn(){
    if(turn === "X"){
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    }
    else{
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

function cheakWin(){
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    for(let i = 0; i<winConditions.length; i++){
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if(v0 != "" && v0 === v1 && v0 === v2){
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " win";
            document.querySelector("#winning-gif").style.display = "block";
            document.querySelector("#play-again").style.display = "inline"

            // Play the winning audio
            let winningAudio = document.querySelector("#winning-audio");
            winningAudio.play();

            for(j = 0; j<3; j++){
                boxes[winConditions[i][j]].style.backgroundColor = "#d9c408"
                boxes[winConditions[i][j]].style.color = "#000"
            }
        }
    }
}

function cheakDraw(){
    if(!isGameOver){
        let isDraw = true;
        boxes.forEach(e =>{
            if(e.innerHTML === "") isDraw = false;
        })

        if(isDraw){
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline"
        }
    }
}

function playSoundForTurn(turn) {
    if (turn === "X") {
        xAudio.play();
    } else {
        oAudio.play();
    }
}

document.querySelector("#play-again").addEventListener("click", ()=>{
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";
    document.querySelector("#winning-gif").style.display = "none";

    // Pause the winning audio and reset its playback position
    let winningAudio = document.querySelector("#winning-audio");
    winningAudio.pause();
    winningAudio.currentTime = 0;

    boxes.forEach(e =>{
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    })
})