/**
 * DevicesController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    create: function(req, res, next){
        Devices.create(req.params.all(), function (err, component) {
              if (err) {
                return next(err);
            }
              res.json(component);
        });
      }
};
