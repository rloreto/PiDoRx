/**
* Device.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,
  autoPK: false,
  tableName: 'devices',
  attributes: {
      ip: { type: 'string', primaryKey: true,  unique: true, required: true },
      name: { type: 'string' },
      state: { type: 'string' },
      isMaster: { type: 'boolean'}
  }
};
