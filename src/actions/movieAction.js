import { SEARCH_MOVIE, GET_MOVIE, HANDLE_FAV, GET_ALL_FAV_MOVIES, UPDATE_FAV } from './types';
import store from '../store';
import axios from 'axios';

const addFav = (movie) => {
    if (localStorage.getItem('fav_movies')) {
        const current_fav =  JSON.parse(localStorage.getItem('fav_movies'));
        const new_fav = [...current_fav, movie];
        localStorage.setItem('fav_movies', JSON.stringify(new_fav));
    } else {
        const new_fav = [movie];
        localStorage.setItem('fav_movies', JSON.stringify(new_fav));
    }
} 

const removeFav = (imdbID) => {
    const current_fav = JSON.parse(localStorage.getItem('fav_movies'));
    const new_fav = current_fav
        .filter(movie => movie.imdbID !== imdbID)
        .map(movie => { return movie })
    localStorage.setItem('fav_movies', JSON.stringify(new_fav));
}

const isFav = (imdbID) => {
    let result = false;
    if (localStorage.getItem('fav_movies')) {
        const current_fav =  JSON.parse(localStorage.getItem('fav_movies'));
        current_fav.forEach(movie => {
            if (movie.imdbID === imdbID) result = true
        });
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
        alert('Error:' + err)
        console.log('eerrrror', err)
    })
}

export const getMovie = (imdbID) => dispatch => {
    axios.get(`https://www.omdbapi.com/?apikey=61a7922a&i=${imdbID}`)
    .then(res => {
        console.log(res.data)
        dispatch({
            type: GET_MOVIE,
            payload: res.data
        })
    })
    .catch(err => {
        alert('Error:' + err)
        console.log(err)
    })
}

export const handleFav = (imdbID) => dispatch => {
    console.log('handle from action called');
    const state = store.getState()
    const new_movies = state.data.movies.map( (movie) => {
        if (movie.imdbID === imdbID) {
            if (movie.Fav === true) {
                // remove favorite
                movie.Fav = false;
                removeFav(movie.imdbID)
            } else {
                // adding favorite
                console.log('handle from action called 2')
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

export const getAllFavMovies = () => dispatch => {
    if (localStorage.getItem('fav_movies')) {
        const fav_movies = JSON.parse(localStorage.getItem('fav_movies'));
        dispatch({
            type: GET_ALL_FAV_MOVIES,
            payload: fav_movies
        })
    }
}

export const handleFavList = (imdbID) => dispatch => {
    if (localStorage.getItem('fav_movies')) {
        const fav_movies = JSON.parse(localStorage.getItem('fav_movies'));
        const new_fav = fav_movies.filter(movie => movie.imdbID !== imdbID).map(movie => {
            return movie
        })
        localStorage.setItem('fav_movies', JSON.stringify(new_fav));
        dispatch({
            type: UPDATE_FAV,
            payload: new_fav
        })
    }
}