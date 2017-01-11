(function($) {

  var playerX = false;
  var computerNextMove = 0;
  var firstMove = true;
   
  var turnCounter = 0;
  var currentBoard = [
    ' ', ' ', ' ',
    ' ', ' ', ' ',
    ' ', ' ', ' ',
  ];
 
  var positions = [
    "topLeft",
    "topMiddle",
    "topRight",
    "middleLeft",
    "middleMiddle",
    "middleRight",
    "bottomLeft",
    "bottomMiddle",
    "bottomRight"
  ];
  
  var $allPositions = $('#Board td');
  $allPositions.on('click', keyPress);
  var $choseXorO = $('#ChoseX, #ChoseO'); 
  $choseXorO.on('click', playerPick);  
  var $gameOver = $('#gameOver');  
  var $gameOverResult = $('#gameOverResult'); 
  var $closeGameOver = $('#closeGameOver');
  $closeGameOver.on('click', newGame);  
    
  $(document).ready(function(){
    newGame();
    });

  function newGame() {
    
    // This starts a new game. Initialize the board and display the modal that allows the 
    // User whether they would like to be X or O
        
    $allPositions.html(' ');
    for (var i = 0; i < currentBoard.length; i++) {
      currentBoard[i] = ' ';
      }
    turnCounter = 0;
    playerX = false;
    firstMove = true;
    $('#myModal').modal('show');
    }
 
    function keyPress() {
      
      // This gets called whenever the user chooses a place on the board. 
      // If they choose an unused space, display their play and then see if the
      // game is over. If not, allow the computer to take a turn.
      var place = positions.indexOf(event.target.id);
      console.log("I was clicked by "+event.target.id+" place = "+place);
      
      if ($(this).html() === ' ')
        {
          if (playerX) {
            currentBoard[place] = 'X';
            $(this).html("X");
           } 
          else {
            currentBoard[place] = 'O';
            $(this).html("O");
            }
        turnCounter++;  
         
        if (!checkGameStatus()) {
          // the player didn't win so let the computer take a turn   
          computerChoice();
        }
      }
    }
      
    function playerPick() {
    
      // This gets called by the modal that allows the user to pick X or O. If the user chooses
      // O, allow the computer to take a turn because X always goes first. 
      if ($(this).html() === 'X')
        {
          playerX = true;
        }
        else
        {
          playerX=false;
          computerChoice();
        }
    }

    function computerChoice() {

      // This gets called when it is the computer's turn to play. Right now, it just picks a random
      // Unoccupied square. It then checks to see if the game is over. 
      // var myChoice = computerPick();
            
      var myChoice = getComputerMove();
      var tempStr;
      
      turnCounter++;
      if (playerX) {
        currentBoard[myChoice] = 'O';
        tempStr = "#"+positions[myChoice];
        $(tempStr).html("O");
        } 
        else 
        {
        currentBoard[myChoice] = 'X';
        tempStr = "#"+positions[myChoice];
        $(tempStr).html("X");
        }
        
      checkGameStatus(); 
      }

  function computerPick() {
    
      var validChoice = false;
      var tryOne = 0;

      while (!validChoice) {
        tryOne = getRandomIntInclusive(0, 8);
        if (currentBoard[tryOne] === ' ') {
          validChoice = true;
        }
        return(tryOne);
      }      
    
  }
  
  function checkGameStatus() {
    
    // This gets called every time a turn is taken. It first checks to see if there 
    // are 3 in a row and then checks to see if it is a draw. Return value is true 
    // if the game is won and false if it is still ongoing. 
    var endGame = false;
    var i = 0;
    var wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
      ];
                
      while ((!endGame) && (i < wins.length)) {
        if (currentBoard[wins[i][0]] !== " ") {
        // if the first square of a win row is occupied, check to see if this row is a win
          if ((currentBoard[wins[i][0]] === currentBoard[wins[i][1]]) && (currentBoard[wins[i][1]] === currentBoard[wins[i][2]])) {
              // This is 3 in a row
              console.log("Three in a row!!!");
              endGame = true;
              $gameOverResult.html(currentBoard[wins[i][0]]+" Wins!");                                     $('#gameOver').modal('show');
              }
           }
          i++;
        }

      // if there is no Winner, check for a draw
      if (!endGame) {
        console.log ("This is not a 3 in a row, see if it is a draw");
        if (turnCounter == 9) {
          endGame = true;
          $gameOverResult.html("It's a tie!");                                                         
          $('#gameOver').modal('show');
          }
       }
          
     return (endGame);
     }
  
    function getRandomIntInclusive(min, max) {
      // Helper function that returns a random number between min & max 
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
      
      }

  function getComputerMove() {
    
    // If this is NOT the computer's first move run the minimax algorthim and let that decide the next move.
    // Otherwise, if the computer goes first take the upper left hand corner. If the user goes first and takes 
    // the middle, go in the corner. If the user takes the corner or the side, take the middle. 
    
    if (!firstMove) {
        var thisBoard = new possibleBoard("user", currentBoard, 0);
        thisBoard.consoleMe();
        var thisScore = miniMax(thisBoard);
        return computerNextMove;
    }
    else
    {
        firstMove = false;
        if (!playerX) // Computer is going first, it is the first move, just take the corner
       {
           computerNextMove = 0;
           return computerNextMove;
       }
       else // The user went first, it's the computers first turn
       {
         
         if ((currentBoard[0] == "X") || (currentBoard[2] == "X") ||
               (currentBoard[6] == "X") || (currentBoard[6] == "X")) 
           { // The user took a corner so computer takes the middle
               computerNextMove = 4;
               return computerNextMove;
           } 
           else
          { // The user took a side or center, computer takes the corner
             computerNextMove = 0;
             return computerNextMove;
          }  
      }  
      
    }
    
  }
  
  function miniMax(boardGame) {
    
    boardGame.consoleMe();
       
    // First score this game. If it has a winning or losing score, return with that score
    var score = boardGame.scoreGame();
    //console.log("Scored game at top of minimax, it is "+score);
    if (score !== 0) {
      //console.log("Returning from minimax!");
      return score;
    }
        
    // The current board is inconclusive, so make an array of all possible moves 
    var scoreIndex = 0;
    var returnScore = 0;
    var scores = [];
    var moves = [];
    var result = 0;
    var boardGameIndex = 0;
    
    //console.log("Creating child boards");
    for (boardGameIndex = 0; boardGameIndex < 9; boardGameIndex++)
      {
       
         if (boardGame.game[boardGameIndex] == " ")
          {
            //console.log("boardGameIndex = "+boardGameIndex+" boardGame[boardGameIndex] = "+boardGame.game[boardGameIndex]);
 
           if (boardGame.player === "user") {  
            //console.log("Player is user, making board for computer. ");
            thisBoard = new possibleBoard("computer", boardGame.game, boardGame.depth+1);
            }
            else
            {
              //console.log("Player is computer, making board for user");
              thisBoard = new possibleBoard("user", boardGame.game, boardGame.depth+1);
            }
          thisBoard.setMove(boardGameIndex);
          //console.log("Going to recurse with board:");
          //thisBoard.consoleMe();
          result = miniMax(thisBoard);  
                        
            //result = thisBoard.scoreGame();
          //console.log("Pushing "+result+ "onto scores array, "+boardGameIndex+" onto moves array");  
          scores.push(result);
          moves.push(boardGameIndex);      
          }
        }
    
    //console.log("done creating child boards and populating scores and moves");
    //console.log("Scores = "+scores);
    //console.log("Moves = "+moves);
    
    if (scores.length === 0) {
       return 0;
    }
    
    if (boardGame.player == "user")
      {
        // go through the score array and find the highest to find the best score
        scoreIndex = 0;
        returnScore = -10;
        while (scoreIndex < scores.length)
          {
            if (scores[scoreIndex] > returnScore)
              {
                returnScore = scores[scoreIndex];
                computerNextMove = moves[scoreIndex]; 
              }
           scoreIndex++; 
        
          }  
      }
    else
      {
      scoreIndex = 0;
        returnScore = 10;
        while (scoreIndex < scores.length)
          {
            if (scores[scoreIndex] < returnScore)
              {
                returnScore = scores[scoreIndex];
                computerNextMove = moves[scoreIndex]; 
              }
           scoreIndex++; 
        
          }  
                
      }
    
    //console.log("Returning from minimax with score = "+returnScore);
    //console.log("computerNextMove = "+computerNextMove);
    return returnScore;
    
  }
    
  function possibleBoard(argPlayer,argGame, argDepth) {
    
    // Player is either "computer" or "user"
    this.player = argPlayer;
    this.game = argGame.slice();
    this.depth = argDepth;
    
    if (this.player == "user") {
      if (playerX) 
        {
         this.XorO = "X";
        }
      else
        {
          this.XorO = "O";
        }
    }
    else {
      if (playerX) 
        {
         this.XorO = "O";
        }
      else
        {
          this.XorO = "X";
        }
    }
      
    this.consoleMe = function() {
      
      console.log("This board is for "+this.player+" who is playing as "+this.XorO);
      console.log(this.game);
      };
    
    this.setMove = function(arg) {
      
      if (this.XorO == "X")
        {
        this.game[arg] = 'X';
          }
        else 
          {
          this.game[arg] = 'O';
          }
          
    };
  
    this.threeInaRow = function() {
      // Given the array board passed to this function,
      // for this player (who is X or O), tell me if they won
      var i = 0;
      var result = " ";
      var wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
        ];
      
      
      while (i < wins.length) {
      
        if (this.game[wins[i][0]] != ' ') {
          // if the first square of a win row is occupied, check to see if this row is a win
          if ((this.game[wins[i][0]] === this.game[wins[i][1]]) && (this.game[wins[i][1]] === this.game[wins[i][2]])) {
              // This is 3 in a row
              //console.log("Three in a row!!!");
              result = this.game[wins[i][0]];
              }
           }
          i++;
        }
    
    return result;
    };
      
    this.scoreGame = function(){
           
      var retScore = 0;
      var retCode = this.threeInaRow();
      
      if (retCode === " ") { // neither x nor o won
        retScore = 0;
        //console.log ("Returning from scoregame with "+retScore);
        return retScore;
      }
      
      if (retCode === "X") { // X got a 3 in a row
        if (this.player === "computer") {
          if (this.XorO === "X") {
            retScore = 10;
          }
          else {
            retScore = -10;
          }
        }
        else // this.player === "user"
        {
          if (this.XorO === "X") {
            retScore = -10;
          }
          else {
            retScore = 10;
          }
            
        }
        
      }
      else // "o" got three in a row
      {
         if (this.player === "computer") {
          if (this.XorO === "X") {
            retScore = -10;
          }
          else {
            retScore = 10;
          }
        }
        else // this.player === "user"
        {
          if (this.XorO === "X") {
            retScore = 10;
          }
          else {
            retScore = -10;
          }
            
        } 
      }
      
    return retScore; 
    };
  }
  
}(jQuery));