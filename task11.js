

var webdriver = require('selenium-webdriver'),
    Key = webdriver.Key,
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');
const assert=require('assert');


var randomstring = require("randomstring");

test.describe('Task 11', function() {
    var driver;


    test.before(function() {
        var options = new chrome.Options();
        options.addArguments(["start-fullscreen"]);

        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    test.it('should sign up and login', function() {
        driver.get('http://litecart.stqa.ru/index.php/en/');

        driver.findElement(By.linkText('New customers click here')).then(function(el){
            el.click();
        });
        driver.findElement(By.css('h1.title')).then(function(el){
            el.getText().then(function(text){
                assert.equal(text, "Create Account");
            });
        });

        var first_name="Peter";
        var last_name="Poland";
        var address="2410 Deer Ridge Drive";

        driver.findElement(By.name('firstname')).then(function(el){
            el.sendKeys(first_name);
        });
        driver.findElement(By.name('lastname')).then(function(el){
            el.sendKeys(last_name);
        });
        driver.findElement(By.name('address1')).then(function(el){
            el.sendKeys(address);
        });
        driver.findElement(By.name('postcode')).then(function(el){
            el.sendKeys('07866');
        });
        driver.findElement(By.name('city')).then(function(el){
            el.sendKeys('Denville');
        });

        driver.findElement(By.css('.select2-selection__arrow')).then(function(el){
            el.click();
        });
        driver.findElement(By.css('input.select2-search__field')).then(function(el){
            el.sendKeys('United States'+Key.ENTER);
        });


        var state=driver.findElement(By.css('select[name=zone_code]'));
        driver.wait(until.elementIsEnabled(state));

        state.then(function(el){
            el.click();
        });
        state.findElement(By.css('option:nth-child(1)')).then(function(el){
            el.click();
        });

        var email= randomstring.generate(7)+"@example.com"
        driver.findElement(By.name('email')).then(function(el){
            el.sendKeys(email);
        });

        var password="123456";
        driver.findElement(By.name('password')).then(function(el){
            el.sendKeys(password);
        });

        driver.findElement(By.name('confirmed_password')).then(function(el){
            el.sendKeys(password);
        });

        driver.findElement(By.name('phone')).then(function(el){
            el.sendKeys("+12344561234");
        });

        driver.findElement(By.name('create_account')).then(function(el){
            el.click();

        });

        //log out
        driver.wait(until.elementLocated(By.css('#box-account h3.title')));
        var navigation=driver.findElement(By.css('#navigation'));
        navigation.findElement(By.linkText('Logout')).then(function(el){
            el.click();
        });

        //Login part
        driver.findElement(By.name('email')).then(function(el){
            el.sendKeys(email);
        });

        driver.findElement(By.name('password')).then(function(el){
            el.sendKeys(password);
        });

        driver.findElement(By.name('login')).then(function(el){
            el.click();
        });

        var navigation=driver.findElement(By.css('#navigation'));
        navigation.findElement(By.linkText('Logout')).then(function(el){
            el.click();
        });


    });


    test.after(function() {
        driver.quit();
    });
});


