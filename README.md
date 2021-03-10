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
        
    * and there are 4 types of relationship:
        * User-`RATED`->Movie
        * Director-`DIRECTED`->Movie
        * Actor-`ACTED_IN_MOVIE`->Movie
        * Movie-`IN_GENRE`->Genre
        
   
Each type of data has its own properties, which you can see in file `How_data_stored.md`
###How set data to db
* host:port/data
    * `post` /movies -set movies to db (do first when you connected to your redis)   
    * `post` /genres -set genres to db (do after adding movies to db )   
    * `post` /movies_genres -set genres relationships to movies    
    * `post` /actors -set actors and their relationships to movies     
    * `post` /directors -set directors and their relationships to movies   
### How the data is accessed:
To get access to data we use REST. 
Below you can see list of endpoints and what are they doing
* host:port/auth
    * `post` /register - sign up
    * `post` /login - sign in(return token)
* host:port/movies
    * `get` / - list of movies
    * `get` /rated -get list og movies rated by user
    * `get` /:id -get movie by id with all its info 
    * `get` /genre/:id -get movie by genre
    * `get` /daterange/:start/:end -find movies by date range
    * `get` /directed_by/:id -find movies by director
    * `get` /acted_in_by/:id -find movies by actor
    * `get` /written_by/:id -find movies by writer(actually returns nothing because there are any writers in db )
    * `post` /:id/rate - rate movie
    * `delete` /:id/rate - delete rate from movie
* host:port/people
    * `get` / - list of users
    * `get` /me - info of current user
    * `get` /:id - get user by id
* host:port/genres
    * `get` / - list of genres
 

## Hot to run it locally?

### Prerequisites

- Node - v13.14.0
- NPM - v7.6.0

### Local installation

Go to main folder and then:

```
# set redis data inside
.env

# install dependencies
npm install

# Run server
node app.js
```

## Deployment

App already deployed on heroku("https://redis-fe.herokuapp.com/"), but if you want to deploy it again see the button vbelow

### Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://gitlab.com/teamProjects/neo4j-movie-app)
