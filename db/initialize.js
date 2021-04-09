// @ts-check
const {getSession} = require('./dbUtils');
const Genres = require('../models/actions/genres');
const {
  ACTORS: {actors},
  DIRECTORS_OF_FILMS: {directors},
  GENRES: {genres},
  MOVIES: {movies},
  MOVIES_WITH_GENRES: {moviesWithGenres},
} = require('../data');

const addGenres = async () => {
  const session = getSession();
  for (const genre of genres) {
    /** @ts-ignore */
    await session.query('create (g:Genre{name:$genre}) ', genre);
  }
};

const setMovies = async () => {
  const session = getSession();

  movies.forEach((movie) => {
    for (const field in movie) {
      if (movie[field].low) movie[field] = movie[field].low;
    }
  });

  for (const {
    url,
    id,
    languages,
    title,
    countries,
    budget,
    duration,
    imdbId,
    imdbRating,
    imdbVotes,
    movieId,
    plot,
    poster,
    poster_image,
    released,
    revenue,
    runtime,
    tagline,
    tmdbId,
    year,
  } of movies) {
    await session.query(
      'create (m:Movie {url: $url,' +
        'id:$id, ' +
        'languages:$languages,' +
        ' title:$title,' +
        ' countries:$countries,' +
        ' budget:$budget, ' +
        'duration:$duration,' +
        ' imdbId:$imdbId, ' +
        'imdbRating:$imdbRating,' +
        ' imdbVotes:$imdbVotes, ' +
        'movieId:$movieId, ' +
        'plot:$plot, ' +
        'poster:$poster,' +
        ' poster_image:$poster_image, ' +
        'released:$released, ' +
        'revenue:$revenue,' +
        ' runtime:$runtime,' +
        ' tagline:$tagline, ' +
        'tmdbId:$tmdbId, ' +
        'year:$year})',
      {
        /** @ts-ignore */
        url,
        id,
        languages,
        title,
        countries,
        budget,
        duration,
        imdbId,
        imdbRating,
        imdbVotes,
        movieId,
        plot,
        poster,
        poster_image,
        released,
        revenue,
        runtime,
        tagline,
        tmdbId,
        year,
      },
    );
  }
};

const setDirectorsWithRelationshipToMovie = async () => {
  const session = getSession();

  directors.forEach((director) => {
    const {born, died} = director.director.properties;
    /** @ts-ignore */
    director.director.properties.born = [];
    if (died) {
      /** @ts-ignore */
      director.director.properties.died = [];
    }

    for (const field in born) {
      if (born) {
        director.director.properties.born.push(born[field].low);
      }

      if (died) {
        director.director.properties.died.push(died[field].low);
      }
    }
  });

  for (const {
    director: {
      properties: {bio, born, bornIn, imdbId, name, poster, tmdbId, url},
    },
    movieTitle,
  } of directors) {
    await session.query(
      'MATCH (m:Movie) ' +
        'WHERE m.title=$movieTitle ' +
        'CREATE (d:Director :Person' +
        '{' +
        'bio:$bio,' +
        'born:$born,' +
        'bornIn:$bornIn,' +
        'imdbId:$imdbId,' +
        'name:$name,' +
        'poster:$poster,' +
        'tmdbId:$tmdbId,' +
        'url:$url' +
        '}' +
        ')-[r:DIRECTED]->(m)',
      {
        /** @ts-ignore */
        bio,
        born,
        bornIn,
        imdbId,
        name,
        poster,
        tmdbId,
        url,
        movieTitle,
      },
    );
  }
};

const setActorsWithRelationshipToMovie = async () => {
  const session = getSession();

  actors.forEach((actor) => {
    const {born, died} = actor.actor.properties;
    /** @ts-ignore */
    actor.actor.properties.born = [];
    /** @ts-ignore */
    if (died) actor.actor.properties.died = [];

    for (const field in born) {
      if (born) {
        actor.actor.properties.born.push(born[field].low);
      }

      if (died) {
        actor.actor.properties.died.push(died[field].low);
      }
    }
  });

  for (const {
    actor: {
      properties: {bio, born, bornIn, died, imdbId, name, poster, tmdbId, url},
    },
    movieTitle,
    role,
  } of actors) {
    await session.query(
      'MATCH (m:Movie) ' +
        'WHERE m.title=$movieTitle ' +
        'CREATE (a:Actor :Person' +
        '{' +
        'bio:$bio,' +
        'born:$born,' +
        'bornIn:$bornIn,' +
        'died:$died,' +
        'imdbId:$imdbId,' +
        'name:$name,' +
        'poster:$poster,' +
        'tmdbId:$tmdbId,' +
        'url:$url' +
        '}' +
        ')-[r:ACTED_IN_MOVIE {role: $role}]->(m)',
      {
        /** @ts-ignore */
        bio,
        born,
        bornIn,
        died,
        imdbId,
        name,
        poster,
        tmdbId,
        url,
        movieTitle,
        role,
      },
    );
  }
};

const setGenresToMovies = async () => {
  const session = getSession();
  for (const {genre, movieTitle} of moviesWithGenres) {
    session.query(
      'MATCH (g:Genre), (m:Movie)\n' +
        'WHERE g.name = $genre AND m.title = $movieTitle\n' +
        'CREATE (m)-[:IN_GENRE]->(g)\n',
      {
        // @ts-ignore
        genre,
        movieTitle,
      },
    );
  }
};

const initialize = async () => {
  const genres = await Genres.getAll(getSession());
  if (genres.length === 0) {
    console.log('Need to initialize');
    await addGenres();
    console.log('Added genres');
    await setMovies();
    console.log('Added movies');
    await setDirectorsWithRelationshipToMovie();
    console.log('Added relationships');
    await setActorsWithRelationshipToMovie();
    console.log('Added relationships2');
    await setGenresToMovies();
    console.log('Initialized');
  } else {
    console.log("Doesn't need to initialize");
  }
};

module.exports = {
  initialize,
  addGenres,
  setMovies,
  setDirectorsWithRelationshipToMovie,
  setActorsWithRelationshipToMovie,
  setGenresToMovies,
};
