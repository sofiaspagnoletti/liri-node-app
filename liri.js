
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
} else if (command === "spotify-this-song") {
  var track = process.argv.slice(3).join(" ");
  searchForTrack(track);
}

function searchForTrack(track) {
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });
  spotify.search({ type: 'track', query: track }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else {
      console.log("Your song information: ");
      console.log("Song's name: " + data.tracks.items[0].name);
      console.log("Preview of the song: " + data.tracks.items[0].external_urls.spotify);
      console.log("Album: " + data.tracks.items[0].album.name);
      for (let i = 0; i < data.tracks.items[0].artists.length; i++) {
        console.log("Artist: " + data.tracks.items[0].artists[i].name);
      }
    }
  });


  // if (process.argv[2] === "spotify-this-song") {
  //   var track = process.argv.slice(3).join(" ");
  //   axios.get("https://api.spotify.com/v1/search" + track)
  // }
}


function searchForMovie(movie) {
  axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + keys.ombd.key).then(function (response) {
    if (response.data !== undefined) {
      console.log("Your movie information: ");
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("ImdbRating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country where the movie was produced: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    }
    else {
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
        console.log("Date of the Event: " + event.datetime);
        console.log("Name of the venue: " + event.venue.name);
        console.log("Venue location: " + event.venue.city + " " + event.venue.country);
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
