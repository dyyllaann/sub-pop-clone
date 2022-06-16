var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	title: { type: String },
	description: { type: String },
	image: { type: String },
	format: { type: String },
	price: { type: String },
	stockAmount: { type: String },
	label: { type: String },
	artist: { type: Schema.Types.ObjectId, ref: "Artist", required: true },
	length: { type: String },
	genre: { type: String },
	releaseDate: { type: Date },
});

// Virtual for item's URL
ItemSchema.virtual("url").get(function () {
	return "/catalog/item/" + this._id;
});

//Export model
module.exports = mongoose.model("Item", ItemSchema);