class BoardController {
  constructor($state, $stateParams, $timeout) {
    "ngInject";
    this.name = 'board';
    this.$timeout = $timeout;
    this.boxes = [];
    this.clickedBoxes = [];
    this.totalNumberOfBox = 9;
    this.tokens = {
      user: '',
      ai: ''
    };
    this.init();
  }

  init = () => {
    this.initializeBox();
    this.askForSelectedToken();
  };

  initializeBox = () => {
    if (this.boxes.length === this.totalNumberOfBox) return;
    for (let i = 1; i <= this.totalNumberOfBox; i++) {
      this.boxes.push({
        boxNo: i,
        isClicked: false
      });
    }
  };

  onUserClickBox = (userSelectedBox) => {
    if (!userSelectedBox) return;
    if (this.isSelectedBoxAvailable(userSelectedBox)) {
      this.addSeletedBox(userSelectedBox);
      if (this.hasAvailableBox()) {
        this.aiGetSelectedBox();
      } else {
        this.resetBoxes();
      }
      this.checkWinner();
    }
  };

  aiGetSelectedBox = () => {
    let hasNotSelected = true;
    let aiSelectedBox;
    while (hasNotSelected) {
      let randomNumber = Math.floor(Math.random() * 10);
      let availableBoxes = this.boxes.filter((box) => {
        return !box.isClicked;
      });
      aiSelectedBox = availableBoxes.find((box) => {
        return box.boxNo === randomNumber;
      });
      if (aiSelectedBox) {
        aiSelectedBox.isAI = true;
        hasNotSelected = false;
      }
    }
    this.addSeletedBox(aiSelectedBox);
  };

  isSelectedBoxAvailable = (box) => {
    return this.hasAvailableBox() && !box.isClicked;
  };

  addSeletedBox = (box) => {
    box.isClicked = true;
    this.clickedBoxes.push(box);
  };

  hasAvailableBox = () => {
    return this.clickedBoxes.length < this.totalNumberOfBox;
  };

  resetBoxes = () => {
    alert('Game is over. Will restart in a few seconds...');
    this.$timeout(() => {
      this.clickedBoxes = [];
      this.boxes = this.boxes.map((box) => {
        if (box.hasOwnProperty('isAI')) {
          delete box.isAI;
        }
        box.isClicked = false;
        return box;
      });
      this.init();
    }, 300);
  };

  getSelectedBoxes = (filter) => {
    return this.boxes.filter((box) => {
      return box.isClicked;
    });
  };

  checkWinner = () => {
    let selectedBoxes = this.getSelectedBoxes();
    let userSelectedBoxes = selectedBoxes.filter((box) => {
      return !box.isAI;
    });
    let aiSelectedBoxes = selectedBoxes.filter((box) => {
      return box.isAI;
    });
    if (userSelectedBoxes.length >= 3) {
      if (this.checkForWinner(userSelectedBoxes)) {
        alert('You win!');
        this.resetBoxes();
        return;
      };
    }
    if (aiSelectedBoxes.length >= 3) {
      if (this.checkForWinner(aiSelectedBoxes)) {
        alert('AI wins!');
        this.resetBoxes();
        return;
      };
    }
  };

  checkForWinner = (boxes) => {
    let boxCombination = [];
    let hasWinner = false;
    let boxNos = boxes.map((box) => {
      return box.boxNo;
    });
    let combinations = [
      [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
      [[1, 5, 9], [3, 5, 7]]
    ];
    combinations.forEach((patterns) => {
      patterns.forEach((pattern) => {
        if (!hasWinner) {
          boxCombination = boxNos.filter((value, key, array) => {
            if (pattern.indexOf(value) > -1) {
              return value;
            }
          });
        }
        if (boxCombination.length === 3) {
          hasWinner = true;
        }
      });
    });
    return hasWinner;
  };

  askForSelectedToken = () => {
    let _confirm = confirm('Do you want to play as player X?');
    if (!_confirm) {
      this.tokens.ai = 'X';
      this.tokens.user = 'O';
      this.aiGetSelectedBox();
    } else {
      this.tokens.ai = 'O';
      this.tokens.user = 'X';
    }
  };

  displayToken = (box) => {
    if (box.isClicked) {
      if (box.isAI) {
        return this.tokens.ai;
      } else {
        return this.tokens.user;
      }
    }
  };
}

export default BoardController;
