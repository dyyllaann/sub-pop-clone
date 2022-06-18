var Item = require("../models/item");
var Artist = require("../models/artist");
// var ItemDetail = require("../models/itemDetail");
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
        // item_instance: function(callback) {

        //   Item.find({ 'item': req.params.id })
        //   .exec(callback);
        // },
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
					// releaseDate: Date(results.item.releaseDate).toString(),
					releaseDate: results.item.releaseDateFormatted,
					// item_instances: results.item_instance,
				} );
    });

};


// // Display list of all items.
// exports.item_list = function (req, res) {
// 	Item.find({}, "title image description price format label stockAmount artist releaseDate")
// 		.sort({ title: 1 })
// 		.populate("artist")
// 		.exec(function (err, list_items) {
// 			if (err) {
// 				return next(err);
// 			}
// 			res.render("item_list", { title: "Item List", item_list: list_items });
// 		});
// };

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
