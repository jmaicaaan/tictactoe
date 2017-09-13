class BoardController {
  constructor($state, $stateParams, $timeout) {
    "ngInject";
    this.name = 'board';
    this.$timeout = $timeout;
    this.boxes = [];
    this.clickedBoxes = [];
    this.totalNumberOfBox = 9;
    this.init();
  }

  init = () => {
    this.initializeBox();
  };

  initializeBox = () => {
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
        alert('Game is over. Will restart in a few seconds...');
        this.$timeout(() => {
          this.resetBoxes();
        }, 300);
      }
      this.checkWinner();
    } else {
      alert('Box cannot be clicked');
    }
  };

  aiGetSelectedBox = () => {
    let hasSelected = true;
    let aiSelectedBox;
    while (hasSelected) {
      let randomNumber = Math.floor(Math.random() * 10);
      let availableBoxes = this.boxes.filter((box) => {
        return !box.isClicked;
      });
      aiSelectedBox = availableBoxes.find((box) => {
        return box.boxNo === randomNumber;
      });
      if (aiSelectedBox) {
        aiSelectedBox.isAI = true;
        hasSelected = false;
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
    this.clickedBoxes = [];
    this.boxes = this.boxes.map((box) => {
      if (box.hasOwnProperty('isAI')) {
        delete box.isAI;
      }
      box.isClicked = false;
      return box;
    });
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
      if (this.checkForHorizontal(userSelectedBoxes) || this.checkForVertical(userSelectedBoxes)
        || this.checkForDiagonal(userSelectedBoxes)) {
        alert('You win!');
        this.resetBoxes();
        return;
      };
    }
    if (aiSelectedBoxes.length >= 3) {
      if (this.checkForHorizontal(aiSelectedBoxes) || this.checkForVertical(aiSelectedBoxes)
        || this.checkForDiagonal(aiSelectedBoxes)) {       
        alert('AI wins!');
        this.resetBoxes();
        return;
      };
    }
  };

  checkForHorizontal = (boxes) => {
    let patterns = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    return this.checkForWinner(patterns, boxes);
  };

  checkForVertical = (boxes) => {
    let patterns = [[1,4,7], [2,5,8], [3,6,9]];
    return this.checkForWinner(patterns, boxes);
  };

  checkForDiagonal = (boxes) => {
    let patterns = [[1,5,9], [3,5,7]];
    return this.checkForWinner(patterns, boxes);
  };

  checkForWinner = (patterns, boxes) => {
    if (!patterns || patterns.length <= 0) return;
    
    let boxCombination = [];
    let hasWinner = false;
    let boxNos = boxes.map((box) => {
      return box.boxNo;
    });
    // let patterns = [
    //   {
    //     horizontal: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    //   },
    //   {

    //   },
    //   {

    //   }
    // ]

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
    return hasWinner;
  };
}

export default BoardController;
