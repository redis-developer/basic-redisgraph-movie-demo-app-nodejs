import {AXIOS} from '../config';
import {
  useCallback,
  useContext,
  useEffect,
  useState,
  createContext,
} from 'react';

class UserService {
  async signIn(user) {
    try {
      const response = await AXIOS.post('/auth/login', user);
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  async signUp(user) {
    try {
      const response = await AXIOS.post('/auth/register', user);
      return response;
    } catch (e) {
      console.error(e);
      return {error: e.response.data};
    }
  }

  async ratedFilms() {
    const userToken = await localStorage.getItem('token');

    const {data} = await AXIOS.get('/movies/rated', {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });
    return data;
  }
}

const userService = new UserService();

export const RatedFilmsContext = createContext({
  adjustRating: (films) => films,
  revalidate: () => {},
  loading: false,
});

const useRatedFilms = () => useContext(RatedFilmsContext);

/**
 * This hook provides a helper method for adjusting the overall films rating
 * based on the user-specific ratings.
 */
const useRatedFilms2 = () => {
  const [ratedFilms, setRatedFilms] = useState(() => []);
  const [ratedFilmsLoading, setRatedFilmsLoading] = useState(true);
  console.log(ratedFilms);
  useEffect(() => {
    /**
     * The only problems comes that we don't employ caching for now
     * and that results in excessive API requests.
     */
    userService
      .ratedFilms()
      .then((films) => {
        setRatedFilmsLoading(false);
        setRatedFilms(films);
      })
      .catch((e) => {
        setRatedFilmsLoading(false);
      });
  }, []);

  const revalidate = useCallback(() => {
    setRatedFilmsLoading(true);
    userService.ratedFilms().then((films) => {
      setRatedFilmsLoading(false);
      setRatedFilms(films);
    });
  }, []);

  const findMyRating = useCallback(
    (filmId) => ratedFilms.filter((x) => +x.id === +filmId).pop() ?? null,
    [ratedFilms],
  );

  const adjustRating = useCallback(
    (films) => {
      return films.map((film) => {
        const rated = findMyRating(film.id);
        if (rated === null) {
          return film;
        }
        const myRating = rated.my_rating;
        /** Adjust the rating based on user's personal rating */
        return {
          ...film,
          imdbRating:
            Math.floor((film.imdbRating + (myRating - 5) * 0.2) * 10) / 10,
        };
      });
    },
    [findMyRating],
  );

  return {
    ratedFilms,
    ratedFilmsLoading,
    adjustRating,
    revalidate,
  };
};

export {userService, useRatedFilms, useRatedFilms2};
