import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../Details/Details';
import { useHistory } from 'react-router-dom';
import './MovieList.css'


// Component to display all movies
function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    // on page load, send dispatch in order to get movies array from the db
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    // Display all movies
    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <button
                                onClick={
                                    () => {
                                        dispatch({
                                            type: 'FETCH_THIS_MOVIE',
                                            payload: movie.id
                                        })
                                        history.push('/details');
                                    }
                                }>
                                <img src={movie.poster} alt={movie.title} />
                            </button>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;