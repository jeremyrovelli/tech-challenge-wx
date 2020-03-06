const request = require('supertest');
const appid = "21130a6913e49062f45a8d10cc2c98cb"

/**
 * params
 * date [JS Date()]
 * day_in_week [int] 1 (Mon) - 7 (Sun)
 */
function nextWeekdayDate(date, day_in_week) {
    var ret = new Date(date||new Date());
    ret.setDate(ret.getDate() + (day_in_week - 1 - ret.getDay() + 7) % 7 + 1);
    return formatDate(ret);
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function getTemperaturesForDesiredDate(weatherReponse, desiredDate){
    const listLength = weatherReponse.body.list.length
    let temperatures = []
    for (i=0;i<listLength;i++){
        const weatherForecast = weatherReponse.body.list[i]
        const formatedDate = weatherForecast.dt_txt.substring(0, 10)
        if (formatedDate == desiredDate){
            temperatureIntKelvin = weatherForecast.main.temp
            temperatureCelcius = temperatureIntKelvin - 273.15
            temperatures.push(temperatureCelcius)
        }
    }
    if (temperatures.length>0){
     return temperatures
    } else {
        throw("There are no temperatures available for: "+desiredDate+". Possible reason: a free openweathermap account lets you access the next 5 days only")
    }
}

async function getWeather(cityToLookFor){
    const weatherReponse = await request("api.openweathermap.org/data/2.5/").get("forecast?q="+cityToLookFor+"&appid="+appid)
    return weatherReponse;
} 

function checkTemperaturesGreaterThan10(temperatures){
    let isTemperatureGreaterThan10 = true
         for (i=0;i<temperatures.length;i++){
            if (temperatures[i] < 10){
                isTemperatureGreaterThan10 = false
            }
        } 
    return isTemperatureGreaterThan10
}

module.exports = { nextWeekdayDate, getTemperaturesForDesiredDate, checkTemperaturesGreaterThan10, getWeather};
