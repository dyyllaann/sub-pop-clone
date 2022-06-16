#! /usr/bin/env node

console.log(
	"This script populates some test items and artists to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Artist = require("./models/artist");
var Item = require("./models/item");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var artists = [];
var items = [];

function artistCreate(name, cb) {
	artistdetail = { name };

	var artist = new Artist(artistdetail);

	artist.save(function (err) {
		if (err) {
			cb(err, null);
			return;
		}
		console.log("New Artist: " + artist);
		artists.push(artist);
		cb(null, artist);
	});
}

// function genreCreate(name, cb) {
// 	var genre = new Genre({ name: name });

// 	genre.save(function (err) {
// 		if (err) {
// 			cb(err, null);
// 			return;
// 		}
// 		console.log("New Genre: " + genre);
// 		genres.push(genre);
// 		cb(null, genre);
// 	});
// }

function itemCreate(
	title,
	description,
	image,
	format,
	price,
	stockAmount,
	label,
	artist,
	length,
	genre,
	releaseDate,
  cb
) {
	itemdetail = {
		title: title,
		description: description,
		image: image,
		format: format,
		price: price,
		stockAmount: stockAmount,
		label: label,
		artist: artist,
		length: length,
		genre: genre,
		releaseDate: releaseDate,
	};
	if (genre != false) itemdetail.genre = genre;

	var item = new Item(itemdetail);
	item.save(function (err) {
		if (err) {
			cb(err, null);
			return;
		}
		console.log("New Item: " + item);
		items.push(item);
		cb(null, item);
	});
}

// function bookInstanceCreate(book, imprint, due_back, status, cb) {
// 	bookinstancedetail = {
// 		book: book,
// 		imprint: imprint,
// 	};
// 	if (due_back != false) bookinstancedetail.due_back = due_back;
// 	if (status != false) bookinstancedetail.status = status;

// 	var bookinstance = new BookInstance(bookinstancedetail);
// 	bookinstance.save(function (err) {
// 		if (err) {
// 			console.log("ERROR CREATING BookInstance: " + bookinstance);
// 			cb(err, null);
// 			return;
// 		}
// 		console.log("New BookInstance: " + bookinstance);
// 		bookinstances.push(bookinstance);
// 		cb(null, book);
// 	});
// }

function createArtists(cb) {
// function createArtists() {
  async.series(
    [
      function (callback) {
        artistCreate("Lorelle Meets The Obsolete", callback);
      },
      function (callback) {
        artistCreate("The Postal Service", callback);
      },
    ],
    // optional callback
    cb
  )
}

// function createGenreAuthors(cb) {
// 	async.series(
// 		[
// 			function (callback) {
// 				authorCreate("Patrick", "Rothfuss", "1973-06-06", false, callback);
// 			},
// 			function (callback) {
// 				authorCreate("Ben", "Bova", "1932-11-8", false, callback);
// 			},
// 			function (callback) {
// 				authorCreate("Isaac", "Asimov", "1920-01-02", "1992-04-06", callback);
// 			},
// 			function (callback) {
// 				authorCreate("Bob", "Billings", false, false, callback);
// 			},
// 			function (callback) {
// 				authorCreate("Jim", "Jones", "1971-12-16", false, callback);
// 			},
// 			function (callback) {
// 				genreCreate("Fantasy", callback);
// 			},
// 			function (callback) {
// 				genreCreate("Science Fiction", callback);
// 			},
// 			function (callback) {
// 				genreCreate("French Poetry", callback);
// 			},
// 		],
// 		// optional callback
// 		cb
// 	);
// }

function createItems(cb) {
	async.parallel(
		[
			function (callback) {
				itemCreate(
					"De Facto",
					"Description not available.",
					"https://f4.bcbits.com/img/a3658756159_10.jpg",
					"LP",
					25,
          10,
          "Registros El Derrumbe",
          // "Lorelle Meets The Obsolete",
          artists[0],
          "",
          "Alternative/Indie",
          "January 11, 2019",
					callback
				);
			},
			function (callback) {
				itemCreate(
					"Everything Will Change",
					`The Postal Service’s Everything Will Change live album will be available digitally for the first time on December 4th, 2020 worldwide through Sub Pop. The beloved band’s 15-track set, which features fan favorites ”Such Great Heights,” “The District Sleeps Alone Tonight,” “Sleeping In” and “Natural Anthem,” along with a cover of Beat Happening’s “Our Secret” and a rare live take on Dntel’s “(This Is) The Dream of Evan and Chan,” was performed live at the Greek Theatre in Berkeley, CA, during their 2013 reunion tour. This 2020 release of Everything Will Change was remixed by Don Gunn and remastered by Dave Cooley earlier this year, from the recordings that were originally released as part of the the 2014 concert film. \n
 Relive that night by watching live performances of “The District Sleeps Alone Tonight,” and “Natural Anthem” now. \n
 A collaboration between Benjamin Gibbard (of Death Cab for Cutie) and Jimmy Tamborello (from Dntel), with Rilo Kiley’s Jenny Lewis, The Postal Service released Give Up, their one and only album, in 2003. That record went on to sell over a million copies and most of the band’s fans never had the chance to see them perform live. In 2013 and in celebration of the 10-year anniversary of Give Up, Sub Pop released an expanded, deluxe version of that album and the band reunited to tour the world.`,
					"https://cdn.shopify.com/s/files/1/0110/1882/9920/products/thepostalservice-everythingwillchange-3000px_740x.jpg?v=1605658066",
					"Digital",
					10,
					50,
					"Sub Pop",
					artists[1],
					"",
					"Alternative/Indie",
					"December 04, 2020",
					callback
				);
			}

			// function (callback) {
			// 	bookCreate(
			// 		"The Wise Man's Fear (The Kingkiller Chronicle, #2)",
			// 		"Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.",
			// 		"9788401352836",
			// 		authors[0],
			// 		[genres[0]],
			// 		callback
			// 	);
			// },
			// function (callback) {
			// 	bookCreate(
			// 		"The Slow Regard of Silent Things (Kingkiller Chronicle)",
			// 		"Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.",
			// 		"9780756411336",
			// 		authors[0],
			// 		[genres[0]],
			// 		callback
			// 	);
			// },
			// function (callback) {
			// 	bookCreate(
			// 		"Apes and Angels",
			// 		"Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...",
			// 		"9780765379528",
			// 		authors[1],
			// 		[genres[1]],
			// 		callback
			// 	);
			// },
			// function (callback) {
			// 	bookCreate(
			// 		"Death Wave",
			// 		"In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",
			// 		"9780765379504",
			// 		authors[1],
			// 		[genres[1]],
			// 		callback
			// 	);
			// },
			// function (callback) {
			// 	bookCreate(
			// 		"Test Book 1",
			// 		"Summary of test book 1",
			// 		"ISBN111111",
			// 		authors[4],
			// 		[genres[0], genres[1]],
			// 		callback
			// 	);
			// },
			// function (callback) {
			// 	bookCreate(
			// 		"Test Book 2",
			// 		"Summary of test book 2",
			// 		"ISBN222222",
			// 		authors[4],
			// 		false,
			// 		callback
			// 	);
			// },
		],
		// optional callback
		cb
	);
}

// function createBookInstances(cb) {
// 	async.parallel(
// 		[
// 			function (callback) {
// 				bookInstanceCreate(
// 					books[0],
// 					"London Gollancz, 2014.",
// 					false,
// 					"Available",
// 					callback
// 				);
// 			},
// 			function (callback) {
// 				bookInstanceCreate(
// 					books[1],
// 					" Gollancz, 2011.",
// 					false,
// 					"Loaned",
// 					callback
// 				);
// 			},
// 			function (callback) {
// 				bookInstanceCreate(
// 					books[2],
// 					" Gollancz, 2015.",
// 					false,
// 					false,
// 					callback
// 				);
// 			},
// 			function (callback) {
// 				bookInstanceCreate(
// 					books[3],
// 					"New York Tom Doherty Associates, 2016.",
// 					false,
// 					"Available",
// 					callback
// 				);
// 			},
// 			function (callback) {
// 				bookInstanceCreate(
// 					books[3],
// 					"New York Tom Doherty Associates, 2016.",
// 					false,
// 					"Available",
// 					callback
// 				);
// 			},
// 			function (callback) {
// 				bookInstanceCreate(
// 					books[3],
// 					"New York Tom Doherty Associates, 2016.",
// 					false,
// 					"Available",
// 					callback
// 				);
// 			},
// 			function (callback) {
// 				bookInstanceCreate(
// 					books[4],
// 					"New York, NY Tom Doherty Associates, LLC, 2015.",
// 					false,
// 					"Available",
// 					callback
// 				);
// 			},
// 			function (callback) {
// 				bookInstanceCreate(
// 					books[4],
// 					"New York, NY Tom Doherty Associates, LLC, 2015.",
// 					false,
// 					"Maintenance",
// 					callback
// 				);
// 			},
// 			function (callback) {
// 				bookInstanceCreate(
// 					books[4],
// 					"New York, NY Tom Doherty Associates, LLC, 2015.",
// 					false,
// 					"Loaned",
// 					callback
// 				);
// 			},
// 			function (callback) {
// 				bookInstanceCreate(books[0], "Imprint XXX2", false, false, callback);
// 			},
// 			function (callback) {
// 				bookInstanceCreate(books[1], "Imprint XXX3", false, false, callback);
// 			},
// 		],
// 		// Optional callback
// 		cb
// 	);
// }

async.series(
	[
    // createGenreAuthors, 
    createArtists,
    createItems, 
    // createBookInstances
  ],
	// Optional callback
	function (err, results) {
		if (err) {
			console.log("FINAL ERR: " + err);
		// } else {
		// 	console.log("ITEMInstances: " + iteminstances);
		}
		// All done, disconnect from database
		mongoose.connection.close();
	}
);
