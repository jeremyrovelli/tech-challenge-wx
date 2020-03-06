const { Given, When, Then } = require("cucumber");
const {nextWeekdayDate, getTemperaturesForDesiredDate, checkTemperaturesGreaterThan10, getWeather} = require("../helpers.js");
const {assert} = require("chai");

Given("I like to holiday in Sydney", function(){
    this.setCityTo("Sydney");
});

//IMPORTANT: I use "Wednesdays" (int = 3) as my free account on openweathermap gives access to 5 days max (current day is Friday)
//IF NECESSARY, PLEASE UPDATE THIS FUNCTION TO CHOOSE A DAY WITHIN THE NEXT 5 DAYS
Given("I only like to holiday on Wednesdays", function(){
    //how to use param: 1 (Mon) - 7 (Sun)
    const desiredDate = nextWeekdayDate("", 3)
    this.setDesiredDateTo(desiredDate);
});

When("I look up the weather forecast", async function(){
    const weatherReponse = await getWeather(this.city)
    this.setWeatherResponse(weatherReponse)
});

Then("I receive the weather forecast", function(){
    assert.equal(this.weatherReponse.status,200, "status code received when requesting weather")
    assert.equal(this.weatherReponse.body.city.name,this.city, "city received when requesting weather")
    assert.equal(this.weatherReponse.headers["content-type"].substring(0,16), "application/json", "http content-type received when requesting weather")
});

Then("the temperature is warmer than 10 degrees", function(){
    const temperatures = getTemperaturesForDesiredDate(this.weatherReponse, this.desiredDate)
    const isTemperatureGreaterThan10 = checkTemperaturesGreaterThan10(temperatures)
    assert.isTrue(isTemperatureGreaterThan10)
});



