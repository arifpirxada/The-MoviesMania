import MovieContext from "../context/Movie/MovieContext";
import { useParams, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import defaultBackDrop from '../img/rzdPqYx7Um4FUZeD8wpXqjAUcEm.jpg'

const Search = (props) => {

    const dt = useContext(MovieContext);

    const { query } = useParams()

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`;
        dt.getMovies(url)
        document.title = `${query} - Search Movies Mania`
        // eslint-disable-next-line
    }, [query])

    return (
        <>
            <h3 style={props.bodyDarkStyle} className='text-center py-5 m-0'>Search results for: {query}</h3>
            <div style={props.bodyDarkStyle} className="det-contain-search container d-flex justify-content-center align-items-start row movie-container">
                {dt.movieData.results.map((element, index) => (
                    <div style={props.darkStyle} key={index} className="card my-card m-1">
                        <Link to={`/movieDet/${element.id}`}>
                            <img src={(element.backdrop_path === null) ? defaultBackDrop : `https://image.tmdb.org/t/p/w500${element.backdrop_path}`} className="card-img-top" alt="..." />
                            <div style={props.darkStyle} className="card-body">
                                <h5 className="card-title no-wrap">{element.original_title}</h5>
                                <p className="card-text">{(element.overview === "") ? "The movie description is currently unavailable. We apologize for the inconvenience." : element.overview.slice(0, 75) + "..."}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div></>
    )
}

export default Search;