var webdriver = require('selenium-webdriver'),
    home_page = require('../pages/home_page.js'),
    product_page = require('../pages/product_page.js'),
    checkout_page = require('../pages/checkout_page.js'),
    assert = require('assert'),
    until = webdriver.until;


class Application {

    constructor() {
        this.driver = new webdriver.Builder()
            .forBrowser("chrome")
            .build();
        this.homePage = new home_page.HomePage(this.driver);
        this.productPage = new product_page.ProductPage(this.driver);
        this.checkoutPage = new checkout_page.CheckoutPage(this.driver);
    }

    quit() {
        this.driver.quit();
    }





    addSeveralProducts(quantity){
        this.homePage.open();
        for (var i=1; i<=quantity; i++){
            this.homePage.selectPopularProduct().click();
            this.productPage.addToCart().click();
            var cartValue = this.productPage.cartValue();
            var cartQuantity=i.toString();
            this.driver.wait(until.elementTextContains(cartValue, cartQuantity));
            this.driver.navigate().back();
        }
    }

    deleteAllProducts(){
        this.checkoutPage.open();
        var allProducts= this.checkoutPage.findNumberOfProducts();
        for (var i=1; i<=allProducts.length; i++){
            var totalPrice= this.checkoutPage.totalPrice();
            this.checkoutPage.deleteButton().click();
            this.driver.wait(until.stalenessOf(totalPrice))
        }
    }






}

exports.Application = Application;