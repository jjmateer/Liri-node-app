require("dotenv").config();
var moment = require('moment');
moment().format();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require("request");
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
            // if (err) {
            //     return console.log('Error occurred: ' + err);
            // }
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
        }
    })
}

function movie() {
    request("http://www.omdbapi.com/?t=" + multWord + "&y=&plot=short&apikey=trilogy", function (err, response, body) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("Rating: " + JSON.parse(body).imdbRating);
        console.log("Produced in: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        if (err) {
            return console.log('Error occurred: ' + err);
        }
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
        spotify.search({ type: 'track', query: output[1], limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[i];
                console.log("Artist: " + songData.artists[0].name);
                console.log("Song Title: " + songData.name);
                console.log("Preview Track: " + songData.preview_url);
                console.log("Album: " + songData.album.name);
            }
        })

    });
}