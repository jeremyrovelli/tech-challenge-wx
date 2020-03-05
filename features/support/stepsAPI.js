const { Given, When, Then } = require("cucumber");
const request = require('supertest');
const {determineNextMondaydate, getTemperaturesForDesiredDate, checkTemperaturesGreaterThan10} = require("../helpers.js");
const {assert} = require("chai");
const appid = "21130a6913e49062f45a8d10cc2c98cb"

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
    assert.equal(this.weatherReponse.status,200)
    assert.equal(this.weatherReponse.body.city.name,this.city)
    assert.equal(this.weatherReponse.headers["content-type"], "application/json; charset=utf-8")
    //improvement: assert that the list is not empty (exemple: at least one temperature)
});

Then("the temperature is warmer than 10 degrees", function(){
    const temperatures = getTemperaturesForDesiredDate(this.weatherReponse, this.desiredDate)
    //improvement: assert that the list is not empty (exemple: at least one temperature)
    isTemperatureGreaterThan10 = checkTemperaturesGreaterThan10(temperatures)
    assert.isTrue(isTemperatureGreaterThan10)
});

async function getWeather(cityToLookFor){
    const weatherReponse = await request("api.openweathermap.org/data/2.5/").get("forecast?q="+cityToLookFor+"&appid="+appid)
    return weatherReponse;
} 


