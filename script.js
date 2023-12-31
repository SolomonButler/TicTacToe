// Creating player object, with player symbols.
const players = (() => {
  let player = {
    playerTurn: true,
    playerSymbol: () => player.playerTurn ? '\u2715' : '○',
  };
  return{
    player,
  }
})();

// Creating choose player object.
const choosePlayer = (() => {
  let playerChoice = Array.from(document.querySelectorAll('.click'));

  let playerChoiceHandler = () => {
    playerChoice.forEach(choice => {
      choice.addEventListener('click', (e) => {
        e.target.dataset.symbol == 'X'?
        players.player.playerTurn = true:
        e.target.dataset.symbol == 'O'?
        players.player.playerTurn = false:
        '';
        domController.colorOChanger();
        domController.colorXChanger();
      });
    });
  };
  return{
    playerChoiceHandler,
  }
})()
choosePlayer.playerChoiceHandler();

// Creating win/loss/tie functions.
const gameController = (() => {
  let cellArrX = [];
  let cellArrO = [];
  let cells = Array.from(document.querySelectorAll('.gameGrid'));
  let winConditions = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9'],
    ['1','4','7'],
    ['2','5','8'],
    ['3','6','9'],
    ['1','5','9'],
    ['3','5','7'],
  ];

  let xWin = () => {
    cells.forEach(cell => {
      if(cell.dataset.symbol == 'X'){
        cellArrX.push(cell.dataset.cell);
      };
    });
    return winConditions.some(condition => {
      return condition.every(index => {
        return cellArrX.includes(index);
      });
    });
  }; 

  let oWin = () => {
    cells.forEach(cell => {
      if(cell.dataset.symbol == 'O'){
        cellArrO.push(cell.dataset.cell);
      };
    });
    return winConditions.some(condition => {
      return condition.every(index => {
        return cellArrO.includes(index);
      });
    });
  };
 
  let tieGame = () => {
    return [...cells].every(cell => {
      return cell.dataset.symbol !== '' && !oWin() && !xWin();
    })
  };

  let reset = () => {
    if (xWin() || oWin() || tieGame()){
      cells.forEach(cell => {
        cell.dataset.symbol = '';
        cell.textContent = '';
      });
      cellArrX = [];
      cellArrO = [];
    }
  };

  return {
    xWin,
    oWin,
    tieGame,
    reset,
    cells,
  };

})();

// Creating event functions for user functionality.
const playerController = (() => {

  let cellClick = () => {
    gameController.cells.forEach(cell => {
      cell.addEventListener('click', (e) => {
        if(e.target.dataset.symbol != ''){
          return;
        } else {
          players.player.playerTurn? e.target.dataset.symbol = 'X': e.target.dataset.symbol = 'O';
          e.target.textContent = players.player.playerSymbol();
          players.player.playerTurn = !players.player.playerTurn;
          gameController.xWin() ? domController.xWin() : '';
          gameController.oWin() ? domController.oWin() : '';
          gameController.tieGame() ? domController.tieGame() : '';
          domController.colorOChanger();
          domController.colorXChanger();
        };
      });
    });
  };

  return{
    cellClick,
  };

})();
playerController.cellClick()

// Creating functions to control dom on win/loss/tie.
const domController = (() => {

  let resetButton = document.querySelector('.restart');
  let winScreen = document.querySelector('.winScreen');
  let playerXScore = document.querySelector('.playerScoreX');
  let playerOScore = document.querySelector('.playerScoreO');
  let playerTurnX = Array.from(document.querySelectorAll('.playerTurnX'));
  let playerTurnO = Array.from(document.querySelectorAll('.playerTurnO'));

  let colorXChanger = () => {
    playerTurnX.forEach(turn => {
      players.player.playerTurn?
      turn.classList.remove('inactive'):
      turn.classList.add('inactive');
    });
  };

  let colorOChanger = () => {
    playerTurnO.forEach(turn => {
      players.player.playerTurn?
      turn.classList.add('inactive'):
      turn.classList.remove('inactive');
    });
  };

  let xWin = () => {
    winScreen.textContent = `Player \u2715 Wins!`;
    winScreen.classList.toggle('winScreenToggle');
    playerXScore.textContent ++;
    setTimeout(() => {
      gameController.reset();
      winScreen.classList.toggle('winScreenToggle');
    }, 2000);
  };
  let oWin = () => {
    winScreen.textContent = `Player O Wins!`;
    winScreen.classList.toggle('winScreenToggle');
    playerOScore.textContent ++;
    setTimeout(() => {
      gameController.reset();
      winScreen.classList.toggle('winScreenToggle');
    }, 2000);
  };
  let tieGame = () => {
    winScreen.textContent = `It's a Tie!`;
    winScreen.classList.toggle('winScreenToggle');
    setTimeout(() => {
      gameController.reset();
      winScreen.classList.toggle('winScreenToggle');
    }, 2000);
  };
  let reset = () => {
    resetButton.addEventListener('click', () => {
      gameController.reset();
      playerXScore.textContent = 0;
      playerOScore.textContent = 0;
    })
  }

  return{
    xWin,
    oWin,
    tieGame,
    reset,
    colorXChanger,
    colorOChanger,
  }
})();
domController.reset();
domController.colorXChanger();
domController.colorOChanger();