import ToysSection from '../toysSection/toysSection';
import TreeSection from '../treeSection/treeSection';
import MainPageSection from '../mainPage/mainPage';

export default class Router {
  private defaultPath = 'main';

  path: string = this.defaultPath;

  private main = 'main';

  private toys = 'toToys';

  private tree = 'toTree';

  resolve(path?: string) {
    this.path = path || location.hash.split('/')?.pop() || this.defaultPath;
    let resolved;
    switch (path) {
      case this.main:
        resolved = MainPageSection;
        break;
      case this.toys:
        resolved = ToysSection;
        break;
      case this.tree:
        resolved = TreeSection;
        break;
      default:
        resolved = MainPageSection;
        break;
    }
    return resolved;
  }
}
