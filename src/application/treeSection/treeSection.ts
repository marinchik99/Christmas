import Control from '../../control/control';
import treePage from './treeSection.html';
import '../../style.css';
import data from '../data';

export default class TreeSection extends Control {
  audio : HTMLAudioElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', 'tree-section');
    this.node.innerHTML = treePage;
    this.soundOn();
    this.CreateTreeChoise();
    this.CreateBackChoise();
    this.CreateGarland();
    this.garlandOn();
    this.ChangeGarlandColor();
    this.CreateFavOnTreePage();
  }

  private soundOn() {
    this.audio = this.node.querySelector('.audio');
    document.querySelector('.volume').addEventListener('click', () : void => {
      if (this.audio.paused) {
        this.audio.play();
        (<HTMLElement>document.querySelector('.volume')).style.cssText = `background: url('../../assets/svg/mute.svg') no-repeat;
         background-size: 30px;`;
      } else {
        this.audio.pause();
        (<HTMLElement>document.querySelector('.volume')).style.cssText = `background: url('../../assets/svg/audio.svg') no-repeat;
         background-size: 30px;`;
      }
    });
  }

  private CreateComponent(compClassname: string, selector: string, imgClassname: string, src: string, alt:string) {
    const component = document.createElement('div');
    component.classList.add(compClassname);
    document.querySelector(selector).append(component);

    const img = document.createElement('img');
    img.classList.add(imgClassname);
    img.src = src;
    img.alt = alt;
    component.append(img);

    const count = document.getElementsByClassName(compClassname).length;
    for (let j = 0; j <= count; j += 1) {
      component.onclick = () => {
        if (component.classList.contains('tree-block')) {
          (<HTMLImageElement>document.querySelector('.tree-mainPicture')).src = `../../assets/tree/${j}.png`;
        } else {
          (<HTMLElement>document.querySelector('.tree-main')).style.cssText = `
          background: url('../../assets/bg/${j}.jpg') no-repeat;
          background-attachment: fixed;
          background-size: cover;`;
        }
      };
    }
  }

  private CreateTreeChoise() {
    for (let i = 1; i <= 6; i += 1) {
      this.CreateComponent('tree-block', '.tree-variant', 'tree-picture', `../../assets/tree/${i}.png`, `tree/${i}`);
    }
  }

  private CreateBackChoise() {
    for (let i = 1; i <= 10; i += 1) {
      this.CreateComponent('back-block', '.background-variant', 'back-picture', `../../assets/bg/${i}.jpg`, `bg/${i}`);
    }
  }

  private CreateGarland() {
    const garlandTree = document.querySelector('.garland-onTree');
    for (let i = 0; i <= 4; i += 1) {
      const garlandLine = document.createElement('ul');
      garlandLine.classList.add('lightsLine');
      garlandTree.append(garlandLine);

      (<HTMLElement>document.getElementsByClassName('lightsLine')[i]).style.cssText = `
        width: ${140 + i * 80}px;
        height:${140 + i * 80}px;`;

      for (let j = 0; j <= 5 + i; j += 1) {
        const OneLight = document.createElement('li');
        OneLight.classList.add('light');
        document.getElementsByClassName('lightsLine')[i].append(OneLight);
        (<HTMLElement>document.getElementsByClassName('lightsLine')[i].getElementsByClassName('light')[j]).style.transform = `
        rotate(${68 + j * 8 - i * 3}deg) translate(${50 + i * 50}px) rotate(-${68 + j * 8 - i * 3}deg)`;
      }
    }
  }

  private garlandOn() {
    const garlandOnOff = document.querySelector('.garlandOnOff-button');
    const garlandButton = document.querySelectorAll('.garland-button');
    garlandOnOff.addEventListener('click', () : void => {
      for (let i = 0; i < document.getElementsByClassName('light').length; i += 1) {
        garlandButton[i].classList.toggle('active');
        (<HTMLElement>document.getElementsByClassName('lightsLine')[i])
          .style.display = 'none';
        garlandOnOff.innerHTML = 'On';
        if (!garlandButton[i].classList.contains('active')) {
          (<HTMLElement>document.getElementsByClassName('lightsLine')[i])
            .style.display = 'flex';
          garlandOnOff.innerHTML = 'Off';
        }
      }
    });
  }

  private ChangeGarlandColor() {
    const garlandButton = document.querySelectorAll('.garland-button');
    for (let j = 0; j < garlandButton.length; j += 1) {
      garlandButton[j].addEventListener('click', () => {
        for (let i = 0; i < document.getElementsByClassName('light').length; i += 1) {
          document.getElementsByClassName('light')[i].classList.remove('blue');
          document.getElementsByClassName('light')[i].classList.remove('yellow');
          document.getElementsByClassName('light')[i].classList.remove('green');
          document.getElementsByClassName('light')[i].classList.remove('red');
          document.getElementsByClassName('light')[i].classList.remove('multi');
          if (garlandButton[j].classList.contains('multi')) {
            document.getElementsByClassName('light')[i].classList.add('multi');
          }
          if (garlandButton[j].classList.contains('red')) {
            document.getElementsByClassName('light')[i].classList.add('red');
          } else if (garlandButton[j].classList.contains('blue')) {
            document.getElementsByClassName('light')[i].classList.add('blue');
          } else if (garlandButton[j].classList.contains('yellow')) {
            document.getElementsByClassName('light')[i].classList.add('yellow');
          } else if (garlandButton[j].classList.contains('green')) {
            document.getElementsByClassName('light')[i].classList.add('green');
          }
        }
      });
    }
  }

  CreateFavOnTreePage() {
    data.forEach((item, i) => {
      const toysVariant = document.querySelector('.toys-variant');
    const favVar = document.createElement('div');
    favVar.classList.add('fav-block');
    toysVariant.append(favVar);

    const img = document.createElement('img');
    img.classList.add('fav-picture');
    img.src = `./assets/toys/${data[i].num}.png`;
    img.alt = `toys/${data[i].num}`;
    favVar.append(img);

    const countToy = document.createElement('p');
    countToy.classList.add('count-toy');
    countToy.innerHTML = `${data[i].count}`;
    favVar.append(countToy);
    })

  }
}
