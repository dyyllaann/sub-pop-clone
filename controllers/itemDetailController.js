var Item = require("../models/item");
var Artist = require("../models/artist");
var async = require("async");

exports.index = function (req, res) {
	async.parallel(
		{
			item_count: function (callback) {
				Item.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
			},
			// item_instance_count: function (callback) {
			// 	ItemInstance.countDocuments({}, callback);
			// },
			// item_instance_available_count: function (callback) {
			// 	ItemInstance.countDocuments({ status: "Available" }, callback);
			// },
			artist_count: function (callback) {
				Artist.countDocuments({}, callback);
			},
			// genre_count: function (callback) {
			// 	Genre.countDocuments({}, callback);
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

// Display list of all items.
exports.item_list = function (req, res) {
	Item.find({}, "title image description price format label stockAmount artist releaseDate")
		.sort({ title: 1 })
		.populate("artist")
		.exec(function (err, list_items) {
			if (err) {
				return next(err);
			}
			res.render("item_list", { title: "Item List", item_list: list_items });
		});
};

// Display list of all BookInstances.
exports.bookinstance_list = function(req, res, next) {

  BookInstance.find()
    .populate('book')
    .exec(function (err, list_bookinstances) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: list_bookinstances });
    });

};

// Display detail page for a specific item.
exports.item_detail = function (req, res) {
	res.send("NOT IMPLEMENTED: Item detail: " + req.params.id);
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
