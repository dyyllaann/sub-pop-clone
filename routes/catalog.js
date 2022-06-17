var express = require("express");
var router = express.Router();

// Require controller modules.
var item_controller = require("../controllers/itemController");
var artist_controller = require("../controllers/artistController");
var subpop_releases = require("../controllers/subpop_releasesController");
var item_detail_controller = require("../controllers/itemDetailController");
var search_controller = require("../controllers/searchController");

/// ITEM ROUTES ///

// GET catalog home page.
router.get("/", item_controller.index);

// GET request for creating a Item. NOTE This must come before routes that display Item (uses id).
router.get("/item/create", item_controller.item_create_get);

// POST request for creating Item.
router.post("/item/create", item_controller.item_create_post);

// GET request to delete Item.
router.get("/item/:id/delete", item_controller.item_delete_get);

// POST request to delete Item.
router.post("/item/:id/delete", item_controller.item_delete_post);

// GET request to update Item.
router.get("/item/:id/update", item_controller.item_update_get);

// POST request to update Item.
router.post("/item/:id/update", item_controller.item_update_post);

// GET request for one Item.
router.get("/item/:id", item_controller.item_detail);

// GET request for list of all Item items.
router.get("/items", item_controller.item_list);

/// ARTIST ROUTES ///

// GET request for creating Artist. NOTE This must come before route for id (i.e. display artist).
router.get("/artists/create", artist_controller.artist_create_get);

// POST request for creating Artist.
router.post("/artists/create", artist_controller.artist_create_post);

// GET request to delete Artist.
router.get("/artists/:id/delete", artist_controller.artist_delete_get);

// POST request to delete Artist.
router.post("/artists/:id/delete", artist_controller.artist_delete_post);

// GET request to update Artist.
router.get("/artists/:id/update", artist_controller.artist_update_get);

// POST request to update Artist.
router.post("/artists/:id/update", artist_controller.artist_update_post);

// GET request for one Artist / SEARCH
router.get("/artists/:id", search_controller.item_list);

// GET request for list of all Artists.
router.get("/artists", artist_controller.artist_list);

// SUB POP RELEASES ROUTES //

// GET request for list of all SUB POP RELEASES items.
router.get("/sub-pop-releases", subpop_releases.item_list);

// /// GENRE ROUTES ///

// // GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
// router.get("/genre/create", genre_controller.genre_create_get);

// //POST request for creating Genre.
// router.post("/genre/create", genre_controller.genre_create_post);

// // GET request to delete Genre.
// router.get("/genre/:id/delete", genre_controller.genre_delete_get);

// // POST request to delete Genre.
// router.post("/genre/:id/delete", genre_controller.genre_delete_post);

// // GET request to update Genre.
// router.get("/genre/:id/update", genre_controller.genre_update_get);

// // POST request to update Genre.
// router.post("/genre/:id/update", genre_controller.genre_update_post);

// // GET request for one Genre.
// router.get("/genre/:id", genre_controller.genre_detail);

// // GET request for list of all Genre.
// router.get("/genres", genre_controller.genre_list);

// /// BOOKINSTANCE ROUTES ///

// // GET request for creating a ItemInstance. NOTE This must come before route that displays ItemInstance (uses id).
// router.get(
// 	"/iteminstance/create",
// 	item_instance_controller.iteminstance_create_get
// );

// // POST request for creating ItemInstance.
// router.post(
// 	"/iteminstance/create",
// 	item_instance_controller.iteminstance_create_post
// );

// // GET request to delete ItemInstance.
// router.get(
// 	"/iteminstance/:id/delete",
// 	item_instance_controller.iteminstance_delete_get
// );

// // POST request to delete ItemInstance.
// router.post(
// 	"/iteminstance/:id/delete",
// 	item_instance_controller.iteminstance_delete_post
// );

// // GET request to update ItemInstance.
// router.get(
// 	"/iteminstance/:id/update",
// 	item_instance_controller.iteminstance_update_get
// );

// // POST request to update ItemInstance.
// router.post(
// 	"/iteminstance/:id/update",
// 	item_instance_controller.iteminstance_update_post
// );

// GET request for one ItemInstance.
router.get("/iteminstance/:id", item_detail_controller.item_detail);

// // GET request for list of all ItemInstance.
// router.get("/iteminstances", item_instance_controller.iteminstance_list);

module.exports = router;
