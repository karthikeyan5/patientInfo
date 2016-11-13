/**
 * Patient.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  autoPK: true,
  autoCreatedAt: true,
  autoUpdatedAt: true,
  attributes: {

    firstname: {
      type: 'string',
      required: true
    },

    lastname: {
      type: 'string',
      defaultsTo: ''
    },

    
    dob: {
      type: 'date',
      defaultsTo: null
    },

    
    gender: {
      type: 'string',
      enum: ['male', 'female', 'other', 'Not Selected'],
      defaultsTo: 'Not Selected'
    },

    phone: {
      type: 'string',
      defaultsTo: ''
    },

    otherinfo: {
      type: 'string',
      defaultsTo: ''
    },

  }
};

