require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var input1 = process.argv[2];
var input2 = process.argv[3];
var input3 = process.argv[4];
var queryURL1 = "https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=codingbootcamp"
// var queryURL2 = "https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx"
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
        break;
    //do-what-it-says
    case "do-what-it-says":
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