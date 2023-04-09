import { useSelector } from 'react-redux';

function Details(){
    

    // get movie info from store
    const movie = useSelector(store => store.selectedMovie);
    const genres = useSelector(store => store.genres);
    
    console.log('movie:', movie, genres);

    // return display of the selected movie and all of its info
    return(
        <div className='movieDisplay'>
            <h1>{movie.title}</h1>
            <img src={movie.poster} />
            <p>{movie.description}</p>
            <ul>
                {genres.map((genre, i) => <li key={i}>{genre.name}</li>)}
            </ul>
        </div>
    )
    
    
}

export default Details;