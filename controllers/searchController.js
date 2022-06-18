var Item = require("../models/item");
var Artist = require("../models/artist");
var async = require("async");

// exports.index = function (req, res) {
// 	async.parallel(
// 		{
// 			// item_count: function (callback) {
// 			// 	Item.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
// 			// },
// 			// artist_count: function (callback) {
// 			// 	Artist.countDocuments({}, callback);
// 			// },
// 		},
// 		function (err, results) {
// 			res.render("index", {
// 				title: "Sub Pop MegaMart",
// 				error: err,
// 				data: results,
// 			});
// 		}
// 	);
// };

// exports.item_list = function (req, res) {
// 	async.parallel({
// 		artist: function(callback) {
// 			Artist.findById( req.params.id )
// 				.exec(callback)
// 		},
// 		item_list: function(callback) {
// 			Item.find( {artist: req.params.id}, "title image" )
// 				.sort({ title: 1 })
// 				.populate("artist")
// 				.exec(callback)
// 		}
// 	},
// 	function(err, results) {
// 		if (err) {
// 			return err;
// 		}
// 		res.render("item_list", { title: results.artist.name, item_list: results.item_list })
// 	}
// 	)
// }

// // Display list of all results.
// exports.item_list = function (req, res) {
// 	async.parallel({
// 		item: function(callback) {
// 			Item.find({ artist: req.params.id }, "title image")
// 			.sort({ title: 1 })
// 			.populate("artist")
// 			.exec(callback)
// 		},
// 		// artist: function(callback) {
// 		// 	Artist.findById(req.params.id, "name")
// 		// 		.exec(callback);
// 		// }
// 	},
// 	function(err, results) {
// 		if (err) {
// 			return next(err);
// 		}
// 		res.render("item_list", {
// 			// title: artist.name,
// 			item_list: list_items,
// 		});
// 	}
// 	)
// }

// Display search results for specific artist.
exports.item_list = function(req, res, next) {
    async.parallel({
        artist: function(callback) {
            Artist.findById(req.params.id)
              .exec(callback)
        },
        artist_items: function(callback) {
          Item.find({ 'artist': req.params.id },'title image price')
					.sort({ title: 1 })
					.populate("artist")
          .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.artist==null) { // No results.
            var err = new Error('Artist not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('item_list', { title: results.artist.name, item_list: results.artist_items } );
    });
}