var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
	name: { type: String, required: true, maxLength: 100 },
});

// Virtual for artist's URL
ArtistSchema.virtual("url").get(function () {
	return "/catalog/artist/" + this._id;
});

//Export model
module.exports = mongoose.model("Artist", ArtistSchema);
