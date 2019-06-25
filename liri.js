
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

if (process.argv[2] === "concert-this") {
  var artist = process.argv.slice(3).join(" ");

  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.bandsInTown.clientId).then(
    function (response) {
      if (response.data.length > 0) {
        console.log("Artist Events: ")
        for (let i = 0; i < response.data.length; i++) {
          const event = response.data[i];
          console.log(response.data[i].datetime + " " + response.data[i].venue.name + " " + response.data[i].venue.city + " " +response.data[i].venue.country);
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
};

if (process.argv[2] === "spotify-this-song") {
  var song = process.argv.slice(3).join(" ");
}

if (process.argv[2] === "movie-this") {
  var movie = process.argv.slice(3).join(" ");

  axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  })
}




