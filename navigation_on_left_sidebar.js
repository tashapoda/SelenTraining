

var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');


test.describe('Litecart left sidebar navigation', function() {
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
    });

    test.it('should click each menu option ', function() {
        driver.get('http://localhost/litecart/admin/login.php');
        driver.findElement(By.name('username')).sendKeys(login);
        driver.findElement(By.name('password')).sendKeys(password);
        driver.findElement(By.name('login')).click();
        driver.wait(until.titleIs('My Store'), 2000);


        //find all main left menu options
        var options =driver.findElements(By.css('li#app-')).then(function(options){

            for (var i = 1; i < options.length + 1; i++) {
                var option = driver.findElement(By.css('li#app-:nth-child(' + i + ')'));
                option.click();
                driver.findElement(By.css('h1')).isDisplayed();

                //check if sub-menu option is present  and click every sub_menu option
                if (driver.findElements(By.css('li[id^="doc-"]')).length > 0) {
                    var sub_options = driver.findElements(By.css('li[id^="doc-"]')).then(function () {
                            for (j = 1; j < sub_options.length + 1; j++) {
                                var sub_menu_link = driver.findElement(By.css('li[id^="doc-"]:nth-child(' + j + ')'));
                                sub_menu_link.click();
                                driver.findElement(By.css('h1')).isDisplayed();
                            };


                    });
                };

            }});


        });



    test.after(function() {
        driver.quit();
    });
});
