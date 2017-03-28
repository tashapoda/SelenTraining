var webdriver = require('selenium-webdriver');

var By = webdriver.By,
    until = webdriver.until;

class CheckoutPage{

    constructor(driver) {
        this.driver = driver;
    }

    open(){
        this.driver.findElement(By.linkText("Checkout »")).click();
        return this;
    }

    findNumberOfProducts(){
        return this.driver.findElements(By.css('#box-checkout-cart ul[class="items"] li'));
        }

    

    deleteButton(){
        this.driver.findElement(By.name('remove_cart_item'));
    }

    totalPrice(){
        this.driver.findElement(By.xpath("id('order_confirmation-wrapper')/table/tbody/tr[last()]/td[2]/strong"));
    }

}

exports.CheckoutPage = CheckoutPage;