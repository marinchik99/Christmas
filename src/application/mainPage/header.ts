import Control from '../../control/control';
import header from './header.html';

export default class Header extends Control {
  toToys: Control<HTMLElement>;

  toTree: Control<HTMLElement>;

  private main = 'main';

  private toys = 'toToys';

  private tree = 'toTree';

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', 'header', '');
    this.node.innerHTML = header;
    this.node.querySelector('.toys').id = this.toys;
    this.node.querySelector('.tree').id = this.tree;
    this.node.querySelector('.header-tree').id = this.main;
  }
}
