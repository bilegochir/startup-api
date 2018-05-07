const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  name: {
    type: String
  },
  start_date: {
    type: String
  },
  description: {
    type: String
  },
  company: {
    type: String
  }
});

var Projects = mongoose.model('projects', projectSchema);

module.exports = Projects;