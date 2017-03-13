

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

    test.it('should check each product has one sticker', function() {
        driver.get('http://litecart.stqa.ru/index.php/en/');

        //find all lists with products
        var lists = driver.findElements(By.xpath(".//div/ul[@class='listing-wrapper products']")).then(function(){
            for (i=1; i<lists.length; i++) {
                //find all products inside each list
                var all_product = driver.findElements(By.xpath('.//div/ul/li[@class="product column shadow hover-light"]')).then(function () {

                    for (j = 1; j < all_product.length ; j++) {
                        //verify that each product has only one sticker
                        var product = driver.findElement(By.css('li.product:nth-child(' + j + ')'));
                        product.findElements(By.css('.sticker')).length===1;

                    }


                });
            }
            })

        });


    test.after(function() {
        driver.quit();
    });
});

