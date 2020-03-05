Feature: Place order for items
  In order to buy clothes
  As a customer
  I want to select items, put them in my cart, set up delivery options and proceed to payment
  
  Scenario: purchase 2 items when logged-in
    Given I am logged in 
    When I add one item to my cart
    And I proceed to checkout from pop-up
    And I modify quantity for 2 in my cart 
    And I confirm my delivery address
    And I confirm my shipping option
    And I pay by bank wire
    Then I should see the order confirmation page

#Possible improvements: 
#add a scenario where customer proceeds to checkout before being logged in
#"I modify quantity for 2 in my cart" step could use a parameter to choose any quantity
#use "Scenario Outline" and "Examples" to cover different paths. Example: use different payment methods

