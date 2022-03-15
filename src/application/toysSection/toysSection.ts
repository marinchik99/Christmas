import * as noUiSlider from './slider/nouislider.min.js';
import './slider/nouislider.min.css';
import { target } from 'nouislider';
import Control from '../../control/control';
import toyPage from './toysSection.html';
import data, { IData } from '../data';

export default class ToysSection extends Control {
  isToyFav : string;

  rangeFilterCopy: target;

  rangeFilterYear: target;

  dropButton : HTMLElement;

  toyData: HTMLElement;

  //toyToTree : HTMLElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', 'toys-section');
    this.node.innerHTML = toyPage;
    this.rangeFilterCopy = document.getElementById('slider-copy');
    this.rangeFilterYear = document.getElementById('slider-year');
    this.dropButton = document.querySelector('.drop-filter');
    this.CreateToysSection(data);
    this.colorFilter();
    this.searhToy();
    this.formFilter();
    this.sizeFilter();
    this.onlyFavoriteFilter();
    this.dropFilters();
    // this.rangeFilter();
    this.SortFilter();
    this.makeFavorite();
  }
  

  private searhToy() {
    const closeSearch = document.querySelector('.close-search') as HTMLElement;
    const inputSearch = document.querySelector('.input-search') as HTMLInputElement;
    closeSearch.onclick = () => {
      inputSearch.value = '';
      data.filter((item, i) => {
        document.getElementsByClassName('toy-data')[i].classList.remove('regul');
      });
    };

    function TrimStr(s: string) {
      s = s.replace(/^\s+/g, '');
      return s.replace(/\s+$/g, '');
    }

    inputSearch.addEventListener('keyup', () => {
      const inputText = TrimStr(inputSearch.value);
      data.filter((item, i) => {
        const word = item.name.toLowerCase();
        const sum = document.getElementsByClassName('regul').length;
        if ((data.length - sum) === 0) {
          inputSearch.value = 'Извините, совпадений не обнаружено';
        }
        if (word.includes(inputText)) {
          document.getElementsByClassName('toy-data')[i].classList.remove('regul');
          return item;
        }
        document.getElementsByClassName('toy-data')[i].classList.add('regul');
      });
    });
  }

  private CreateToyCriterion(text: string, selector:HTMLElement) {
    const component = document.createElement('p');
    component.classList.add('toy-criterion');
    component.innerHTML = text;
    selector.append(component);
  }

  private CreateToysSection(data: IData[]) {
    data.forEach((item, i) => {
      this.toyData = document.createElement('div');
      this.toyData.classList.add('toy-data');
      document.querySelector('.toys-container').append(this.toyData);

      const toyTitle = document.createElement('h2');
      toyTitle.classList.add('toy-title');
      toyTitle.innerHTML = data[i].name;
      this.toyData.append(toyTitle);

      const toyInform = document.createElement('div');
      toyInform.classList.add('toy-inform');
      this.toyData.append(toyInform);

      const img = document.createElement('img');
      img.classList.add('toy-picture');
      img.src = `./assets/toys/${data[i].num}.png`;
      img.alt = `toys/${data[i].num}`;
      toyInform.append(img);

      const toyToTree = document.createElement('div');
      toyToTree.classList.add('toy-favorite');
      toyInform.append(toyToTree);

      const toyCriterions = document.createElement('div');
      toyCriterions.classList.add('toy-criterions');
      toyInform.append(toyCriterions);

      this.CreateToyCriterion(`Количество: ${data[i].count}`, toyCriterions);
      this.CreateToyCriterion(`Год покупки: ${data[i].year}`, toyCriterions);
      this.CreateToyCriterion(`Форма: ${data[i].shape}`, toyCriterions);
      this.CreateToyCriterion(`Цвет: ${data[i].color}`, toyCriterions);
      this.CreateToyCriterion(`Размер: ${data[i].size}`, toyCriterions);
      (!data[i].favorite) ? this.isToyFav = 'нет' : this.isToyFav = 'да';
      this.CreateToyCriterion(`Любимая: ${this.isToyFav}`, toyCriterions);
    });
  }

  private colorFilter() {
    const colorButton = document.querySelectorAll('.color-button');
    colorButton.forEach((item, i) => {
      colorButton[i].addEventListener('click', () => {
        colorButton[i].classList.toggle('active');
        data.forEach((item, j) => {
          if ((data[j].color !== 'белый' && colorButton[i].classList.contains('white'))
            || (data[j].color !== 'желтый' && colorButton[i].classList.contains('yellow'))
            || (data[j].color !== 'красный' && colorButton[i].classList.contains('red'))
            || (data[j].color !== 'синий' && colorButton[i].classList.contains('blue'))
            || (data[j].color !== 'зелёный' && colorButton[i].classList.contains('green'))) {
            (<HTMLElement>document.getElementsByClassName('toy-data')[j]).style.display = 'none';
          }
          if (!colorButton[i].classList.contains('active')) {
            (<HTMLElement>document.getElementsByClassName('toy-data')[j]).style.display = 'flex';
          }
        });
      });
    });
  }

  private formFilter() {
    const formButton = document.querySelectorAll('.form');
    for (let i = 0; i < formButton.length; i += 1) {
      formButton[i].addEventListener('click', () => {
        formButton[i].classList.toggle('active');
        data.forEach((item, j) => {
          if ((data[j].shape !== 'шар' && formButton[i].classList.contains('ball'))
            || (data[j].shape !== 'колокольчик' && formButton[i].classList.contains('bell'))
            || (data[j].shape !== 'шишка' && formButton[i].classList.contains('cone'))
            || (data[j].shape !== 'снежинка' && formButton[i].classList.contains('snow'))
            || (data[j].shape !== 'фигурка' && formButton[i].classList.contains('bear'))) {
            (<HTMLElement>document.getElementsByClassName('toy-data')[j]).style.display = 'none';
          }
          if (!formButton[i].classList.contains('active')) {
            (<HTMLElement>document.getElementsByClassName('toy-data')[j]).style.display = 'flex';
          }
        });
      });
    }
  }

  private sizeFilter() {
    const formSizeButton = document.querySelectorAll('.form-size');
    for (let i = 0; i < formSizeButton.length; i += 1) {
      formSizeButton[i].addEventListener('click', () => {
        formSizeButton[i].classList.toggle('active');
        data.forEach((item, j) => {
          if ((data[j].size !== 'большой' && formSizeButton[i].classList.contains('big'))
            || (data[j].size !== 'средний' && formSizeButton[i].classList.contains('middle'))
            || (data[j].size !== 'малый' && formSizeButton[i].classList.contains('small'))) {
            (<HTMLElement>document.getElementsByClassName('toy-data')[j]).style.display = 'none';
          }
          if (!formSizeButton[i].classList.contains('active')) {
            (<HTMLElement>document.getElementsByClassName('toy-data')[j]).style.display = 'flex';
          }
        });
      });
    }
  }

  private onlyFavoriteFilter() {
    const favoriteButton = document.querySelector('.favorite-button');
    favoriteButton.addEventListener('click', () => {
      favoriteButton.classList.toggle('active');
      data.forEach((item, i) => {
        if (data[i].favorite !== true) {
          (<HTMLElement>document.getElementsByClassName('toy-data')[i]).style.display = 'none';
        }
        if (!favoriteButton.classList.contains('active')) {
          (<HTMLElement>document.getElementsByClassName('toy-data')[i]).style.display = 'flex';
        }
      });
    });
  }

  private dropFilters() {
    const formButton = document.querySelectorAll('.form');
    const formSizeButton = document.querySelectorAll('.form-size');
    const colorButton = document.querySelectorAll('.color-button');
    const favoriteButton = document.querySelector('.favorite-button');

    this.dropButton.addEventListener('click', () => {
      data.forEach((item, j) => {
        (<HTMLElement>document.getElementsByClassName('toy-data')[j]).style.display = 'flex';
      });
      for (let i = 0; i < formButton.length; i += 1) {
        formButton[i].classList.remove('active');
      }
      for (let i = 0; i < formSizeButton.length; i += 1) {
        formSizeButton[i].classList.remove('active');
      }
      for (let i = 0; i < colorButton.length; i += 1) {
        colorButton[i].classList.remove('active');
      }
      favoriteButton.classList.remove('active');
    });
  }

  private createRangeFilter() {
    noUiSlider.create(this.rangeFilterCopy, {
      start: [1, 12],
      connect: true,
      step: 1,
      range: {
        min: [1],
        max: [12],
      },
    });

    noUiSlider.create(this.rangeFilterYear, {
      start: [1940, 2020],
      connect: true,
      step: 10,
      range: {
        min: [1940],
        max: [2020],
      },
    });
  }

  private rangeFilter() {
    this.createRangeFilter();
    const regulatorCopy = [document.querySelector('.now-copy'), document.querySelector('.max-copy')];
    const regulatorYear = [document.querySelector('.now-year'), document.querySelector('.max-year')];

    console.log(this.rangeFilterCopy.noUiSlider.get(true));

    this.rangeFilterCopy.noUiSlider.on('update', (values : (string | number)[], handle : number) => {
      regulatorCopy[handle].innerHTML = String(Math.round(Number(values[handle])));
      for (let j = 0; j < data.length; j += 1) {
        if (!(+data[j].count >= Math.round(+values[0]))
    || !(+data[j].count <= Math.round(+values[1]))) {
          document.getElementsByClassName('toy-data')[j].classList.add('regul');
        }
      }
      if (this.dropButton.click) {
        values[0] = String(1);
        values[1] = String(12);
      }
    });

    this.rangeFilterYear.noUiSlider.on('update', (values : (string | number)[], handle : number) => {
      regulatorYear[handle].innerHTML = String(Math.round(Number(values[handle])));
      for (let j = 0; j < data.length; j += 1) {
        if (!(+data[j].year >= Math.round(Number(values[0])))
    || !(+data[j].year <= Math.round(Number(values[1])))) {
          (<HTMLElement>document.getElementsByClassName('toy-data')[j]).style.display = 'none';
        }
      }
    });
  }

  private SortDirect(data: IData[]) {
    return data.sort((a, b) => (a.name).localeCompare(b.name));
  }
  
  private SortReverse(data: IData[]) {
    return data.sort((a, b) => (a.name).localeCompare(b.name)).reverse();
  }
  
  private SortUp(data: IData[]) {
    return data.sort((a, b) => Number(a.count) - Number(b.count));
  }
  private SortDown(data: IData[]) {
    return data.sort((a, b) => Number(b.count) - Number(a.count));
  }

  private typeFilter(val: string, method: IData[]) {
    const sortFilter = document.querySelector('#sort') as HTMLInputElement;
    const toysContainer = document.querySelector('.toys-container');
    const sum = document.getElementsByClassName('toy-data').length;
      if (sortFilter.value == val) {
        for (let j = 0; j < sum; j++) {
          toysContainer.firstChild.remove();
        }
        const filt = method;
        this.CreateToysSection(filt);
      }
  }

  private SortFilter() {
    const sortFilter = document.querySelector('#sort') as HTMLInputElement;
    sortFilter.addEventListener('click', () => {
      this.typeFilter('one', this.SortDirect(data));
      this.typeFilter('two', this.SortReverse(data));
      this.typeFilter('three', this.SortUp(data));
      this.typeFilter('four', this.SortDown(data));
    });
  }

  private makeFavorite(){      
      const toyToTree = document.querySelectorAll('.toy-favorite');
      toyToTree.forEach((item, i) => {
        toyToTree[i].addEventListener('click', () => {
          toyToTree[i].classList.toggle('active');
          this.toyData.classList.toggle('favPush');

          if (this.toyData.classList.contains('favPush')) {
            data[i].myfav = true;
          } else if (!this.toyData.classList.contains('favPush')) {
            data[i].myfav = false;
          }
          
          let sum = document.getElementsByClassName('active').length;
          if (sum > 20) {
            sum = 20;
            alert('Извините, все слоты заполнены');
            toyToTree[i].classList.remove('active');
          }
          document.querySelector('.fav-count').innerHTML = String(sum);
        })
      })

    //   function FiltFav(data) {
    //     return data.filter((item) => item.myfav === true);
    //   }

    //   const sumFavPush = document.getElementsByClassName('favPush').length;
    //   console.log(sumFavPush);

    //   if (!this.toyData.classList.contains('favPush')) {
    //     for (let j = 0; j < sumFavPush; j++) {
    //       toysVariant.firstChild.remove();
    //     }
    //   }
    //   const arr = FiltFav(data);
    //   CreateFavOnTreePage(arr);
      /*
      CreateFavOnTreePage(arr);
      console.log(arr)

      if (!toyData.classList.contains('favPush')){
          document.getElementsByClassName('fav-block')[i].style.display = 'none';
        } */
      // });
   
  }

}
