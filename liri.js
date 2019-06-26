//// requiring our keys, axios and dotenv module exported from keys.js
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");

//command would be what the user ask liri to do. ex: 'concert-this'.
var command = process.argv[2];

//argument is whatever the user is searching for after typing the command
var argument = process.argv.slice(3).join(" ");

//links commands with the function liri would be responding with
if (command === "concert-this") {
  searchForConcerts(argument);
} else if (command === "movie-this") {
  searchForMovie(argument);
} else if (command === "spotify-this-song") {
  searchForTrack(argument);
} else if (command === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (error, data) {

    if (error) {
      return console.log(error);
    }
    // console.log(data);
    var dataArr = data.split(",");
    console.log(dataArr);

  });
}

//this function is the one searching for the track the user enters using the spotify api and console.logs the information we we want to show with the app. 
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
}

// this function is searching for the movie information using the omdb api by getting the information using axios
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

//this function is searching for concerts using the bands in town api, a for loop was used to show all the results of 
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
