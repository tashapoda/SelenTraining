

var webdriver = require('selenium-webdriver'),
    Key = webdriver.Key,
    chrome = require('selenium-webdriver/chrome'),
    firefox=require('geckodriver')
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');
const assert = require('assert');




test.describe('Task 14', function() {
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

    test.it('should check that link opens in new tab', function() {

        driver.navigate().to("http://localhost/litecart/admin/?app=countries&doc=countries");
        driver.wait(until.titleIs('Countries | My Store'), 1000);

        driver.findElement(By.css('a[href$="edit_country"]')).click();

        var tabs = {
            oldTab: '',
            newTab: ''
        };

        driver.getWindowHandle().then(function(handle){
            tabs.oldTab = handle;

        });

        driver.findElement(By.css('a i.fa-external-link')).click();
        driver.sleep(4000);



        driver.getAllWindowHandles().then(function(handles){
            assert.equal(handles[0], tabs.oldTab);

            tabs.newTab=handles[1];
            return driver.switchTo().window(tabs.newTab);
            driver.close();

            driver.switchTo().window(tabs.oldTab);

        });








    });


    test.after(function() {
        driver.quit();
    });
});


