var mongoose = require("mongoose");
const {DateTime} = require("luxon");

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
	category: { type: String },
	variations: { type: Array },
	releaseDate: { type: Date },
});

// Virtual for item's URL
ItemSchema.virtual("url").get(function () {
	// const titleFormatted = this.title.split(" ").join("-");
	// return "/catalog/item/" + titleFormatted;
	return "/catalog/item/" + this._id;
});

ItemSchema.virtual("releaseDateFormatted").get(function () {
	return this.releaseDate
		? DateTime.fromJSDate(this.releaseDate).toFormat('MMMM d, yyyy')
		: "Not available";
});

ItemSchema.virtual("priceFormatted").get(function () {
	return `$${this.price}.00`;
});

//Export model
module.exports = mongoose.model("Item", ItemSchema);
