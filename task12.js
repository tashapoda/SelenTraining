

var webdriver = require('selenium-webdriver'),
    Key = webdriver.Key,
    chrome = require('selenium-webdriver/chrome'),
    firefox=require('geckodriver')
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');
const assert = require('assert');

var randomstring = require("randomstring");
var path = require('path');



test.describe('Task 12', function() {
    var driver;
    var login ='admin';
    var password ='admin';

    var product_name = randomstring.generate(10);



    test.before(function() {
        var options = new chrome.Options();
        options.addArguments(["start-fullscreen"]);

        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)


            //.withCapabilities({
            //        "browserName": "firefox",
            //        'marionette': true})
            //.forBrowser("firefox")
            .build();

        driver.get('http://localhost/litecart/admin/login.php');
        driver.findElement(By.name('username')).sendKeys(login);
        driver.findElement(By.name('password')).sendKeys(password);
        driver.findElement(By.name('login')).click();
        driver.wait(until.titleIs('My Store'), 2000);
        driver.sleep(2000);
    });

    test.it('should add new product to Catalog', function() {
        //driver.findElement(By.linkText('Catalog')).then(function(el){
        //    el.click();
        //});

        driver.navigate().to("http://localhost/litecart/admin/?app=catalog&doc=catalog");
        driver.wait(until.titleIs('Catalog | My Store'), 3000);

        driver.findElement(By.css('a[href$="product"]')).click();
        //driver.findElement(By.css('a.button:nth-child(2)')).click();
        driver.wait(until.titleIs('Add New Product | My Store'), 5000);

        //change status to Enable
        driver.findElement(By.css('label input[value="1"]')).click();
        //enter product name
        driver.findElement(By.name('name[en]')).sendKeys(product_name);
        //choose category
        driver.findElement(By.css('input[data-name="Rubber Ducks"]')).click();
        //select gender
        driver.findElement(By.css('input[value="1-2"]')).click();

        //enter quantity
        driver.findElement(By.name('quantity')).then(function(el){
            el.clear();
            el.sendKeys("10");
        });




        //add image;
        var fileToUpload= '/Users/natalie/Documents/Repo/SeleniumTraining/SelenTraining/img/test.png'
        //var fileToUpload= '/img/test.png'
            , absolutePath = path.resolve(__dirname, fileToUpload);

        driver.findElement(By.name('new_images[]')).then(function(el){
            el.sendKeys(absolutePath);
            driver.sleep(3000);
        });






        //enter date for Date Valid from
        driver.findElement(By.name('date_valid_from')).then(function(el){
            el.click();
            el.sendKeys(Key.HOME+'03.13.2017');
        });

        //enter date for Date valid to
        driver.findElement(By.name('date_valid_to')).then(function(el){
            el.click();
            el.sendKeys(Key.HOME+'04.13.2018');
        });

        //switch to Information tab

        driver.findElement(By.linkText('Information')).click();

        var manufacturer = driver.findElement(By.name('manufacturer_id'));
        driver.wait(until.elementLocated(By.name('manufacturer_id')));
        manufacturer.click();

        var manufacturer_option=driver.findElement(By.css('select[name="manufacturer_id"] option[value="1"]'));
        manufacturer_option.click();

        driver.findElement(By.name('keywords')).sendKeys('Keyword1, keyword2');
        driver.findElement(By.name('short_description[en]')).sendKeys('Lorem ipsum dolor');

        driver.findElement(By.css('.trumbowyg-editor')).sendKeys('Long description');

        driver.findElement(By.name('head_title[en]')).sendKeys('Test Title');
        driver.findElement(By.name('meta_description[en]')).sendKeys('Test Meta description');

        //move to Prices tab

        driver.findElement(By.linkText('Prices')).click();

        var price=driver.findElement(By.name('purchase_price'));
        var price_num = 2.55;

        price.click();
        price.sendKeys(price_num);

        var currency=driver.findElement(By.name('purchase_price_currency_code'));
        currency.click();
        driver.findElement(By.css('option[value="USD"]')).click();

        driver.findElement(By.name('prices[USD]')).sendKeys(price_num);

        driver.sleep(3000);


        driver.findElement(By.xpath('//form/p/span/button[1]')).then(function(el){
            el.click();
            driver.wait(until.elementIsNotVisible(el));
        });


        //driver.findElement(By.css('form[method="post"]')).submit();



        driver.sleep(6000);

        driver.findElement(By.css('a[href$="catalog&category_id=1"]')).click();






    });


    test.after(function() {
        driver.quit();
    });
});


