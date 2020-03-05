const { Given, When, Then } = require("cucumber");
const {determineNextMondaydate, getTemperaturesForDesiredDate, checkTemperaturesGreaterThan10, getWeather} = require("../helpers.js");
const {assert} = require("chai");

Given("I like to holiday in Sydney", function(){
    this.setCityTo("Sydney");
});

Given("I only like to holiday on Mondays", function(){
    this.setDesiredDateTo(determineNextMondaydate());
});

When("I look up the weather forecast", async function(){
    const weatherReponse = await getWeather(this.city)
    this.setWeatherResponse(weatherReponse)
});

Then("I receive the weather forecast", function(){
    assert.equal(this.weatherReponse.status,200, "status code received when requesting weather")
    assert.equal(this.weatherReponse.body.city.name,this.city, "city received when requesting weather")
    assert.equal(this.weatherReponse.headers["content-type"].substring(0,16), "application/json", "http content-type received when requesting weather")
    //improvement: assert that the list is not empty (exemple: at least one temperature)
});

Then("the temperature is warmer than 10 degrees", function(){
    const temperatures = getTemperaturesForDesiredDate(this.weatherReponse, this.desiredDate)
    //improvement: assert that the list is not empty (exemple: at least one temperature)
    isTemperatureGreaterThan10 = checkTemperaturesGreaterThan10(temperatures)
    assert.isTrue(isTemperatureGreaterThan10)
});



