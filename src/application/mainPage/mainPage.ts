import Control from '../../control/control';
import mainPage from './mainPage.html';

export default class MainPageSection extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', 'main-page');
    this.node.innerHTML = mainPage;
  }
}
