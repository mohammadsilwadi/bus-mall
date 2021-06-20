'use strict';

let imgArray = [
  'bag.jpg','banana.jpg',
  'bathroom.jpg','boots.jpg',
  'breakfast.jpg','bubblegum.jpg',
  'chair.jpg','cthulhu.jpg',
  'dog-duck.jpg','dragon.jpg',
  'pen.jpg','pet-sweep.jpg',
  'scissors.jpg','shark.jpg',
  'sweep.png','tauntaun.jpg',
  'unicorn.jpg','usb.gif',
  'water-can.jpg','wine-glass.jpg'];

let imageSection = document.getElementById('imageSection');
let rightImage = document.getElementById( 'rightImage' );
let centerImage = document.getElementById( 'centerImage' );
let leftImage = document.getElementById( 'leftImage' );
let list = document.getElementById('list');
let view = document.getElementById('view');

let counter = 0;
let trys=25;
let rightCounter = 0;
let centerCounter = 0;
let leftCounter = 0;

function Images ( name,src ) {
  this.name = name;
  this.src = `./img/${src}`;
  this.views = 0;
  this.clicker = 0;
  Images.all.push(this);
}
Images.all = [];

for( let i = 0; i < imgArray.length; i++ ) {
  // console.log(imgArray[i].split( '.' ));
  new Images( imgArray[i].split( '.' )[0], imgArray[i] );
}
function render() {
  let leftIndex = randomNumber(0, imgArray.length - 1);
  let rightIndex;
  let centerIndex;

  do {
    rightIndex = randomNumber(0, imgArray.length - 1);
  } while( leftIndex === rightIndex || centerIndex === rightIndex );

  do {
    centerIndex = randomNumber(0, imgArray.length - 1);
  } while( leftIndex === centerIndex || centerIndex === rightIndex );

  rightImage.src = Images.all[rightIndex].src;
  leftImage.src = Images.all[leftIndex].src;
  centerImage.src = Images.all[centerIndex].src;

  Images.all[rightIndex].views++;
  Images.all[leftIndex].views++;
  Images.all[centerIndex].views++;

}

function eventHandler(e) {
  if((e.target.id === 'rightImage' || e.target.id === 'centerImage'|| e.target.id === 'leftImage') && counter < trys ){

    if (e.target.id === 'rightImage') {

      Images.all[rightCounter].clicker++;
    }

    else if (e.target.id === 'centerImage') {

      Images.all[centerCounter].clicker++;
    }

    else {
      Images.all[leftCounter].clicker++;
    }
    counter++;
    render();
  }
}

imageSection.addEventListener('click', eventHandler);


render();




function randomNumber( min, max ) {
  min = Math.ceil( min );
  max = Math.floor( max );

  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}




view.addEventListener('click', function dataView() {
  for (let i = 0; i < imgArray.length; i++) {
    let item = document.createElement('li');
    list.appendChild(item);
    item.textContent = `${Images.all[i].name.split('.')[0]} had ${Images.all[i].clicker} votes, and was seen ${Images.all[i].views} times.`;
  }
});




