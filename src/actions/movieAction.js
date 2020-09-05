import { SEARCH_MOVIE, GET_MOVIE, HANDLE_FAV } from './types';
import store from '../store';
import axios from 'axios';

const addFav = (movie) => {
    if (localStorage.getItem('fav_movies')) {
        const current_fav =  JSON.parse(localStorage.getItem('fav_movies'));
        const new_fav = [...current_fav, movie];
        localStorage.setItem('fav_movies', JSON.stringify(new_fav));
        return new_fav;
    } else {
        const new_fav = [movie];
        localStorage.setItem('fav_movies', JSON.stringify(new_fav));
        return new_fav;
    }
} 

const removeFav = (imdbID) => {
    const current_fav = JSON.parse(localStorage.getItem('fav_movies'));
    const new_fav = current_fav
        .filter(movie => movie.imdbID !== imdbID)
        .map(movie => { return movie })
    localStorage.setItem('fav_movies', JSON.stringify(new_fav));
    return new_fav;
}

const isFav = (imdbID) => {
    let result = false;
    if (localStorage.getItem('fav_movies')) {
        const current_fav =  JSON.parse(localStorage.getItem('fav_movies'));
        current_fav.map(movie => {
            if (movie.imdbID === imdbID) {
                if (movie.Fav) {
                    result = true
                }
            }
        })
    }
    return result;
}

export const searchMovie = (title) => dispatch => {
    axios.get(`http://www.omdbapi.com/?apikey=61a7922a&s=${title}`)
    .then(res => {
        console.log(res)
        if (res.data.Response === "True"){
            let raw_movies = res.data.Search;
            let movies = [];
            for (let i = 0; i < raw_movies.length; i++) {
                let movie = {
                    Poster: raw_movies[i].Poster,
                    Title: raw_movies[i].Title,
                    Type: raw_movies[i].Type,
                    Year: raw_movies[i].Year,
                    imdbID: raw_movies[i].imdbID,
                    Fav: isFav(raw_movies[i].imdbID)
                }
                movies.push(movie);
            }
            dispatch({
                type: SEARCH_MOVIE,
                payload: movies
            })
            console.log(movies)
        }
    })
    .catch(err => {
        console.log('eerrrror', err)
    })
}

export const getMovie = (imdbID) => dispatch => {
    axios.get(`http://www.omdbapi.com/?apikey=61a7922a&i=${imdbID}`)
    .then(res => {
        console.log(res.data)
        dispatch({
            type: GET_MOVIE,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err)
    })
}

export const handleFav = (imdbID) => dispatch => {
    const state = store.getState();
    const new_movies = state.data.movies.map( (movie) => {
        if (movie.imdbID === imdbID) {
            if (movie.Fav === true) {
                // remove favorite
                movie.Fav = false;
                removeFav(movie.imdbID)
            } else {
                // adding favorite
                movie.Fav = true
                addFav(movie);
            }
            return movie
        } else {
            return movie
        }
    })
    dispatch({
        type: HANDLE_FAV,
        payload: new_movies
    })
}
