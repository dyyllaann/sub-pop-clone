var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
	name: { type: String, required: true, maxLength: 100 },
});

// Virtual for artist's URL
ArtistSchema.virtual("url").get(function () {
	// console.log(this._id);
	return "/catalog/artists/" + this._id;
});

//Export model
module.exports = mongoose.model("Artist", ArtistSchema);
