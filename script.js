const player = (type, name, marker) => {
    let playerType = type;
    let playerName = name;
    let playerMarker = marker;
    let wins = 0;
    let losses = 0;
    let turnTally = 0;

    return {playerType, playerName, playerMarker, 
        wins, losses, turnTally};
}

const playerArray = (player1, player2) => {
    let playerArray = [player1, player2];
    return {playerArray};
}

const player1 = player(1, 'Player 1', 'X');
const player2 = player(2, 'Player 2', '0');
const players = playerArray(player1, player2);

console.log(players.playerArray);


// const gameBoard = () => {
//     console.log('running gameboard')
//     let playsArray = ['', '', '', '', '', '', '', '', ''];
//     return {playsArray};
// };

const gameController = () => {
    console.log('running gamecontroller')
    let playsArray = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    let playerTurn = 1;
    

    const updateBoard = () => {
        index = 0;
        console.log("running updateBoard");
        // let markers = playsArray;
        // markers = Object.keys(markers);
        // console.log(markers);
        // console.log(typeof markers);
        playsArray.forEach(marker => {
            // console.log(marker)
            console.log(index)
            let div = document.querySelector(`[data-index = '${index}']`);
            console.log("the div is: " + div)
            console.log("marking" + index + " " + marker)
            div.textContent = marker;
            index++;
            });
        };

    const getPlayer = () => {
        let thePlayer = 0;
        players.playerArray.forEach(player => {
            if (playerTurn === player.playerType){  
                thePlayer = player;
            };
        })
        return thePlayer;
    }

    const addToArray = (e) => {
        console.log("running addToArray")
        let boardSpace = e.target;
        let boardSpaceIndex = boardSpace.getAttribute('data-index');
        console.log(boardSpace, boardSpaceIndex);
        boardSpaceIndex = Number(boardSpaceIndex);
        let turn = getPlayer();
        let marker = turn.playerMarker;
        console.log("marker to add to array is: " + marker);
        // let anArray = gameBoard();
        // console.log(anArray);
        // anArray = anArray.playsArray;
        // console.log(anArray.playsArray);
        playsArray[boardSpaceIndex] = marker;
    }

    const switchPlayer = () => {
        if(playerTurn === 1){
            playerTurn = 2;
        }
        else{
            playerTurn = 1;
        }

        let player = getPlayer();
        let message = "It is now " + player.playerName + "'s turn."
        let messageBoard = document.getElementsByClassName('message-board');
        messageBoard[0].textContent = message;
    }

    const addListeners = () => {
        const divs = document.querySelectorAll('.cell'); 
        console.log()
        divs.forEach(div => div.addEventListener('click', placeMarker));
    }

    const placeMarker = (e) => {
        console.log("running place marker")
        //checkIfAvailable
        //checkTurnCounter
        addToArray(e);
        updateBoard();
        switchPlayer();
    }

    return {updateBoard, placeMarker, addListeners};
    
};

const runGame = gameController();
// runGame.updateBoard();
runGame.addListeners();