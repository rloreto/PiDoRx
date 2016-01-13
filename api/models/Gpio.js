/**
* Gpio.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    schema: true,
    tableName: 'gpios',
    attributes: {
        ip: {
            type: 'string',
            required: true
        },
        number: {
          type: 'integer',
          required: true
        },
        type: {
          type: 'string',
          required: true
        },
        direction: {
            type: 'string',
            defaultsTo: 'out'
        },
        action: {
            type: 'string'
        },
        owner:{
          model:'component'
        }
    }
};
