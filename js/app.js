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
let checkimg=[21,205,301]
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
  let leftIndex ;
  let rightIndex;
  let centerIndex;
do {
  leftIndex = randomNumber(0, imgArray.length - 1);
}while  ( leftIndex === checkimg[0] || leftIndex === checkimg[1] || leftIndex === checkimg[2]);
  do {
    rightIndex = randomNumber(0, imgArray.length - 1);
  } while( leftIndex === rightIndex || centerIndex === rightIndex || rightIndex === checkimg[0] || rightIndex === checkimg[1] || rightIndex === checkimg[2]);

  do {
    centerIndex = randomNumber(0, imgArray.length - 1);
  } while( leftIndex === centerIndex || centerIndex === rightIndex || centerIndex === checkimg[0] || centerIndex === checkimg[1] || centerIndex === checkimg[2]);
   console.log(leftIndex)
  rightImage.src = Images.all[rightIndex].src;
  leftImage.src = Images.all[leftIndex].src;
  centerImage.src = Images.all[centerIndex].src;

  rightCounter = rightIndex;
  centerCounter = centerIndex;
  leftCounter = leftIndex;

  Images.all[rightIndex].views++;
  Images.all[leftIndex].views++;
  Images.all[centerIndex].views++;

   checkimg[0] = leftIndex;
   checkimg[1] = rightIndex;
   checkimg[2] = centerIndex;
   console.log(checkimg);
   

}

function eventHandler(e) {
  if((e.target.id === 'rightImage' || e.target.id === 'centerImage'|| e.target.id === 'leftImage') && counter < trys ){

    if (e.target.id === 'rightImage') {
      Images.all[rightCounter].clicker++;
    }

    else if (e.target.id === 'centerImage') {
      Images.all[centerCounter].clicker++;
    }

    else if (e.target.id === 'leftImage'){
      Images.all[leftCounter].clicker++;
    }
    
    counter++;
    render();
  }
  else if (counter>=trys){
    drawChart();}
}

imageSection.addEventListener('click', eventHandler);


render();




function randomNumber( min, max ) {
  min = Math.ceil( min );
  max = Math.floor( max );

  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}


function dataView() {
  for (let i = 0; i < imgArray.length; i++) {
    let item = document.createElement('li');
    list.appendChild(item);
    item.textContent = `${Images.all[i].name} had ${Images.all[i].clicker} votes, and was seen ${Images.all[i].views} times.`;
   
  }
  
  view.removeEventListener('click', dataView);
}

view.addEventListener('click', dataView);


function drawChart() {

  let name = [];
  let view = [];
  let click=[];

  for(let i = 0; i < Images.all.length; i++) {
    name.push(Images.all[i].name);
    view.push(Images.all[i].views);
    click.push(Images.all[i].clicker);
  }

let ctx = document.getElementById( 'myChart' ).getContext( '2d' );

  let myChart = new Chart( ctx, {
    type: 'bar',
    data: {
      labels: name,
      datasets: [{
        label: '# of view',
        data: view,
        backgroundColor: ['rgb(119,136,153)'],
        borderColor: ['rgb(119,136,153)'],
          borderWidth: .5
      },
      {
        label: '# of clicks',
        data: click,
        backgroundColor: ['	rgb(112,128,144))'],
        borderColor: ['	rgb(112,128,144)'],
        borderWidth: .5
    }

        ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  } );

}



