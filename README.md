# Liri-node-app

This app allows users to search multiple API's and get info on concert data, spotify song info, or info on movies. The user can choose which search to use by typing: "node liri ct <artist name>" for the local concert search, "node liri sts <spotify song>" for the spotify search, "node liri mt <movie name> for the omdb search, or "node liri dwis" for 'do what I say' function which I will cover later. You may use multiple words in your searches.
  
The concert search uses the bandsintown API to search an artist using an axios request.
--I used a for loop to iterate through all of the responses and console log:                                                                                                                                          Current venues, 
                                                                           Locations, 
                                                                           Date of event
                                                                            

The spotify search requires the user to include their own .env file with the client id/client secret for their spotify developers app and search a song name.
--I limited the number of responses to 3 and used a for loop to iterate through them and console log:
                                                                                                    Arist, 
                                                                                                    Song name, 
                                                                                                    Preview URL, 
                                                                                                    Album

The movie search uses the omdb api to search a movie title using an axios request.
--A for loop was not necessary for this response due to the accuracy of the search. I simply console logged:
                                                                                                           Movie title, 
                                                                                                           Release year, 
                                                                                                           IMDB rating, 
                                                                                                           Plot, 
                                                                                                           Actors                                                                                                           
The 'do what I say' function reads the random.txt file and uses the string "I want it that way" for the spotifySearch function. This function is the same as the one in the spotify search above, but does not require to input a song name.                                                                                                      
                                                                                                    

 
