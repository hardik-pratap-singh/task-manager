import React from 'react'
import profileImage from '/profile.png';
import { Link, useNavigate } from 'react-router-dom';
// Link
// useNavigate

const Navbar = () => {
    let navigate = useNavigate() ; 


    const handleProfile = () => {
        // window.alert("clicked");
        navigate("/profile") ; 
    }


  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to={localStorage.getItem("token") ? "/task" : "/"}>TaskMaster Pro</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Contact</a>
        </li>
    
      </ul>

      {
        localStorage.getItem("token") 
        &&
        <img style={{cursor : "pointer"}} onClick={handleProfile} src={profileImage} alt="" height="3%" width="3%" />
      }
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar