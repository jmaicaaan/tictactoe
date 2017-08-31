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

  onBoxClick = (box) => {
    if (!box) return;
    if (this.clickedBoxes.length <= this.totalNumberOfBox && !box.isClicked) {
      box.isClicked = true;
      this.clickedBoxes.push(box);
    } else {
      alert('Box cannot be clicked');
    }
  };
}

export default BoardController;
