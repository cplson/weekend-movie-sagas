import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    // fetch all movies
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    // fetch this movie
    yield takeEvery('FETCH_THIS_MOVIE', fetchThisMovie);
}

// Saga to get the selected movie
function* fetchThisMovie(action){
    // get this movie
    console.log(action.payload);
    try{
        const thisMovie = yield axios.get((`/api/movie/${action.payload}`));
        const thisMovieGenres = yield axios.get((`api/genre/${action.payload}`));
        console.log('Movie recieved from db:', thisMovie.data[0], thisMovieGenres.data);
        yield put({
            type: 'SET_THIS_MOVIE',
            payload: thisMovie.data[0]
        })
        yield put({
            type: 'SET_GENRES',
            payload: thisMovieGenres.data
        })
    }catch(error){
        console.log('there was an error getting the selected movie from the db');
    }
}
function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            console.log('inside SET_GENRES');
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const selectedMovie = (state = {}, action) => {
    switch (action.type) {
        case 'SET_THIS_MOVIE':
            console.log('inside SET_THIS_MOVIE', action.type);
            return {title: action.payload.title,
                    poster: action.payload.poster,
                    description: action.payload.description};
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        selectedMovie
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
