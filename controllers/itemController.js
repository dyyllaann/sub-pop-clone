var Item = require("../models/item");
var Artist = require("../models/artist");
// var ItemDetail = require("../models/itemDetail");
var async = require("async");

// exports.login = function () {
// 	render("login", {
// 		title: "Log In"
// 	})
// }

// exports.index = function (req, res) {
// 	// async.parallel(
// 	// 	{
// 	// 		// Display search results for NEW RELEASE items.
// 	// 		new_releases: function (callback) {
// 	// 			Item.find({ releaseDate: { $gte: new Date(2022, 0, 0) } }, "title image price")
// 	// 			.sort({ title: 1 })
// 	// 			.populate("artist")
// 	// 			.exec(callback)
// 	// 		},
// 	// 	},
// 	// 	function (err, results) {
// 	// 		if (err) {
// 	// 			return next(err);
// 	// 		}
// 	// 		res.render("index", {
// 	// 			title: "Sub Pop Mega Mart",
// 	// 			error: err,
// 	// 			data: results,
// 	// 			item_list: results.new_releases
// 	// 		});
// 	// 	}
// 	// );
// 		Item.find({ category: "album" }, "title image price")
// 			.sort({ title: 1 })
// 			.populate("artist")
// 			.exec(function (err, list_items) {
// 				if (err) {
// 					return next(err);
// 				}
// 				res.render("index", { title: "All asdfsdfsadf", item_list: list_items });
// 			}); 
// };

// Display list of all items.
exports.item_list = function (req, res) {
	Item.find({category: "album"}, 'title image price')
		.sort({title : 1})
		.populate('artist')
		.exec(function (err, list_items) {
			if (err) { return next(err); }
			res.render('item_list', { title: 'All Music', item_list: list_items });
		}); 
};

// Display detail page for a specific item.
exports.item_detail = function(req, res, next) {
    async.parallel({
        item: function(callback) {
            Item.findById(req.params.id)
              .populate('artist')
              .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.item==null) { // No results.
            var err = new Error('Item not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('item_detail', { 
					item: results.item, 
					title: results.item.title, 
					description: results.item.description,
					image: results.item.image,
					format: results.item.format,
					price: results.item.priceFormatted,
					stockAmount: results.item.stockAmount,
					label: results.item.label,
					artist: results.item.artist.name,
					releaseDate: results.item.releaseDateFormatted,
				} );
    });
};

// Display search results for PRE ORDER items.
exports.pre_order_list = function (req, res) {
	Item.find({ category: 'pre-order' }, "title image price")
		.sort({ title: 1 })
		.populate("artist")
		.exec(function (err, list_items) {
			if (err) {
				return next(err);
			}
			res.render("item_list", { title: "Pre Orders", item_list: list_items });
		});
};

// Display search results for HARDLY ART items.
exports.hardly_art_list = function (req, res) {
	Item.find({ label: 'Hardly Art' }, "title image price")
		.sort({ title: 1 })
		.populate("artist")
		.exec(function (err, list_items) {
			if (err) {
				return next(err);
			}
			res.render("item_list", { title: "Hardly Art", item_list: list_items });
		});
};

// Display search results for OR PERHAPS COMEDY items.
exports.comedy_list = function (req, res) {
	Item.find({ label: 'Or Perhaps Comedy' }, "title image price")
		.sort({ title: 1 })
		.populate("artist")
		.exec(function (err, list_items) {
			if (err) {
				return next(err);
			}
			res.render("item_list", { title: "Or Perhaps Comedy", item_list: list_items });
		});
};

// Display search results for OTHER LABELS items.
exports.other_labels_list = function (req, res) {
	Item.find({ label: { $nin: ['Sub Pop', 'Hardly Art', 'Or Perhaps Comedy'] } }, "title image price")
		.sort({ title: 1 })
		.populate("artist")
		.exec(function (err, list_items) {
			if (err) {
				return next(err);
			}
			res.render("item_list", { title: "Other Labels", item_list: list_items });
		});
};

// Display search results for NEW RELEASE items.
exports.new_releases = function (req, res) {
	Item.find({ releaseDate: { $gte: new Date(2022, 0, 0) } }, "title image price")
		.sort({ title: 1 })
		.populate("artist")
		.exec(function (err, list_items) {
			if (err) {
				return next(err);
			}
			res.render("item_list", { title: "New Releases", item_list: list_items });
		});
};

// Display detail page for GIFT CARDS.
exports.gift_cards = function (req, res) {
	res.render("layout", {
		title: 'Gift Cards',
		message: "Gift cards not currently available."
	});
};

// Display item create form on GET.
exports.item_create_get = function (req, res) {
	res.send("NOT IMPLEMENTED: Item create GET");
};

// Handle item create on POST.
exports.item_create_post = function (req, res) {
	res.send("NOT IMPLEMENTED: Item create POST");
};

// Display item delete form on GET.
exports.item_delete_get = function (req, res) {
	res.send("NOT IMPLEMENTED: Item delete GET");
};

// Handle item delete on POST.
exports.item_delete_post = function (req, res) {
	res.send("NOT IMPLEMENTED: Item delete POST");
};

// Display item update form on GET.
exports.item_update_get = function (req, res) {
	res.send("NOT IMPLEMENTED: Item update GET");
};

// Handle item update on POST.
exports.item_update_post = function (req, res) {
	res.send("NOT IMPLEMENTED: Item update POST");
};
