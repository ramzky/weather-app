import * as w from './weatherModule';
import * as sc from './screenController';
import './style.css';
//import rain from './rain.svg';
//temporary
//document.body.ondragstart = () => false;

const weatherModule = (function() {
  
}());

const screenController = (function() {
 
}());

async function controller() {
  //const w = weatherModule;
  //const sc = screenController;
  const dp = sc.displayObject();
  const paraPlace = document.querySelector('.place');
  const btnCel = document.querySelector('.cel');
  const btnFah = document.querySelector('fah');

  paraPlace.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      //fire off async...
      event.target.value === ''
        ? dp.updateDisplay(await w.weatherData())
        : dp.updateDisplay(await w.weatherData(event.target.value));
    }
  });
  dp.updateDisplay(await w.weatherData(paraPlace.value));

}
controller();