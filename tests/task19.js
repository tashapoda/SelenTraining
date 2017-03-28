
var application = require('../app/app'),
    test = require('selenium-webdriver/testing');


test.describe('Learning Page Object pattern', function() {
    var app;

    test.before(function() {
        app = new application.Application();
    });

    test.it('add and delete 3 products - task 19', function(){

        var productQuantity = 3;
        app.addSeveralProducts(productQuantity);
        app.deleteAllProducts();


    });

    test.after(function() {
        app.quit();
    });


});





