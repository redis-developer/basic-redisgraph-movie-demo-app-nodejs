import {AXIOS} from '../config';

class UserService {
    async signIn(user) {
        try{
            const response = await AXIOS.post('/auth/login', user);
            return response;
        } catch (e) {
            console.error(e);
        }
    };

    async signUp(user) {
        try{
            const response = await AXIOS.post('/auth/register', user);
            return response;
        } catch (e) {
            console.error(e)
        }

    };

    async ratedFilms() {
        const userToken = await localStorage.getItem('token');
        const { data } = await AXIOS.get('/movies/rated', {
            headers: {
                'Authorization': `Token ${userToken}`
            }
        })
        return data;
    }
}

export const userService = new UserService();


