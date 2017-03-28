

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

            .build();

        driver.get('http://localhost/litecart/admin/login.php');

        driver.findElement(By.name('username')).sendKeys(login);
        driver.findElement(By.name('password')).sendKeys(password);
        driver.findElement(By.name('login')).click();
        driver.wait(until.titleIs('My Store'), 2000);
        driver.sleep(2000);
    });

    test.it('should add new product to Catalog', function() {

        driver.navigate().to("http://localhost/litecart/admin/?app=catalog&doc=catalog");
        driver.wait(until.titleIs('Catalog | My Store'), 3000);

        driver.findElement(By.css('a[href$="product"]')).click();
        driver.wait(until.titleIs('Add New Product | My Store'), 2000);

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
        var fileToUpload= 'img/test.png'
            , absolutePath = path.resolve(__dirname, fileToUpload);

        driver.findElement(By.name('new_images[]')).then(function(el){
            el.sendKeys(absolutePath);
        });

        //enter date for Date Valid from
        driver.findElement(By.name('date_valid_from')).then(function(el){
            el.click();
            el.sendKeys( '2016'+ Key.LEFT + "13" + Key.LEFT + Key.LEFT+ '10');

        });

        //enter date for Date valid to
        driver.findElement(By.name('date_valid_to')).then(function(el){
            el.click();
            el.sendKeys( '2018'+ Key.LEFT + "13" + Key.LEFT + Key.LEFT+ '10');
        });

        driver.sleep(5000);

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
        var pur_price_num = '12';

        price.click();
        price.sendKeys(Key.LEFT + pur_price_num);

        var currency=driver.findElement(By.name('purchase_price_currency_code'));
        currency.click();
        driver.findElement(By.css('option[value="USD"]')).click();

        var price_num="10";
        driver.findElement(By.name('prices[USD]')).sendKeys(price_num);

        driver.findElement(By.css('button[name="save"]')).then(function(el){
            el.click();
            driver.wait(until.stalenessOf(el));
        });

        driver.findElement(By.css('input[type="search"]')).then(function(el){
            el.sendKeys(product_name + Key.ENTER);
        });
        driver.findElement(By.xpath('//table/tbody/tr[@class="row"]/td[3]/a')).then(function(el){
            el.getText().then(function(text){
               assert.equal(text,product_name);
            });
        });

    });


    test.after(function() {
        driver.quit();
    });
});


