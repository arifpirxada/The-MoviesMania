import { useEffect, useRef, useState } from 'react';
import logo from '../img/logo.jpg';
import { Link, useLocation } from 'react-router-dom';


function Navbar(props) {
  const [searchQuery, setSearchQuery] = useState("")
  const searchInput = useRef()

  const querySearch = () => {
    const input = searchInput.current.value
    setSearchQuery(input)
  }
  const location = useLocation()

  useEffect(() => {
    const emptySearch = () => { searchInput.current.value = "" }
    if (location.pathname.slice(0,7) !== "/Search") {
      emptySearch()
    }
    if (location.pathname === "/") {
      document.title = "Movies Mania"
    }
    // eslint-disable-next-line
  }, [location.key])

  return (
    <>
      <nav className="navbar fixed-nav navbar-expand-lg bg-body-tertiary py-0">
        <div style={props.darkStyle} className="container-fluid py-2">
          <Link className="navbar-brand" to="/">
            <img style={{ borderRadius: "100%" }} src={logo} alt='...' height="40" />
          </Link>
          <Link style={props.darkStyle} id="mania-text" className="navbar-brand" to="/">Movies Mania</Link>
          <button className="navbar-toggler my-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link style={props.darkStyle} className={`nav-link ${(location.pathname !== "/") ? "text-secondary" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
            </ul>
            <div className="form-check form-switch dark-form">
              <input className="form-check-input c-pointer" onChange={props.checked} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              <label className="form-check-label dark-mode c-pointer" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
            </div>
            <div className="d-flex" role="search" >
              <input className="form-control me-2" id="searchInput" type="search" onChange={querySearch} ref={searchInput} placeholder="Search" aria-label="Search" />
              <Link to={(searchQuery === "")? "/" : `Search/${searchQuery}`} className="btn btn-outline-primary" type="submit" style={{ marginRight: "1rem" }}>Search</Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="no-space"></div>
    </>
  );
}
export default Navbar;