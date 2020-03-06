Feature: Request weather forecast
  In order to decide if I go on holiday 
  As a holiday maker
  I want to know the weather temperature for a specific city and day
  
  # IMPORTANT The scenario had been modified to use Wednesdays instead of Thursdays, as my free account on openweathermap gives access to 5 days max (it's is Friday when I write this)
  Scenario: A happy holidaymaker
    Given I like to holiday in Sydney
    And I only like to holiday on Wednesdays
    When I look up the weather forecast
    Then I receive the weather forecast
    And the temperature is warmer than 10 degrees
