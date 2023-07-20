import { Link } from "react-router-dom";

const NoPage = (props) => {
    return (
        <>
            <div style={props.bodyDarkStyle} className="background d-flex flex-column justify-content-center align-items-center">
                <div className="error-container">
                    <h1 id="notFound">404 Not Found</h1>
                    <p className="error-p">The page you're looking for doesn't exist.</p>
                    <p className="error-p">Go back to the <Link id="error-home" to="/">home page</Link>.</p>
                </div>
            </div>
        </>
    )
}

export default NoPage;