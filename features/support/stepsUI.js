const { Given, When, Then } = require("cucumber");
const {assert} = require("chai");

//we assume we always log in with jeremyrovelli@gmail.com/WooliesX. Improvement: Those credentials could be parameters for this step, and stored in a config file
Given("I am logged in", function(){
    browser.url('http://automationpractice.com/index.php')
    const signInButton = $('=Sign in');
    signInButton.click();
    const emailInput = $('#email');
    emailInput.setValue('jeremyrovelli@gmail.com');
    const passwordInput = $('#passwd');
    passwordInput.setValue('WooliesX'); 
    const loginButton = $('#SubmitLogin');
    loginButton.click()
    const title = browser.getTitle()
    assert.strictEqual(title, 'My account - My Store')
});

//improvement: implement code to add any available item, not such a specific one as "Women > Faded Short Sleeve T-shirts"
When("I add one item to my cart", function(){
    const linkWomen = $('=Women')
    linkWomen.click();
    const linkWomenshirtstype = $('=Faded Short Sleeve T-shirts') 
    linkWomenshirtstype.click(); 
    const addToCartButton = $('#add_to_cart');
    addToCartButton.click()
});

When("I proceed to checkout from pop-up", function(){
    const proceedToCheckoutPopupbutton = $('=Proceed to checkout');
    proceedToCheckoutPopupbutton.click();
});

//we assume that stock is available for this item. In the future we could make sure of it by manipulating data (example using an API)
//this step could use a parameter to choose any quantity
When("I modify quantity for 2 in my cart", function() {    
    const quantityinput = $('//td[@class="cart_quantity text-center"]//input[@name="quantity_1_1_0_282355"]');
    quantityinput.setValue('2');
    const proceedToCheckoutPopupbutton = $('=Proceed to checkout');
    proceedToCheckoutPopupbutton.click();
});

//we assume the user's address exists for the user
When("I confirm my delivery address", function() {    
    const proceedToCheckoutAddressbutton = $('//button[@name="processAddress"]')
    proceedToCheckoutAddressbutton.click();
});

When("I confirm my shipping option", function() {      
    const agreeToConditionsButton = $('#cgv');
    agreeToConditionsButton.click();
    const proceedToCheckoutShippingbutton = $('//button[@name="processCarrier"]')
    proceedToCheckoutShippingbutton.click();
});

//this step could be improved to take the payment method as a parameter
When("I pay by bank wire", function(){
  const payByBankWirebutton = $('//a[@class="bankwire"]'); //there might be a more simple way than xpath
  payByBankWirebutton.click();
  const confirmOrderButton = $('//p[@id="cart_navigation"]//button[@class="button btn btn-default button-medium"]');
  confirmOrderButton.click();
});
  
Then("I should see the order confirmation page", function() {
    const title = browser.getTitle()
    assert.strictEqual(title, 'Order confirmation - My Store')
});
