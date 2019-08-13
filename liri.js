require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var input1 = process.argv[2];
var input2 = process.argv[3];
var input3 = process.argv[4];
var queryURL1 = "https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=codingbootcamp"
// var queryURL2 = "https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx"
var queryUrl = "http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&apikey=trilogy";
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
    case "dwit":
        doWhatSay();
        break;
}
function concert() {
    axios.get(queryURL1).then(
        function (response) {
            console.log(response)
            // console.log(JSON.stringify(response, null, 2));
        })
}
function spotifySong() {
    spotify.search({ type: input2, query: input3, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.name);
        console.log(JSON.stringify(data, null, 2));
    });

}
function movie() {
    request(queryUrl, function (error, response, body) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("Rating: " + JSON.parse(body).imdbRating);
        console.log("Produced in: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        if (error) {
            console.log('error');


        }
    });
}
function doWhatSay() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
      
        // Break the string down by comma separation and store the contents into the output array.
        var output = data.split(",");
      
        // Loop Through the newly created output array
        for (var i = 0; i < output.length; i++) {
      
          // Print each element (item) of the array/
          console.log(output[i]);
        }
      });
}