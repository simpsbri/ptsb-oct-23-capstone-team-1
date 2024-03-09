const mongoose = require('mongoose');

const businessModel = mongoose.Schema(
  {
    businessName: { type: String, required: true },
    businessId: { type: Number, required: true },
    isNew: { type: Boolean, required: true },
    businessStreet: { type: String, required: true },
    businessCity: { type: String, required: true },
    businessState: { type: String, required: true },
    businessZip: { type: Number, required: true },
    businessPhone: { type: Number, required: true },
    businessOverview: { type: String, required: true },
    businessProjects: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

const Business = mongoose.model('Business', businessModel);

module.exports = Business;
