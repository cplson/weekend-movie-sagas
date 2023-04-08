import { useDispatch, useSelector } from 'react-redux';

function Details(){
    // declare dispatch
    const dispatch = useDispatch();

    // get movie from local state
    const movie = useSelector(store => store.movie);
}

export default Details;