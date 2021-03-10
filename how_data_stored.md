# RedisGraph demo

Showcases how to use RedisGraph BE in NodeJS

## How it works
### How the data is stored:

* The data is stored in various keys and various relationships.
    * There are 5 types ofdata
        * User
        * Director
        * Actor
        * Genre
        * Movie
###Each type has its own properties

   * Actor
        * id
        * bio
        * born 
        * bornIn
        * imdbId
        * name
        * poster
        * tmdbId
        * url
   * Genre
        * id
        * name
   * Director
        * id
        * born
        * bornIn
        * imdbId
        * name
        * tmdbId
        * url
   * User
        * id
        * username
        * password
        * api_key
   * Movie
        * id
        * url
        * languages
        * countries
        * budget
        * duration
        * imdbId
        * imdbRating
        * indbVotes
        * movieId
        * plot
        * poster
        * poster_image
        * released
        * revenue
        * runtime
        * tagline
        * tmdbId
        * year     
###And there are 4 types of relationship:
   * User-`RATED`->Movie
   * Director-`DIRECTED`->Movie
   * Actor-`ACTED_IN_MOVIE`->Movie
   * Movie-`IN_GENRE`->Genre
    
###How to find data in redisGraph
 To get some data we can use cyphers.Examples:
 * To get all data: `Match (all) Return all`
 * To get all data of some type: `Match (variable:Type) return variable`, where `variable` is any variable, `Type` is any type from db
 * To get some fields of some type `Match (variable:Type) return variable.field` , where `field` is field you need to return
 * To get some data by params `Match (variable:Type)  where variable.field=xxx return variable` 
 * To get some data with relationships `Match (variable:Type)-[ACTION]->(variable2:Type2) return variable,variable2`
 
 You can combine different types of queries to get exactly that data you need
 
 
