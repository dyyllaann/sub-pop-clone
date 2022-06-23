var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: { type: String, required: true, maxLength: 100 },
	password: { type: String, required: true, maxLength: 100 },
});

// // Virtual for artist's URL
// UserSchema.virtual("url").get(function () {
// 	// console.log(this._id);
// 	return "/catalog/artists/"
// });

//Export model
module.exports = mongoose.model("User", UserSchema);
