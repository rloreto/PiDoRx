    /**
     * Route Mappings
     * (sails.config.routes)
     *
     * Your routes map URLs to views and controllers.
     *
     * If Sails receives a URL that doesn't match any of the routes below,
     * it will check for matching files (images, scripts, stylesheets, etc.)
     * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
     * might match an image file: `/assets/images/foo.jpg`
     *
     * Finally, if those don't match either, the default 404 handler is triggered.
     * See `api/responses/notFound.js` to adjust your app's 404 logic.
     *
     * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
     * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
     * CoffeeScript for the front-end.
     *
     * For more information on configuring custom routes, check out:
     * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
     */

    module.exports.routes = {

    /***************************************************************************
    *                                                                          *
    * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
    * etc. depending on your default view engine) your home page.              *
    *                                                                          *
    * (Alternatively, remove this and add an `index.html` file in your         *
    * `assets` directory)                                                      *
    *                                                                          *
    ***************************************************************************/

    /*'/': {
        view: 'homepage'
    },*/

    /***************************************************************************
    *                                                                          *
    * Custom routes here...                                                    *
    *                                                                          *
    *  If a request to a URL doesn't match any of the custom routes above, it  *
    * is matched against Sails route blueprints. See `config/blueprints.js`    *
    * for configuration options and examples.                                  *
    *                                                                          *
    ***************************************************************************/
    'get /api/app/ping':{
        controller:'AppController',
        action:'ping'
    },

    'post /api/devices/join':{
        controller:'DeviceController',
        action:'join'
    },

    //Components
    'get /api/components':{
        controller:'ComponentController',
        action:'get'
    },
    'get /api/components/:id':{
        controller:'ComponentController',
        action:'getById'
    },
    'post /api/components':{
        controller:'ComponentController',
        action:'create'
    },
    'put /api/components/socket/:id':{
        controller:'ComponentController',
        action:'socket'
    },
    'put /api/components/dimmer/:id':{
        controller:'ComponentController',
        action:'dimmer'
    },
    'put /api/components/switch/:id':{
        controller:'ComponentController',
        action:'switch'
    },
    'put /api/components/switchBlind/:id':{
        controller:'ComponentController',
        action:'switchBlind'
    },
    'put /api/components/switchAudio/:id':{
        controller:'ComponentController',
        action:'switchAudio'
    },
    'get /api/components/testAC/:id':{
        controller:'ComponentController',
        action:'testAC'
    },
    'get /api/components/temperatureSensor/:id':{
        controller:'ComponentController',
        action:'temperatureSensor'
    },
    'get /api/components/luminanceSensor/:id':{
        controller:'ComponentController',
        action:'luminanceSensor'
    },
    'delete /api/components/:id':{
        controller:'ComponentController',
        action:'destroy'
    },
    //Gpio
    'put /api/gpiosVirtual/:ip/:number':{
        controller:'GpioController',
        action:'updateVirtualGpio'
    },
    'post /api/gpiosVirtual/availables':{
        controller:'GpioController',
        action:'getAvailablesGpios'
    },
    'get /api/gpios/device':{
        controller:'GpioController',
        action:'getDeviceGpios'
    },
    'get /api/gpios/reset/out/:value':{
        controller:'GpioController',
        action:'reset'
    },
    'put /api/gpios/:number':{
        controller:'GpioController',
        action:'set'
    },
    'put /api/gpios/:number/action':{
        controller:'GpioController',
        action:'changeState'
    },
    'get /api/gpios/:number':{
        controller:'GpioController',
        action:'get'
    },
    'get /api/gpios/:number/dht':{
        controller:'GpioController',
        action:'getDhtSensor'
    },
    'get /api/gpios/:number/analog':{
        controller:'GpioController',
        action:'getAnalogValue'
    },
    'get /login': 'AuthController.login',
    'get /logout': 'AuthController.logout',
    'get /register': 'AuthController.register',

    'post /auth/local': 'AuthController.callback',
    'post /auth/local/:action': 'AuthController.callback',

    'get /auth/:provider': 'AuthController.provider',
    'get /auth/:provider/callback': 'AuthController.callback',
    'get /auth/:provider/:action': 'AuthController.callback'


};
