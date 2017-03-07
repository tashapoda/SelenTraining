
var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');


test.describe('Task 8', function() {
    var driver;


    test.before(function() {
        var options = new chrome.Options();
        options.addArguments(["start-fullscreen"]);

        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    test.it('should check labels in all product', function() {
        driver.get('http://litecart.stqa.ru/index.php/en/');

        //find all products on the page
        var all_product=driver.findElements(By.css('li.product')).then(function(all_product){

            for(i=1; i<all_product.length+1; i++){
                var product=driver.findElement(By.css('li.product:nth-child('+i+')'));
                product.findElement(By.css('.sticker')).isDisplayed();


            }
        });





    });

    test.after(function() {
        driver.quit();
    });
});