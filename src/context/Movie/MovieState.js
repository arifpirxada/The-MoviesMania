import { useState } from "react";
import MovieContext from "./MovieContext";

const MovieState = (props) => {
    const defaultDt = {
        "page": 1,
        "results": [
            {
                "adult": false,
                "backdrop_path": "",
                "genre_ids": [
                    18,
                    10749
                ],
                "id": 597,
                "original_language": "",
                "original_title": "",
                "overview": "",
                "popularity": 220.282,
                "poster_path": "",
                "release_date": "",
                "title": "",
                "video": false,
                "vote_average": 7.9,
                "vote_count": 23224
            }
        ]
    }

    const [movieData, setMovieData] = useState(defaultDt)

    async function getMovies(url) {
        try {
            props.topProgress(30)
            const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } };
            props.topProgress(70)

            fetch(url, options)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return res.json()
                })
                .then((data) => {
                    setMovieData(data)
                    props.topProgress(100)
                })
                .catch((error) => {
                    console.log("Error fetching data:");
                });
        } catch (err) {
            console.log("the error is", err);
        }
    }

    const [totalResults, setTotalResults] = useState(20)

    const [pageNumber, setPageNumber] = useState(2)
    async function fetchMoreData(filter) {
        try {
            const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } };

            fetch(`https://api.themoviedb.org/3/movie/${filter}?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNumber}`, options)
                .then((res) => res.json())
                .then((data) => {
                    const nextData = movieData.results.concat(data.results)
                    setMovieData((prevState) => ({
                        ...prevState,
                        results: nextData,
                    }));
                    const nextTotal = totalResults + 20
                    setTotalResults(nextTotal)
                })
                .catch((error) => {
                    console.log("Error fetching data:");
                });
            setPageNumber(pageNumber + 1)
        } catch (err) {
            console.log("the error is", err);
        }
    }

    return (
        <MovieContext.Provider value={{ movieData, getMovies, fetchMoreData, totalResults }}>
            {props.children}
        </MovieContext.Provider>
    )
}

export default MovieState;