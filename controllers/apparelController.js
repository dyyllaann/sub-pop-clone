var Item = require("../models/item");
var Artist = require("../models/artist");
var async = require("async");

// Display search results for specific artist.
exports.item_list = function (req, res, next) {
	async.parallel(
		{
			apparel_items: function (callback) {
				Item.find({ format: {$in:["T-Shirt", "Tote"]} }, "title image")
					.sort({ title: 1 })
					.populate("artist")
					.exec(callback);
			},
		},
		function (err, results) {
			if (err) {
				return next(err);
			} // Error in API usage.
			// if (results.artist == null) {
			// 	// No results.
			// 	var err = new Error("Clothing items not found.");
			// 	err.status = 404;
			// 	return next(err);
			// }
			// Successful, so render.
			res.render("item_list", {
				title: 'Apparel',
				item_list: results.apparel_items,
			});
		}
	);
};
