import './App.css';
import Navbar from './comp/Navbar';
import Movies from './comp/Movies';
import MovieDetails from './comp/MovieDetails';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieState from './context/Movie/MovieState';
import Search from './comp/Search';
import LoadingBar from 'react-top-loading-bar';
import NoPage from './comp/NoPage';

function App() {

  const [darkStyle, setDarkStyle] = useState({
    color: "",
    backgroundColor: ""
  })

  const [bodyDarkStyle, setBodyDarkStyle] = useState({
    color: "",
    backgroundColor: ""
  })


  const checkDarkMode = (e) => {
    document.querySelector(".navbar-toggler").click()
    let btnChecked = e.target.checked
    if (btnChecked === true) {
      localStorage.setItem("darkUser", true);
      setDarkStyle({
        color: "#fff",
        backgroundColor: "#212121"
      })
      setBodyDarkStyle({
        color: "#fff",
        backgroundColor: "#0d1117"
      })
    } else {
      localStorage.setItem("darkUser", false);
      setDarkStyle({
        color: "",
        backgroundColor: ""
      })
      setBodyDarkStyle({
        color: "",
        backgroundColor: ""
      })
    }
  }

  function checkDarkUser() {
    if (localStorage.getItem("darkUser") === "true") {
      setDarkStyle({
        color: "#fff",
        backgroundColor: "#212121"
      })
      setBodyDarkStyle({
        color: "#fff",
        backgroundColor: "#0d1117"
      })
      document.querySelector("#flexSwitchCheckDefault").checked = true
    }
  }

  const [progress, setProgress] = useState(0)

  const topProgress = (percentage) => setProgress(percentage)

  useEffect(() => {
    checkDarkUser()
  }, [])

  return (
    <>
      <MovieState topProgress={topProgress}>
        <Router>
          <LoadingBar
            height={3}
            color='linear-gradient(45deg, #f44336, #FF5722)'
            progress={progress}
          />
          <Navbar darkStyle={darkStyle} checked={checkDarkMode} />
          <Routes>
            <Route exact path="/" element={<div>
              <h2 style={bodyDarkStyle} className='text-center pt-5 pb-2 m-0'>Explore Movies Mania</h2>
              <div style={bodyDarkStyle} className="d-flex justify-content-end py-3 px-4">
                <button className="filter-button" data-bs-toggle="modal" data-bs-target="#exampleModal">Filters</button>
              </div>
              <Movies bodyDarkStyle={bodyDarkStyle} darkStyle={darkStyle} />
            </div>
            } />
            <Route exact path="/movieDet/:movieId" element={
              <MovieDetails topProgress={topProgress} darkStyle={darkStyle} bodyDarkStyle={bodyDarkStyle} />} />
            <Route exact path="/Search/:query" element={<Search darkStyle={darkStyle} bodyDarkStyle={bodyDarkStyle} />} />
            <Route exact path="*" element={<NoPage bodyDarkStyle={bodyDarkStyle} />} />
          </Routes>
        </Router>
      </MovieState>
    </>
  );

}

export default App;
