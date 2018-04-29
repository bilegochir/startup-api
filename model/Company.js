const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({
  name: {
    type: String
  },
  abn: {
    type: String
  },
  description: {
    type: String
  },
  phone: {
    type: String
  },
  location: {
    type: String
  },
  category: {
    type: String
  },
  subcategory: {
    type: String
  }
});

var Companies = mongoose.model('companies', companySchema);

module.exports = Companies;