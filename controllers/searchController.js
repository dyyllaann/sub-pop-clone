var Item = require("../models/item");
var Artist = require("../models/artist");
var async = require("async");

exports.index = function (req, res) {
	async.parallel(
		{
			// item_count: function (callback) {
			// 	Item.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
			// },
			// artist_count: function (callback) {
			// 	Artist.countDocuments({}, callback);
			// },
		},
		function (err, results) {
			res.render("index", {
				title: "Sub Pop MegaMart",
				error: err,
				data: results,
			});
		}
	);
};

// Display list of all results.
exports.item_list = function (req, res) {
	Item.find({ artist: req.params.id }, "title image artist")
		.sort({ title: 1 })
		.populate("artist")
		.exec(function (err, list_items) {
			if (err) {
				return next(err);
			}
			res.render("item_list", {
				title: 'teh poStaL SerViCE',
				// title: list_items.artist.name,
				item_list: list_items,
			});
		}
	);
};

// // Display list of all results.
// exports.item_list = function (req, res) {
// 	async.parallel(
// 		{
// 			item: function(callback) {
// 				Item.find({ artist: req.params.id }, "title image")
// 				.sort({ title: 1 })
// 				.populate("artist")
// 				.exec(callback)
// 			},
// 			artist: function(callback) {
// 				Artist.find({ _id: req.params.id }, "name")
// 					.populate("artist")
// 					.exec(callback);
// 			}
// 		},
// 		function(err, results) {
// 			 if (err) {
// 				 return next(err);
// 			 }
// 			 res.render("item_list", {
// 				 title: artist.name,
// 				 item_list: list_items,
// 			 });
// 		 }
// 	)
// };