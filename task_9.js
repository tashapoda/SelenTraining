
var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');


test.describe('Task9', function() {
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

    });

    test.it('should all countries be sorted alphabetically with zone', function() {

        driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');

        //find the list of countries

        var countries =driver.findElements(By.xpath("//tbody/tr[@class='row']/td[5]")).then(function(countries){
            for (var i=1; i< countries.length; i++){
                var country=driver.findElement(By.xpath("//tbody/tr[@class='row']/td["+i+"]"));
               country.getText().then(function(text){
                   console.log(text);
               })
            return;

            }
        });


        });



    test.after(function() {
        driver.quit();
    });
});