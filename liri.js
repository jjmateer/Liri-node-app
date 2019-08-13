require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var spotify = keys.spotify;
var input1 = process.argv[2];
var input2 = process.argv[3];
var queryURL = "https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=codingbootcamp"
switch (input1) {
    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        break;

    case "movie-this":
        break;

    case "do-what-it-says":
        break;
}
function concert() {
    axios.get(queryURL).then(
        function (response) {
            console.log(response)
            // console.log(JSON.stringify(response, null, 2));
        })
}
function spotifySong() {
    
}