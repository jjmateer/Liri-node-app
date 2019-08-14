require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var nodeArgs = process.argv;
var input1 = process.argv[2];
var input2 = process.argv[3];
var queryURL1 = "https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=codingbootcamp"
// var queryURL2 = "https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx"
var queryUrl = "http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&apikey=trilogy";
// var SongName = "";
// for (var i = 3; i < nodeArgs.length; i++) {
//     if (i > 3 && i < nodeArgs.length) {
//         SongName = SongName + "+" + nodeArgs[i];
//     }
//     else {
//         SongName += nodeArgs[i];
//     }
// }
switch (input1) {
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
    axios.get(queryURL1).then(
        function (body) {
            console.log(body)

        })
}
function spotifySong() {
    spotify.search({ type: 'track', query: input2, limit: 1 }, function (err, data) {
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
}

function movie() {
    request(queryUrl, function (err, response, body) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("Rating: " + JSON.parse(body).imdbRating);
        console.log("Produced in: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        if (err) {
            console.log('err');
        }
    });
}
function doWhatSay() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var output = data.split(",");
        for (var i = 0; i < output.length; i++) {
            console.log(output[i]);
        }
        spotify.search({ type: "track", query: output[1], limit: 1 }, function (err, data) {
            if (err) {
                return console.log('err occurred: ' + err);
            }
            console.log(data.name);
            console.log(JSON.stringify(data, null, 2));
        });

    });
}