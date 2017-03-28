var webdriver = require('selenium-webdriver');

var By = webdriver.By,
    until = webdriver.until;

class HomePage{

    constructor(driver) {
        this.driver = driver;
    }

    open() {
        this.driver.get("http://litecart.stqa.ru/index.php/en/");
        return this;
    }

    selectPopularProduct(element){
        return this.driver.findElement(By.css('#box-most-popular ul li:nth-child(1)'));

    }

}

exports.HomePage = HomePage;