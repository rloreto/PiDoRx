/**
 * ComponentsController
 *
 * @description :: Server-side logic for managing components
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'create': function(req, res, next){
	    Components.create(req.params.all(), function (err, component) {
	      	if (err) {
				return next(err);
			}
	      	res.json(component);
	    });
  	}
};
