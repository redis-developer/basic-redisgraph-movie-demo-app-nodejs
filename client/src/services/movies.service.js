import {AXIOS} from "../config";

class MoviesService {

    async getMoviesWithGenre(id) {
        const {data} = await AXIOS.get(`/movies/genre/${id}`);
        return data.movies;
    }

    async getMovieById(id) {
        const userToken = await localStorage.getItem('token');
        const {data} = await AXIOS.get(`/movies/${id}`, {
            headers: {
                'Authorization': `Token ${userToken}`
            }
        })
        return data;
    }

    async rateMovie(id, number) {
        const userToken = await localStorage.getItem('token');
        return AXIOS.post(`/movies/${id}/rate`,
            {
                rating: number
            },
            {
                headers: {
                    'Authorization': `Token ${userToken}`
                }
            }
        )
    }
}

export const moviesService = new MoviesService();
