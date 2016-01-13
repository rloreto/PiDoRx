/**
 * DevicesController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var DeviceService = require('../services/Device');

module.exports = {
	join: function(req, res){
		var object =req.params.all();
		var ip = object.ip;
		var name = object.ip;
		if(!ip){
			res.json({ status: 'failed', error: 'The "{ip:'<ip>'}" is required.'});
		}
		if(object.name){
			name = object.name;
		}
		Gpio.findOne({ ip: ip })
		.then(function(found){
			if(found){
				throw new Error('The devices is already joined.');
			}
			return Device.create({ ip: ip, name: name, state: 'joined'});

		})
		.then(function(){
			return DeviceService.register(ip);
		})
		.catch(function(e){
			res.json({ status: 'failed', error: e.message});
		})
		.then(function(result){
			res.json(result);
		});
	}
};
