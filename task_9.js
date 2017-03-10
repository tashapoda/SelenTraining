
var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');
const assert = require('assert');


test.describe('Task9', function() {
    var driver;
    var login ='admin';
    var password ='admin';

    test.beforeEach(function() {
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

    /*test.it('should all a) countries be sorted alphabetically with zone', function() {

        driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');

        //find the list of countries
       var countryArr=[];
        var countries =driver.findElements(By.xpath(".//tbody/tr[@class='row']/td[5]/a")).then(function(countries){
            //for each country get the its name
            for (var i=1; i< countries.length; i++){
                var country=driver.findElement(By.xpath("//tbody/tr[@class='row']["+i+"]/td[5]/a"));
               country.getAttribute('innerText').then(function(text){
                   //console.log(text);
                  return  countryArr.push(text);
               })
            }
            //sort the list actual alphabetically
            var expectedCountryArr=countryArr.sort();

            //making assertion that sorting list and initial one are equal
            assert(countryArr, expectedCountryArr);

        });


        });
*/
    test.it('should all b) check county zone sorting', function() {
        driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');

       var zoneArr=[];

        var countries =driver.findElements(By.xpath(".//tbody/tr[@class='row']/td[5]/a")).then(function(countries) {
            for (var i = 1; i < countries.length; i++) {
                var zoneNum = driver.findElement(By.xpath(".//tbody/tr[@class='row'][" + i + "]/td[6]"));
                if (zoneNum.getAttribute('outerText').then(function (num) {
                        parseInt(num) !== 0;
                        //return console.log(num);
                    })) {

                    driver.findElement(By.xpath(".//tbody/tr[@class='row'][" + i + "]/td[5]/a")).click();
                    var zones = driver.findElements(By.xpath(".//table[@id='table-zones']/tbody/tr/td[3]")).then(function () {
                        for (j = 1; j < zones.length - 1; j++) {
                            var zone = driver.findElement(By.xpath(".//table[@id='table-zones']/tbody/tr[" + j + "]/td[3]"));
                            zone.getAttribute('innerText').then(function (text) {
                                console.log(text);
                            });

                        };
                    });
                };
            };
        });
            });






    test.afterEach(function() {
        driver.quit();
    });
});