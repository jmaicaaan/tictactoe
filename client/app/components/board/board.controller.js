class BoardController {
  constructor($state, $stateParams) {
    "ngInject";
    this.name = 'board';
    this.boxes = [];
    this.init();
  }

  init = () => {
    this.initializeBox()
  };

  initializeBox = () => {
    let len = 9;
    for (let i = 1; i <= len; i++) {
      this.boxes.push(i);
    }
  };
}

export default BoardController;
