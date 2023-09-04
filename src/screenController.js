import rain from './rain.svg';
import sun from './sunny.svg';
import cloudy from './partially-sunny.svg';
import overcast from './cloudy.svg';
import snow from './snow.svg';
import umbrella from './umbrella.svg';

//implement per app
function stateObj(weatherObjHour) {
  const RAIN = 'rain'
  const SUN = 'sun';
  const CLOUDY = 'cloudy';
  const OVERCAST = 'overcast';
  const SNOW = 'snow';
  const NOSTATE = '';
  let path = '';
  let state = NOSTATE;
  let data = weatherObjHour;

  const updateState = () => {
    //console.log(data);
    const c = data.condition.text.toLowerCase();
    if (c.includes(RAIN)) state = RAIN;
    else if (c.includes(SUN)) state = SUN;
    else if (c.includes(OVERCAST)) state = OVERCAST;
    else if (c.includes(CLOUDY)) state = CLOUDY;
    else if (c.includes(SNOW)) state = SNOW;
    else state = NOSTATE;
  };

  const setPath = () => {
    switch (state) {
      case RAIN:
        //rainState();
        path = rain;
        break;
      case SUN:
        //sunState();
        path = sun;
        break;
      case OVERCAST:
        //overcastState();
        path = overcast;
        break;
      case CLOUDY:
        //cloudyState();
        path = cloudy;
        break;
      case SNOW:
        //snowState();
        path = snow;
        break;
      default:
        //noStateYet();
        break;
    }
  };

  const getPath = () => path;

  const updateData = (weatherObjHour) => {
    data = weatherObjHour;
    updateState();
    setPath();
  };

  const init = () => {
    updateData(weatherObjHour);
    document.querySelector('.details > div:first-child img').src = umbrella;
  };
  init();

  return {
    getPath,
    updateData
  }
}

function displayObject() {
  const RAIN = 'rain'
  const SUN = 'sun';
  const CLOUDY = 'cloudy';
  const OVERCAST = 'overcast';
  const SNOW = 'snow';
  const NOSTATE = '';
  const CEL = 'cel';
  const FAH = 'fah';
  let state = RAIN;
  let subState = RAIN;
  let celOrFah = '';
  let data;
  const stateArr = [];

  // DOM elems
  const btnCel = document.querySelector('.cel');
  const btnFah = document.querySelector('.fah');
  const topPlace = document.querySelector('.place');
  const topPara = document.querySelector('.top > p:last-child');
  const midTempPara1 = document.querySelector('.mid p:first-child');
  const midTempPara2 = document.querySelector('.mid p:last-child');
  const midDetailsChance = document.querySelector('.mid .details .rain-chance');
  const bottomDegrees = document.querySelectorAll('.bottom > div p:nth-child(2)');
  const midStateImg = document.querySelector('.mid .condition img');
  const bottomImgs = document.querySelectorAll('.bottom > div img:nth-child(1)');


  const updateState = (data) => {
    const c = data.current.condition.text.toLowerCase();
    if (c.includes(RAIN)) state = RAIN;
    else if (c.includes(SUN)) state = SUN;
    else if (c.includes(OVERCAST)) state = OVERCAST;
    else if (c.includes(CLOUDY)) state = CLOUDY;
    else if (c.includes(SNOW)) state = SNOW;
    else state = NOSTATE;

  };

  const setCelOrFah = () => {
    const btns = document.querySelectorAll('.switch button');
    const selected = Array.from(btns).filter((btn) => {
      return btn.classList.contains('selected');
    });
    if (selected[0].classList.contains(CEL)) celOrFah = CEL;
    else celOrFah = FAH;
  };

  const toggleCelOrFah = (event) => {
    const btns = document.querySelectorAll('.switch button');
    Array.from(btns).forEach((btn) => {
      btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    //console.log(event.target.classList.contains('selected'));
    setCelOrFah();
    //console.log(celOrFah);
  };

  //common data
  const commonState = (data) => {
    if (celOrFah !== CEL || celOrFah !== FAH) setCelOrFah();

    let dayTemp = parseFloat(data.current.temp_c);
    let hourTemps = [];
    data.forecast.forecastday[0].hour
      .forEach((hourTemp) => hourTemps.push(parseFloat(hourTemp.temp_c)));
    if (celOrFah === FAH) {
      dayTemp = (dayTemp * 9 / 5) + 32;
      hourTemps[9] = (hourTemps[9] * 9 / 5) + 32;
      hourTemps[12] = (hourTemps[9] * 9 / 5) + 32;
      hourTemps[15] = (hourTemps[9] * 9 / 5) + 32;
      hourTemps[18] = (hourTemps[9] * 9 / 5) + 32;
    }

    midTempPara1.textContent = (Math.round(dayTemp * 10) / 10) + '°';
    midDetailsChance.textContent
      = data.forecast.forecastday[0].day.daily_chance_of_rain;
    // 9am 12pm 3pm 6pm
    bottomDegrees[0].textContent = (Math.round(hourTemps[9] * 10) / 10) + '°';
    bottomDegrees[1].textContent = (Math.round(hourTemps[12] * 10) / 10) + '°';
    bottomDegrees[2].textContent = (Math.round(hourTemps[15] * 10) / 10) + '°';
    bottomDegrees[3].textContent = (Math.round(hourTemps[18] * 10) / 10) + '°';
  };

  //states
  const rainState = () => {
    topPara.textContent = 'it\'s raining. Ugh.';
    midStateImg.setAttribute('src', rain);
    midTempPara2.textContent = 'rainy';

    state = NOSTATE;
  };

  const sunState = () => {
    topPara.textContent = 'it\'s sunny!';
    midStateImg.setAttribute('src', sun);
    midTempPara2.textContent = 'sunny';

    state = NOSTATE;
  };

  const overcastState = () => {
    topPara.textContent = 'it\'s filled with clouds.';
    midStateImg.setAttribute('src', overcast);
    midTempPara2.textContent = 'cloudy';

    state = NOSTATE;
  };

  const cloudyState = () => {
    topPara.textContent = 'it\'s a bit sunny.';
    midStateImg.setAttribute('src', cloudy);
    midTempPara2.textContent = 'partially sunny';

    state = NOSTATE;
  };

  const snowState = () => {
    topPara.textContent = 'it\'s snow.';
    midStateImg.setAttribute('src', snow);
    midTempPara2.textContent = 'snow';

    state = NOSTATE;
  };

  const noStateYet = () => {
    topPara.textContent = '... no idea.';
  };

  const switchState = (currentState) => {
    switch (currentState) {
      case RAIN:
        rainState();
        break;
      case SUN:
        sunState();
        break;
      case OVERCAST:
        overcastState();
        break;
      case CLOUDY:
        cloudyState();
        break;
      case SNOW:
        snowState();
        break;
      default:
        noStateYet();
        break;
    }
  };

  const checkError = () => {
    if (data.error.code === 1006) {
      topPara.textContent = '...no such place';
      return true;
    }
    return false;
  };

  const updateDisplay = (dataWeather) => {
    data = dataWeather;
    if (Object.hasOwn(data, 'error')) {
      if (checkError()) return;
    }

    if (stateArr.length === 0) {
      stateArr.push((stateObj(data.forecast.forecastday[0].hour[9])))
      stateArr.push((stateObj(data.forecast.forecastday[0].hour[12])));
      stateArr.push((stateObj(data.forecast.forecastday[0].hour[15])));
      stateArr.push((stateObj(data.forecast.forecastday[0].hour[18])));
    }
    updateState(data);
    commonState(data);
    switchState(state);

    stateArr[0].updateData(data.forecast.forecastday[0].hour[9]);
    stateArr[1].updateData(data.forecast.forecastday[0].hour[12]);
    stateArr[2].updateData(data.forecast.forecastday[0].hour[15]);
    stateArr[3].updateData(data.forecast.forecastday[0].hour[18]);

    for (let i = 0; i < bottomImgs.length; i++) {
      bottomImgs[i].setAttribute('src', stateArr[i].getPath());
    }

  };

  btnCel.addEventListener('click', (event) => {
    toggleCelOrFah(event);
    if (data) commonState(data);
  });
  btnFah.addEventListener('click', (event) => {
    toggleCelOrFah(event);
    if (data) commonState(data);
  });

  const init = () => {
    //for (let i = 0; i < bottomImgs.length; i++) {
    //  stateArr
    //}
  };
  init();

  return {
    updateDisplay
  }
}

export {
  displayObject,
  stateObj
};