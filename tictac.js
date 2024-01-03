let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbutton");
let newgamebutton = document.querySelector("#newbutton");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winpatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],

]


const resetgame = () => {
    turnO = true;
    count = 0;
    enableboxes();
    msgcontainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click" , () => {
        if(turnO) {
            box.innerText = "O";
            turnO = false;
        }else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let iswinner = checkwinner();

        if (count === 9 && !iswinner){
            gamedraw();
        }
    });
});

const gamedraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgcontainer.classList.remove("hide");
    disableboxes();
};

const disableboxes= () => {
    for(let box of boxes){
        box.disabled = true;
    }

}

const enableboxes= () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }

}

const showwinner = (winner) => {
    msg.innerText = `Congrats, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
}

const checkwinner = () => {
    for(let patterns of winpatterns) {
        let pos0val = boxes[patterns[0]].innerText;
        let pos1val = boxes[patterns[1]].innerText;
        let pos2val = boxes[patterns[2]].innerText;

        if(pos0val != "" && pos1val != "" && pos2val != "") {
            if(pos0val === pos1val && pos1val === pos2val) {
                showwinner(pos0val);
                return true;
            }
        }
}
}

newgamebutton.addEventListener("click",resetgame);
resetbtn.addEventListener("click", resetgame);