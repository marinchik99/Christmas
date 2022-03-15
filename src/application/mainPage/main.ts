import Control from '../../control/control';
import Router from '../router/routing';

export default class Main extends Control {
  router: Router = new Router();

  section: Control<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'main', 'main', '');
  }

  call() {
    this.section = new (this.router.resolve())(this.node);
    this.navigateApp();
  }

  private resolvePaths(path: string) {
    const newSection = this.router.resolve(path);
    if (this.section instanceof newSection && !this.section.isReloadRequired) {
      return;
    }
    this.section.destroy();
    this.section = new newSection(this.node);
  }

  private navigateApp() {
    window.onpopstate = () => {
      this.resolvePaths(location.hash.split('/')?.pop());
    };
  }
}
