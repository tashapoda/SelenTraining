



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

     test.it('should all countries and zones within be sorted alphabetically )', function() {

         driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');

        //part a
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
            //sort the actual list alphabetically
            var expectedCountryArr=countryArr.sort();
            //verify that the sorted list and initial one are equal
            assert(countryArr, expectedCountryArr);
        });

         //part b
         //find countries with zone on the page

         driver.findElements(By.xpath("//tr[contains(@class,'row')][./td[6][.!='0']]/td[5]/a")).then(function(zones){
         for (j= 1; j<zones.length+1; j++){
             var zone=driver.findElement(By.xpath("//tr[contains(@class,'row')][./td[6][.!='0']]["+j+"]/td[5]/a"));
             zone.click();

             driver.wait(until.elementLocated(By.css('h1'))).then(function(el){
                  el.getText().then(function(text){
                      assert.equal(text, "Edit Country");

                  });
              });

             // find zone's rows on the Edit Country page
             var countryZones=[];
             driver.findElements(By.xpath("//table[@id='table-zones']/tbody/tr/td[3]")).then(function(country_zones){
               for (k=2; k< country_zones.length+1; k++){
                 var country_zone_name=driver.findElement(By.xpath("//table[@id='table-zones']/tbody/tr["+k+"]/td[3]"));
                 country_zone_name.then(function(el){
                    el.getText().then(function(text){
                        //console.log(text);
                        countryZones.push(text);
                    });
                 });
                      assert.equal(countryZones, countryZones.sort());
               };
                 driver.navigate().back();
             });

          };
         });



        });

  test.it('should check that zones are alphabetically sorted',function(){
      var geo_zone='http://localhost/litecart/admin/?app=geo_zones&doc=geo_zones';
      driver.get(geo_zone);

      driver.findElements(By.xpath("//table/tbody/tr[@class='row']/td[3]/a")).then(function(countries){
          for (var i=1; i<=countries.length;i++){
              driver.findElement(By.xpath("//table/tbody/tr[@class='row']["+i+"]/td[3]/a")).then(function(country){
                  country.click();
                  var title=driver.wait(until.elementLocated(By.css('h1')));
                  title.then(function(el){
                      el.getAttribute('innerText').then(function(text){
                          assert.equal(text," Edit Geo Zone");
                      });
                  });

                  var zonesArr=[];
                  driver.findElements(By.xpath("//table/tbody/tr/td[3]/select/option[@selected='selected']")).then(function(zones){
                      for(var j=2;j<zones.length+2;j++){
                          driver.findElement(By.xpath("//table/tbody/tr["+j+"]/td[3]/select/option[@selected='selected']"))
                              .then(function(el){
                                  el.getText().then(function(text){
                                     // console.log(text);
                                      zonesArr.push(text);
                                      assert.equal(zonesArr,zonesArr.sort());
                                  });
                              });

                      };
                      driver.navigate().to(geo_zone);

                  });
              });


          }
      });



  });




    test.afterEach(function() {
        driver.quit();
    });
});

