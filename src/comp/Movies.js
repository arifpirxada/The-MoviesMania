import { Link } from 'react-router-dom';
import { useContext, useEffect, useState, useRef } from "react";
import MovieContext from "../context/Movie/MovieContext";
import defaultBackDrop from '../img/rzdPqYx7Um4FUZeD8wpXqjAUcEm.jpg';
import Modal from './Modal';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';

export default function Movies(props) {
    const dt = useContext(MovieContext);
    const [filter, setFilter] = useState("now_playing")

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${filter}?api_key=${process.env.REACT_APP_API_KEY}&page=${1}`;
        dt.getMovies(url)
        // eslint-disable-next-line
    }, [filter])

    const rated = useRef()
    const popular = useRef()
    const upcoming = useRef()

    const filterFunc = (type) => {
        if (type === "Top Rated") {
            setFilter("top_rated")
            rated.current.style.backgroundColor = "#a3cc24"
            popular.current.style.backgroundColor = "#0987a1"
            upcoming.current.style.backgroundColor = "#0987a1"
            document.title = "Top Rated - Movies Mania"
        } else if (type === "Popular") {
            setFilter("popular")
            popular.current.style.backgroundColor = "#a3cc24"
            rated.current.style.backgroundColor = "#0987a1"
            upcoming.current.style.backgroundColor = "#0987a1"
            document.title = "Popular - Movies Mania"
        } else if (type === "Upcoming") {
            setFilter("upcoming")
            upcoming.current.style.backgroundColor = "#a3cc24"
            popular.current.style.backgroundColor = "#0987a1"
            rated.current.style.backgroundColor = "#0987a1"
            document.title = "Upcoming - Movies Mania"
        }
    }

    return (
        <>
            <Modal rated={rated} popular={popular} upcoming={upcoming} darkStyle={props.darkStyle} filterFunc={filterFunc} />
            <InfiniteScroll
                dataLength={dt.movieData.results.length}
                next={() => {dt.fetchMoreData(filter)}}
                hasMore={dt.totalResults !== dt.movieData.total_results}
                loader={<Spinner bodyDarkStyle={props.bodyDarkStyle} />}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div style={props.bodyDarkStyle} className="det-contain container d-flex justify-content-center align-items-start row movie-container">
                    {
                        dt.movieData.results.map((element, index) => (
                            <div style={props.darkStyle} key={index} className="card my-card m-1">
                                <Link to={`/movieDet/${element.id}`} >
                                    <img src={(element.backdrop_path === null) ? defaultBackDrop : `https://image.tmdb.org/t/p/w500${element.backdrop_path}`} className="card-img-top" alt="..." />
                                    <div style={props.darkStyle} className="card-body">
                                        <h5 className="card-title no-wrap">{element.original_title}</h5>
                                        <p className="card-text">{(element.overview === "") ? "The movie description is currently unavailable. We apologize for the inconvenience." : element.overview.slice(0, 75) + "..."}</p>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </InfiniteScroll>

        </>
    );
}
