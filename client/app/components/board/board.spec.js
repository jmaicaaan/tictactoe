import BoardModule from './board';
import BoardController from './board.controller';
import BoardComponent from './board.component';
import BoardTemplate from './board.html';

describe('Board', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BoardModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BoardController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(BoardTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = BoardComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(BoardTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(BoardController);
    });
  });
});
