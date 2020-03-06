Feature: Request weather forecast
  In order to decide if I go on holiday 
  As a holiday maker
  I want to know the weather temperature for a specific city and day
  
  # IMPORTANT: I use "Wednesdays" (int = 3) as my free account on openweathermap gives access to 5 days max (current day is Friday)
  # IF NECESSARY, PLEASE UPDATE THE STEP (and associated function in stepsAPI.js) TO CHOOSE A DAY WITHIN THE NEXT 5 DAYS
  Scenario: A happy holidaymaker
    Given I like to holiday in Sydney
    And I only like to holiday on Wednesdays
    When I look up the weather forecast
    Then I receive the weather forecast
    And the temperature is warmer than 10 degrees
