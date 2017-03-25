

var webdriver = require('selenium-webdriver'),
    Key = webdriver.Key,
    chrome = require('selenium-webdriver/chrome'),
    firefox=require('geckodriver')
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');
const assert = require('assert');




test.describe('Task 17', function() {
    var driver;
    var login ='admin';
    var password ='admin';





    test.before(function() {
        var options = new chrome.Options();
        options.addArguments(["start-fullscreen"]);

        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        driver.get('http://localhost/litecart/admin/login.php');
        driver.findElement(By.name('username')).sendKeys(login);
        driver.findElement(By.name('password')).sendKeys(password);
        driver.findElement(By.name('login')).click();
        driver.wait(until.titleIs('My Store'), 2000);
        driver.sleep(2000);
    });

    test.it('should check browser logs', function() {

        driver.navigate().to("http://localhost/litecart/admin/?app=catalog&doc=catalog&category_id=1");
        driver.wait(until.titleIs('Catalog | My Store'), 1000);


        driver.findElements(By.css('img+a[href*="&product_id="]')).then(function(items){

            for (var i=1; i<items.length+1; i++){

                driver.findElement(By.xpath("//form/table/tbody/tr[@class='row']["+i+"+3]/td[3]/a[.!='Subcategory']")).
                    then(function(el){
                        el.click();
                    });

                driver.wait(until.titleContains("Edit Product: "));

                driver.manage().logs().get("browser").then(function(logsEntries) {
                    logsEntries.forEach(function(l) {
                        console.log(l);
                        assert.equal(l.text(),"");
                    });
                });

                driver.navigate().back();
                driver.wait(until.titleContains("Catalog"));


            }

        });

    });


    test.after(function() {
        driver.quit();
    });
});


