var webdriver = require('selenium-webdriver');

var By = webdriver.By,
    until = webdriver.until;

class ProductPage {

    constructor(driver) {
        this.driver = driver;
    }

    addToCart(){
        if (this.driver.findElements(By.css('select')).length > 0){
                this.driver.findElement(By.css('select')).then(function(el){
                    el.click();
                });
                this.driver.findElement(By.css('select option[value="Small"]')).then(function(el){
                    el.click();
                });
            }
       return this.driver.findElement(By.name("add_cart_product"));
    }

    cartValue(){
       return this.driver.findElement(By.css('#cart .quantity'));

    }

}

exports.ProductPage = ProductPage;