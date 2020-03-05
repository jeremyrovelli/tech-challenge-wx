const { setWorldConstructor } = require("cucumber");

class CustomWorld {
  constructor() {
    this.city = "";
    this.desiredDay = "";
    this.weatherReponse;
  }

  setCityTo(newCity) {
    this.city = newCity;
  }

  setDesiredDateTo(desiredDate) {
    this.desiredDate = desiredDate;
  }
  
  setWeatherResponse(weatherReponse) {
    this.weatherReponse = weatherReponse;
  }
}

setWorldConstructor(CustomWorld);
