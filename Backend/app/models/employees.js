var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var employeeSchema = new Schema({
	name: { type: String },
	department: { type: String },
	gender: { type: String }
});

module.exports = mongoose.model('Emoloyee', employeeSchema);