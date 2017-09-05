var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ImageShcema = new Schema({
	text: {
		type: String,
		required: true
	},
	image: {
		type: String,
	}
});

var Image = mongoose.model('Image', ImageShcema);

module.exports = Image;