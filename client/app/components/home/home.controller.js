class HomeController {
  constructor($state) {
    "ngInject";
    this.text = 'Hola Amigo';
    this.$state = $state;
    this.init();
  };
  
  init = () => {
    this.$state.go('board');
  };
}

export default HomeController;
