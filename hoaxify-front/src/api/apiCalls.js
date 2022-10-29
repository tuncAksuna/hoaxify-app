import axios from "axios"

export const signUp = (body) => {

    const BASE_PATH = '/api/1.0/hoaxify';

    return axios.post(BASE_PATH + '/users', body)

}

export const changeLanguage = (language) => {
    axios.defaults.headers['accept-language'] = language;
}

