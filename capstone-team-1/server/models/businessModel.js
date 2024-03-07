const mongoose = require('mongoose');

const businessModel = mongoose.Schema({
  companyName: { type: String, required: true },
  businessId: { type: String, required: true },
});

// COMPANY NAME
// BUSINESSID
// ISNEW
// STREET
// CITY
// STATE
// ZIP
// PHONE
// OVERVIEW
// PROJECTS[]
