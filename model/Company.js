const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({
  name: {
    type: String
  },
  location: {
    type: String
  }
});

var Companies = mongoose.model('companies', companySchema);

module.exports = Companies;