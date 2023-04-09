import { useSelector } from 'react-redux';

function Details(){
    

    // get movie from local state
    const movie = useSelector(store => store.selectedMovie);
    const genres = useSelector(store => store.genres);
    
    console.log('movie:', movie, genres);

    return(
        <div className='movieDisplay'>
            <h1>{movie.title}</h1>
            <img src={movie.poster} />
            <p>{movie.description}</p>
            <ul>
                {genres.map(genre => <li>{genre.name}</li>)}
            </ul>
        </div>
    )
    
    
}

export default Details;