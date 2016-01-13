/**
* Component.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,
  tableName: 'components',
  attributes: {
    type: {
      type: 'string',
      enum: ['switch', 'dimmer', 'socket', 'switchBlind', 'switchAudio', 'temperatureSensor','motionSensor', 'luminanceSensor', 'testAC']
    },
    name: {
      type: 'string'
    },
    currentState: {
      type: 'string'
    },
    gpios:{
        collection: 'gpio',
        via: 'owner'
    },
    value: {
        type: 'integer',
        defaultsTo: 0
    }
  }
};
