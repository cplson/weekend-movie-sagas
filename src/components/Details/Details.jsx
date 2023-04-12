import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function Details(){
    
    const history = useHistory();
    // get movie info from store
    const movie = useSelector(store => store.selectedMovie);
    const genres = useSelector(store => store.genres);
    
    console.log('movie:', movie, genres);

    const handleBack = () => {
        history.push('/');
    }
    // return display of the selected movie and all of its info
    return(
        <div className='movieDisplay'>
            <h1>{movie.title}</h1>
            <img src={movie.poster} />
            <p>{movie.description}</p>
            <ul>
                {genres.map((genre, i) => <li key={i}>{genre.name}</li>)}
            </ul>
            <button onClick={handleBack}>Back to List</button>
        </div>
    )
    
    
}

export default Details;