const player = (type, name, marker) => {
    let playerType = type;
    let playerName = name;
    let playerMarker = marker;
    let wins = 0;
    let losses = 0;
    let turnTally = 0;
    let gameScore;

    return {playerType, playerName, playerMarker, 
        wins, losses, turnTally, gameScore};
}

const playerArray = (player1, player2) => {
    let playerArray = [player1, player2];
    return {playerArray};
}

// const gameScore = (round, winner, loser) => {
//     let gameRound = round;
//     let gameWinner = winner;
//     let gameLoser = loser;
//     return {gameRound, gameWinner, gameLoser};
// }

const player1 = player(1, 'Player 1', 'X');
const player2 = player(2, 'Player 2', '0');
const players = playerArray(player1, player2);

console.log(players.playerArray);

const gameController = () => {
    console.log('running gamecontroller')
    let playsArray = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    let playerTurn = 1;
    let gameOver = false;
    

    const updateBoard = () => {
        index = 0;
        console.log("running updateBoard");
        playsArray.forEach(marker => {
            let div = document.querySelector(`[data-index = '${index}']`);
            div.textContent = marker;
            index++;
            });
        };

    const placeMarker = (e) => {
        console.log("running place marker");
        addToArray(e);
        updateBoard();
        checkTurnCounter();
        switchPlayer();
    }

    const checkTurnCounter = () => {
        console.log("checking turn counter!")
        let thePlayer = getPlayer();
        console.log("Turn tally is: " + thePlayer.turnTally)
        if (thePlayer.turnTally >= 2){
            console.log(thePlayer.playerName + " is making their 3rd move or later!")
            checkForWin();
        }
    }

    const checkForWin = () => {
        let winningMarker;
        console.log("checking for win!")
        winsArray.forEach(array => {
            let spaceIndex1 = array[0];
            let spaceIndex2 = array[1];
            let spaceIndex3 = array[2];
            let marker1 = document.querySelector(`[data-index = '${spaceIndex1}']`);
            let marker2 = document.querySelector(`[data-index = '${spaceIndex2}']`);
            let marker3 = document.querySelector(`[data-index = '${spaceIndex3}']`);
            console.log("spot 1 is: " + spaceIndex1 + ":" + marker1.textContent);
            console.log("spot 2 is: " + spaceIndex2 + ":" + marker2.textContent);
            console.log("spot 3 is: " + spaceIndex3 + ":" + marker3.textContent);
            if((marker1.textContent != ' ') && (marker2.textContent != ' ') && (marker3.textContent != ' ')){
                if ((marker1.textContent === marker2.textContent) && (marker2.textContent === marker3.textContent)){
                    gameOver = true;
                    console.log("they all match!"); 
                    winningMarker = marker1.textContent;
                    console.log("winning marker is: " + winningMarker);  
                }
            }
            
        });

        if(gameOver) {
            console.log("game over!")
            let message = "We have a winner!"
            let messageBoard = document.getElementsByClassName('message-board');
            console.log(messageBoard[0])
            console.log(message)
            messageBoard[0].textContent = message;
            endGame(winningMarker);
        }

    }

    const getPlayer = () => {
        let thePlayer = 0;
        players.playerArray.forEach(player => {
            if (playerTurn === player.playerType){  
                thePlayer = player;
            };
        })
        return thePlayer;
    }

    const getPlayerByType = (num) => {
        let thePlayer;
        players.playerArray.forEach(player => {
            if (num === player.playerType){  
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
        playsArray[boardSpaceIndex] = marker;
        turn.turnTally++;
        console.log("the turn tally is now: " + turn.turnTally)
    }

    const switchPlayer = () => {
        if(gameOver){
            return
        }
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
        divs.forEach(div => div.addEventListener('click', checkAvailability));
        
        const nextGame = document.getElementById('next-game'); 
        console.log(nextGame)
        nextGame.addEventListener('click', startGame);

        const resetGame = document.getElementById('reset'); 
        console.log(resetGame)
        resetGame.addEventListener('click', gameReset);

    }

    const gameReset = () => {
        console.log("reseting!")
        gameOver = true;
        startGame();
    }

    const removeListeners = () => {
        const divs = document.querySelectorAll('.cell'); 
        console.log()
        divs.forEach(div => div.removeEventListener('click', checkAvailability));
    }
    const checkAvailability = (e) => {
        if (e.target.textContent === ' '){
            placeMarker(e);
        }
        else {
        let message = "Please choose an available space."
        let messageBoard = document.getElementsByClassName('message-board');
        messageBoard[0].textContent = message;
        }
    }
    
    const startGame = () => {
        console.log("starting game")
        runGame.addListeners();
        gameOver = false;
        playsArray = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        const gameScore = (1, null, null);
        updateBoard();
    }

    const endGame = (winner) => {
        logScore(winner);
        removeListeners();

    }

    const logScore = (theWinner) => {
        let gameWinner;
        let gameLoser;
        players.playerArray.forEach(player => {
            if (theWinner === player.playerMarker){  
                gameWinner = player;
            }
            else {
                gameLoser = player;
            }
        })
        
        gameWinner.wins++;
        gameWinner.gameScore = 'W';
        gameLoser.losses++;
        gameLoser.gameScore = 'L';
        console.log(gameWinner.wins);
        let firstPlayer = getPlayerByType(1);
        let secondPlayer = getPlayerByType(2);
        updateScoreBoard(firstPlayer, secondPlayer);
    }

    const updateScoreBoard = (player1, player2) => {
        let score = document.getElementById('score');
        let roundRow = document.createElement('tr');
        score.appendChild(roundRow);
        let player1Score = document.createElement('td');
        let player2Score = document.createElement('td');
        roundRow.appendChild(player1Score);
        roundRow.appendChild(player2Score);
        player1Score.textContent = player1.gameScore;
        player2Score.textContent = player2.gameScore;
        let player1Total = document.getElementById('player1-total');
        let player2Total = document.getElementById('plaery2-total');
        player1Total.textContent = player1.wins;
        player2Total.textContent = player2.wins;

    }

    return {updateBoard, placeMarker, addListeners, startGame};
    
};

const defineWinsArrays = () => {
    let h1 = [0, 1, 2];
    let h2 = [3, 4, 5];
    let h3 = [6, 7, 8];

    let v1 = [0, 3, 6];
    let v2 = [1, 4, 7];
    let v3 = [2, 5, 8];

    let d1 = [0, 4, 8];
    let d2 = [6, 4, 2];

    return {h1, h2, h3, v1, v2, v3, d1, d2};
}

const winsArrayObject = defineWinsArrays();
const winsArray = [winsArrayObject.h1, winsArrayObject.h2, 
    winsArrayObject.h3, winsArrayObject.v1,
    winsArrayObject.v2, winsArrayObject.v3,
    winsArrayObject.d1, winsArrayObject.d2];

const runGame = gameController();
let startBtn = document.getElementsByClassName('initiate');
console.log(startBtn[0])
startBtn[0].addEventListener('click', runGame.startGame);


// runGame.updateBoard();
// runGame.addListeners();