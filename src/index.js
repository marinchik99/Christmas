import data from './js/data.ts';
import './js/valueFilters.ts';
import './js/rangeFilters.ts';
import './js/treeSection.ts';

const toysContainer = document.querySelector('.toys-container');
const toysVariant = document.querySelector('.toys-variant');

const sortFilter = document.querySelector('#sort');

function CreateToysSection(data) {
  for (let i = 0; i < data.length; i += 1) {

    let sum = document.getElementsByClassName('active').length;

    if (sum == 0 && i < 20) {
      toyData.classList.toggle('favPushStart');
      CreateFavOnTreePage();
    }

    const sumFavStart = document.getElementsByClassName('favPushStart').length;
    if (sum > 0) {
      for (let x = 0; x < sumFavStart; x++) {
        document.getElementsByClassName('fav-block')[i].style.display = 'none';
      }
    }

    function CreateFavOnTreePage() {
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
    }

    fav.addEventListener('click', () => {
      fav.classList.toggle('active');
      toyData.classList.toggle('favPush');

      sum = document.getElementsByClassName('active').length;
      if (sum > 20) {
        sum = 20;
        alert('Извините, все слоты заполнены');
        fav.classList.remove('active');
      }
      document.querySelector('.fav-count').innerHTML = String(sum);

      if (toyData.classList.contains('favPush')) {
        data[i].myfav = true;
      } else if (!toyData.classList.contains('favPush')) {
        data[i].myfav = false;
      }

      function FiltFav(data) {
        return data.filter((item) => item.myfav === true);
      }

      const sumFavPush = document.getElementsByClassName('favPush').length;
      console.log(sumFavPush);

      if (!toyData.classList.contains('favPush')) {
        for (let j = 0; j < sumFavPush; j++) {
          toysVariant.firstChild.remove();
        }
      }
      const arr = FiltFav(data);
      CreateFavOnTreePage(arr);
      /*
      CreateFavOnTreePage(arr);
      console.log(arr)

      if (!toyData.classList.contains('favPush')){
          document.getElementsByClassName('fav-block')[i].style.display = 'none';
        } */
    });
  }
}

CreateToysSection(data);


