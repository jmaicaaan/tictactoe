class BoardController {
  constructor($state, $stateParams) {
    "ngInject";
    this.name = 'board';
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
      debugger;
      if (this.hasAvailableBox()) {
        this.aiGetSelectedBox();  
      }
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
}

export default BoardController;
