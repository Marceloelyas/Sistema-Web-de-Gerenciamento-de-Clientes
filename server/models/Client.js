const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  businessType: {
    type: String,
    required: true
  },
  projectDescription: {
    type: String,
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'potential'],
    default: 'potential'
  }
});

module.exports = mongoose.model('Client', ClientSchema);
