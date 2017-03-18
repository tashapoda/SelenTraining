


 var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');
 const assert = require('assert');



test.describe('Task 13', function() {
    var driver;


    test.before(function() {
        var options = new chrome.Options();
        options.addArguments(["start-fullscreen"]);


        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    test.it('should add products to cart and then delete them', function() {
        driver.get('http://litecart.stqa.ru/index.php/en/');

        for (var i=1; i<=3; i++){
            var product=driver.findElement(By.css('#box-most-popular ul li:nth-child(1)'));
            product.click();

            if (driver.findElements(By.css('select')).length > 0){
                driver.findElement(By.name('options[Size]')).then(function(el){
                    el.click();
                });
                driver.findElement(By.css('select option[value="Small"]')).then(function(el){
                    el.click();
                });
            }

            var addToCard=driver.findElement(By.name("add_cart_product"));
            addToCard.click();

            var cartValue=driver.findElement(By.css('#cart .quantity'));
            var cartQt= i.toString();
            driver.wait(until.elementTextContains(cartValue, cartQt));
            driver.navigate().back();

        }

        driver.findElement(By.linkText("Checkout »")).click();



        driver.findElements(By.css('#box-checkout-cart ul[class="items"] li')).then(function(items){


            for (var j=1; j<=items.length; j++ ) {
                var totalPrice=driver.findElement(By.xpath("id('order_confirmation-wrapper')/table/tbody/tr[last()]/td[2]/strong"));

                driver.wait(until.elementLocated(By.name('remove_cart_item')));
                var removeButton=driver.findElement(By.name('remove_cart_item'));
                removeButton.click();

                driver.wait(until.stalenessOf(totalPrice), 2000);
                driver.wait(until.stalenessOf(removeButton), 1000);

            }
        });

        driver.navigate().refresh();

        driver.findElement(By.css('#checkout-cart-wrapper p em')).then(function(el){

        driver.wait(until.elementIsVisible(el));
            el.getText().then(function(text){
                assert.equal(text, "There are no items in your cart.");
            });


        });


    });


    test.after(function() {
        driver.quit();
    });

});

