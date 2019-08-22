require("dotenv").config();
var moment = require('moment');
moment().format();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
// var request = require("request");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var nodeArgs = process.argv;
var input = process.argv[2];
var multWord = "";
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        multWord = multWord + "+" + nodeArgs[i];
    }
    else {
        multWord += nodeArgs[i];
    }
}
switch (input) {
    //concert-this
    case "ct":
        concert();
        break;
    //spotify-this-song
    case "sts":
        spotifySong()
        break;
    //movie-this
    case "mt":
        movie()
        break;
    //do-what-it-says
    case "dwis":
        doWhatSay();
        break;
}
function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + multWord + "/events?app_id=codingbootcamp").then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log("Searched: " + multWord)
                console.log("Venue Name: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Date of Event: " + moment(response.data[i].datetime).format("L"));
                console.log('=======================================')
            }
        })
}
function spotifySong() {
    spotify.search({ type: 'track', query: multWord, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (var i = 0; i < data.tracks.items.length; i++) {
            var songData = data.tracks.items[i];
            console.log('Searched: ' + multWord)
            console.log("Artist: " + songData.artists[0].name);
            console.log("Song Title: " + songData.name);
            console.log("Preview Track: " + songData.preview_url);
            console.log("Album: " + songData.album.name);
            console.log('=======================================')
        }
    })
}

function movie() {
    axios.get("http://www.omdbapi.com/?t=" + multWord + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("Title: " + response.data.Title)
            console.log("Released: " + response.data.Year)
            console.log("IMDB rating: " + response.data.imdbRating)
            console.log("Rotten tomatoes rating: " + response.data.tomatoRating)
            console.log("Plot: " + response.data.Plot)
            console.log("Actors: " + response.data.Actors)
            //Used request instead of axios at first. Works with same url too.
        // console.log("Title: " + JSON.parse(body).Title);
        // console.log("Release Year: " + JSON.parse(body).Year);
        // console.log("Rating: " + JSON.parse(body).imdbRating);
        // console.log("Produced in: " + JSON.parse(body).Country);
        // console.log("Language: " + JSON.parse(body).Language);
        // console.log("Plot: " + JSON.parse(body).Plot);
        // console.log("Actors: " + JSON.parse(body).Actors);
        // if (err) {
        //     return console.log('Error occurred: ' + err);
        // }
    });
}
function doWhatSay() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var output = data.split(",");
        for (var i = 0; i < output.length; i++) {
            console.log(output[i]);
        }
        if(output[0] === 'spotify-this-song') {
            multWord = output[1];
            spotifySong();
        }
        

    });
}