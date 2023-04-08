import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Details from '../Details/Details';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

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