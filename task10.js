
 var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    firefox = require('geckodriver'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');
require('selenium-webdriver/testing/assert');
const assert = require('assert');


test.describe('Task 10', function() {
    var driver;


    test.before(function() {
        var options = new chrome.Options();
        options.addArguments(["start-fullscreen"]);


        driver = new webdriver.Builder()
            //.forBrowser('chrome')
            //.setChromeOptions(options)

            //.forBrowser('safari')

            .withCapabilities({'marionette': true})
            .forBrowser('firefox')
            .build();
    });

    test.it('should verify correct product page', function() {
        driver.get('http://litecart.stqa.ru/index.php/en/');


        var product_hm=driver.findElement(By.css('#box-campaigns div.content ul li'));

        var product_hm_title="";

        product_hm.findElement(By.css('div.name')).then(function(el){
             el.getText().then(function(text){
                 console.log(text);
                 product_hm_title=text;
             });
        });


        var product_hm_price=product_hm.findElement(By.css('div.price-wrapper'));
        var product_hm_sale_price=product_hm_price.findElement(By.css('.campaign-price'));

        var product_hm_sale_price_mun="";
            product_hm_price.findElement(By.css('.campaign-price')).then(function(el){

                el.getText().then(function(sl_price){
                   console.log(sl_price);
                    product_hm_sale_price_mun=sl_price;
                });
        });

        //find font weight for the sale's price on home and verify that is it bold
        product_hm_sale_price.getAttribute('tagName')
          .then(function(text){
            assert.equal(text,"STRONG");

          });

        //find color of sale price and verify that it is red
        var product_hm_sale_price_color=product_hm_sale_price.getCssValue("color");
        var red_color=/(\brgb(a)?\b)?\((?:\d*\.)?\d+,\s[0],\s[0](,\s(?:\d*\.)?\d+)?\)/i

        product_hm_sale_price_color.then(function(sl_color){
            console.log(sl_color);
            var color_match=red_color.test(sl_color);
            assert(color_match);
        });


      //find sale price font size
        var product_hm_sale_price_font_size=product_hm_sale_price.getCssValue("font-size");

     //find regular price
        var product_hm_regl_price=product_hm_price.findElement(By.css('.regular-price'));

        var product_hm_regl_price_num="";
            product_hm_regl_price.then(function(el){
            el.getText().then(function(rg_price){
                product_hm_regl_price_num=rg_price;
                console.log(rg_price);
            });
        });

        //find regular price font size
        var product_hm_regular_price_font_size=product_hm_regl_price.getCssValue("font-size");

        //check that font size of regular and sale prices are not equal and regular price is bigger than sale's one
        assert.notEqual(product_hm_regular_price_font_size,product_hm_sale_price_font_size);
        assert(product_hm_regular_price_font_size > product_hm_sale_price_font_size);

       //find color of regular price
        var product_hm_regl_price_color = product_hm_regl_price.then(function(el){
             el.getCssValue("color").then(function(color){
                 console.log(color);
                 if (driver == 'firefox' || driver =='safari'){
                     assert.equal(color, "rgb(119, 119, 119)")
                 }
                 else {
                     assert.equal(color, "rgba(119, 119, 119, 1)")
                 }

             });
        });
       //find decoration for regular price
        var product_hm_regl_price_decor = product_hm_regl_price.getCssValue("text-decoration");
        //checking that regular price is strikeout on home page
        product_hm_regl_price_decor.then(function(text){
            assert.equal(text,"line-through");
        })



      //navigate to Product page

       product_hm.click();


      //get the product title on the Product page and verify that it is the same as on Home page
       var pr_title=driver.wait(until.elementLocated(By.css('h1.title')));
        pr_title.then(function(el){
        //driver.findElement(By.css('h1.title')).then(function(el){
           el.getText().then(function(text){
               assert.equal(text,product_hm_title);
           });

        });

        //get the regular price on Product page and compare it with price from Home page
        var product_pr_page_reg_price=driver.findElement(By.css('.regular-price'));

        product_pr_page_reg_price.then(function(el){
            el.getText().then(function(pr){
                assert.equal(pr,product_hm_regl_price_num);
            })
        });

        //verify that regular price is is strikeout
        product_pr_page_reg_price.getCssValue("text-decoration").then(function(value){
           assert.equal(value, "line-through");
        });

        //get the color of the regular price and check that it is grey
        product_pr_page_reg_price.getCssValue("color").then(function(color){
            console.log(color);
            if (driver =='firefox' || driver == 'safari'){
                assert.equal(color, "rgb(102, 102, 102)")
            }
            else{
                assert.equal(color, "rgba(102, 102, 102, 1)")
            }
        });

        //get sale price on the Product page and compare it with the sale's price from Home page
        var product_pr_page_sl_price=driver.findElement(By.css('.campaign-price'));
        product_pr_page_sl_price.then(function(el){
            el.getText().then(function(sl_pr){
                assert.equal(sl_pr,product_hm_sale_price_mun);
            });
        });

        //verify that the sale price is bold
        product_pr_page_sl_price.getCssValue("font-weight").then(function(font_weight){
            if(driver=='firefox'){
                assert.equal(font_weight, "700");}
            else{
                assert.equal(font_weight,"bold");
            }
        });

        //find the color of the sale's price and check that it is red against regexp
        product_pr_page_sl_price.getCssValue('color').then(function(sl_color){
            var sl_color_match=red_color.test(sl_color);
            assert(sl_color_match);
        });

        //find font size of the regular and sale price and compare them
        var product_pr_page_sl_price_font_size=product_pr_page_sl_price.getCssValue("font-size");
        var product_pr_page_reg_price_font_size=product_pr_page_reg_price.getCssValue("font-siez");

        assert.notEqual(product_pr_page_reg_price_font_size,product_pr_page_sl_price_font_size);
        assert(product_pr_page_reg_price_font_size > product_pr_page_sl_price_font_size);




    });


    test.after(function() {
        driver.quit();
    });
});
