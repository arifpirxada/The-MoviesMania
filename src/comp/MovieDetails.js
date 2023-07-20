import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetails(props) {

    const { movieId } = useParams()

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
                .then((res) => res.json())
                .then((data) => {
                    setMovieData(data)
                    props.topProgress(100)
                    document.title = `${data.original_title} - Movies Mania`
                })
                .catch((error) => {
                    console.log("Error fetching data:");
                });
        } catch (err) {
            console.log("the error is", err);
        }
    }

    useEffect(() => {
        var url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`;
        getMovies(url)
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <div style={props.bodyDarkStyle} className="background d-flex align-items-center">
                <div className="container row d-flex justify-content-center movie-container">
                    <div style={props.darkStyle} className="card det-card m-2 py-3 mt-3 fit-content">
                        {(movieData.poster_path === null)? "Sorry! Image for this movie is currently unavailable." : <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} className="card-img-top" alt="..." />}
                    </div>
                    <div style={props.darkStyle} className="card det-card m-2 d-flex justify-content-center mb-5 fit-content mt-3">
                        <div style={props.darkStyle} className="card-body">
                            <h5 className="card-title">{movieData.original_title}</h5>
                            <p className="card-text">{movieData.overview}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li style={props.darkStyle} className="list-group-item">Popularity: {movieData.popularity}</li>
                            <li style={props.darkStyle} className="list-group-item">Release date: {movieData.release_date}</li>
                            <li style={props.darkStyle} className="list-group-item">Average rating: {movieData.vote_average}</li>
                            <li style={props.darkStyle} className="list-group-item">Total Ratings: {movieData.vote_count}</li>
                            <li style={props.darkStyle} className="list-group-item">Orignal language: {movieData.original_language}</li>
                            <li style={props.darkStyle} className="list-group-item">Adult: {(movieData.adult) ? "Yes" : "No"}</li>
                        </ul>
                        <div className="mb-3">
                            <a href={`https://www.google.com/search?q=${movieData.original_title}`} target="_blank" rel="noreferrer" className="card-link text-primary t-underline">google search</a>
                            <a href={`https://www.imdb.com/find/?q=${movieData.original_title}&ref_=nv_sr_sm`} target="_blank" rel="noreferrer" className="card-link text-primary t-underline">search with imdb</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}