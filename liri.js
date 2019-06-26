
require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

var axios = require("axios");


// node liri.js paul mc cartney
// ['node', 'liri.js', 'paul', 'mc', 'cartney']
// array.slice(2)
// * `concert-this`
// * `spotify-this-song`
// * `movie-this`
// * `do-what-it-says`
// node liri.js concert-this paul mc cartney
// node liri.js movie-this the incredibles

const command = process.argv[2];

if (command === "concert-this") {
  var artist = process.argv.slice(3).join(" ");
  searchForConcerts(artist);
} else if (command === "movie-this") {
  var movie = process.argv.slice(3).join(" ");
  searchForMovie(movie);
}

// var Spotify = require('node-spotify-api');
// var spotify = new Spotify({
//   id: keys.spotify.id,
//   secret: keys.spotify.secret
// });

// if (process.argv[2] === "spotify-this-song") {
//   var track = process.argv.slice(3).join(" ");
//   axios.get("GET https://api.spotify.com/v1/search"+ track)
// }

function searchForMovie(movie) {
  axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&" + keys.ombd.key).then(function (response) {
    if (response.data.length > 0) {
      console.log("Your movie information: ");
      for (let i = 0; i < response.data.length; i++) {
        const event = response.data[i];
        console.log(response.data[i].title + " " + response.data[i].year + " " + response.data[i].imdbRating + " " + response.data[i].Ratings[1].value + " " + response.data[i].country + " " + response.data[i].Ratings[1].language + " " + response.data[i].plot + " " + response.data[i].actors);
      }
    } else {
      console.log("No movie available :(");
    }
  })
    .catch(function (error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

function searchForConcerts(artist) {
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.bandsInTown.clientId).then(function (response) {
    if (response.data.length > 0) {
      console.log("Artist Events: ");
      for (let i = 0; i < response.data.length; i++) {
        const event = response.data[i];
        console.log(event.datetime + " " + event.venue.name + " " + event.venue.city + " " + event.venue.country);
      }
    } else {
      console.log("No shows coming up :(");
    }
  })
    .catch(function (error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}
