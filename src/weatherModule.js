async function weatherData(loc = 'marikina') {
  try {
    return fetch(`http://api.weatherapi.com/v1/forecast.json?key=9ea9fe41085d4e4f85b115923230209&q=${loc}&days=1&aqi=no&alerts=no`, { mode: "cors" })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        return response;
      });
  } catch (e) {
    console.log(e);
  }
}

async function weatherCondition() {
  return fetch('https://www.weatherapi.com/docs/conditions.json')
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      //console.log(response);
      return response;
    });
}

export {
  weatherData,
  weatherCondition
};