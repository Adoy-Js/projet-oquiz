// APPELEY

const called = {

  // La méthode appelée qui retourne une promesse
  getWeather: (city) => {
    return new Promise((resolve, reject) => {
      let cityToFetch = city.toLowerCase();

      fetchTempFromAPI(cityToFetch, (temp) => {
        fetchMeteoFromAPI(cityToFetch, (meteo) => {
          if (cityToFetch === "perpignan") {
            return reject(new Error('La ville que tu cherche a explosée'));
          }
          else {
            const data = {
              city: city,
              temp: temp,
              meteo: meteo
            }
            resolve(data);
          }
        });
      });
    });
  }
}


function fetchMeteoFromAPI(city, callback) {
  setTimeout(() => {
    callback('sun')
  }, 1000)
}
function fetchTempFromAPI(city, callback) {
  setTimeout(() => {
    callback(20)
  }, 1000)
}

module.exports = called;