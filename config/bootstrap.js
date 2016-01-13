/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var DeviceService = require('../api/services/Device');
var rp = require('request-promise');

module.exports.bootstrap = function(cb) {
    var http = require('http');
    sails.services.passport.loadStrategies();

    var totalRequest = 0;
    var completeRequest =0;
    var errorRequest=0;
    var number =0;
    var totalRetry = 20;
    var ip = DeviceService.getIp();
    console.log(ip);

    Device.find({ isMaster: true}).then(function(device){

      if(device && device.length>0 && device[0] && ip === device[0].ip){
        Component.find({ type: 'switch'}).populate('gpios').then(function(components){

          totalRequest = components.length;
          number =1;
          console.log("Trying to start the switch components...");
          var id = setInterval(function(){
            if(completeRequest === totalRequest || number === totalRetry){
              console.log("Switch inicialize completed");
              number = totalRetry;
              clearInterval(id);
              id= 0;
              return;
            }

            console.log("Retry " + number +" of "+ totalRetry);
            completeRequest = 0;
            errorRequest = 0;
            components.forEach(function(component){

              if(component.gpios){
                for (var i = 0; i < component.gpios.length; i++) {
                  if(component.gpios[i].action ==='switch'){

                    return rp({
                        method: 'Get',
                        uri: "http://" + component.gpios[i].ip + ":"+ DeviceService.getAppPort() +"/api/gpios/" + component.gpios[i].number  ,
                        resolveWithFullResponse: true
                    }).then(function(response){
                      var data = JSON.parse(response.body);
                      var gpio = data.gpio;
                      if(gpio.mode === 'in'){
                        return rp({
                            method: 'Put',
                            uri: "http://" + component.gpios[i].ip + ":"+ DeviceService.getAppPort() +"/api/gpios/" + component.gpios[i].number +"/action" ,
                            resolveWithFullResponse: true,
                            formData: { state: 'on', type: 'inOut' }
                        }).then(function(result){
                          completeRequest++;
                          if(id>0){
                            console.log("complete " + completeRequest);
                          }
                        }, function(){
                          errorRequest++;
                          if(id>0){
                          console.log("error " + errorRequest);
                          }
                        });
                      } else {
                        completeRequest++;
                      }
                    })
                    break;
                  }
                }
              }
            });

            number++;
          }, 5 * 1000);
        });
      }

    });




    sails.io.on('connect', function (socket){

          var subnet ='10.0.2.';
          var host ='';
          var port= 1337;
          var devices = [];

          for (var i = 1; i < 255; i++) {
              host = subnet + i;
              var optionsget = {
                  host : host,
                  port : 1337,
                  path : '/api/app/ping',
                  method : 'GET'
              };

              var reqGet = http.request(optionsget, function(res) {
                  res.on('data', function(data) {

                      var result = JSON.parse(data); 
                      if(result.status === 'ok' && result.name==='PiDo'){
                          socket.emit('findDevices', {status: 'ok', host: optionsget.host});
                      }
                  });

              });

              reqGet.end();
              reqGet.on('error', function(e) {
                  //socket.emit('findDevices', {status: 'failed', host: host});
                  //console.error(e);
              });



          }



    });

    sails.io.on('connect', function (socket){

    });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();

};
