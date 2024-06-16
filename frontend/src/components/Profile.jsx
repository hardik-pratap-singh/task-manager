import React, { useEffect, useRef, useState } from 'react'
import profilePic from "/profile.png"
// useState
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
// useNavigate
// useRef

const Profile = () => {

    const [userData, setuserData] = useState([]);
    let navigate = useNavigate();
    let ref = useRef();
    let ref2 = useRef() ; 

    const data = async () => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/getuser`, {
            "method": "GET",
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            }
        });
        let resp = await response.json();
        // console.log(resp);
        setuserData(resp);
    }

    useEffect(() => {
        data();

        console.log(userData);

    }, [])

    const [details, setDetails] = useState({
        prevPasswd: "",
        newPasswd: ""
    })

    const openModal = () => {
        ref.current.click();
        setDetails({
            prevPasswd: "",
            newPasswd: ""
        })
    }




    const handlelogout = () => {
        localStorage.removeItem('token');
        // navigate('/Login');
        Swal.fire({
            title: 'Confirm Log Out ?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Log Out',
            denyButtonText: `Wait`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('See You Again !', '', 'success');
                navigate('/');
            }
        })
    }

    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }

    const handleClick =async () => {
        //api call for update password will go here 
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/updatePassword`, {
            "method": "PUT",
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            },
            body : JSON.stringify({prevPasswd : details.prevPasswd , newPasswd : details.newPasswd}) 
        });
        let resp = await response.json();

        if(resp.success === true){
            ref2.current.click() ; 
            Swal.fire({
                title: "Good Job !",
                text: "Successfully Updated Password !!",
                icon: "success",
              }).then(function () {
                navigate("/profile") ;
              });
        }

        else{
            Swal.fire({
                title: "Update Failed !",
                text: "Previous password didn't match..",
                icon: "error",
                confirmButtonText: "Try Again",
              });
        }
        
        
    }
    return (
        <div className="row">
            <div className="card my-5" style={{ width: "28rem", align: "center", display: "flex", margin: "auto", justifyContent: "center" }}>
                <img src={profilePic} className="card-img-top my-3" alt="Profile" style={{ width: "40%", height: "40%", margin: "auto", borderRadius: "50%" }} />
                <div className="card-body">

                    {/* <h4 className="card-title" style={{ textDecoration: "underline" , textAlign : "center" }}>{userData.name}</h4> */}
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                </div>
                <ul className="list-group list-group-flush">
                    {/* <li className="list-group-item"><h6><b>ID: </b>{userData._id}</h6></li> */}
                    {/* <li className="list-group-item"></li> */}
                    <li className="list-group-item"><b>Email</b> : {userData.email}</li>
                    <li className="list-group-item"><b>Password</b> : *******</li>
                    {/* variable && variable.substring(0, 7)  This is just to check whether your variable is empty of not if it's not empty then apply substr to it*/}
                    <li className="list-group-item"><b>User Since :</b> {userData.date && userData.date.substr(0, userData.date.indexOf('T'))}</li>
                    {/* <li className="list-group-item"><b>Notes Count</b> : {newnotes.length}</li> */}
                </ul>
                <br />
                <div className="d-flex flex-row d-flex justify-content-around">
                    <div className="p-2"><button type="submit" className="btn btn-info mx-2" onClick={openModal} >Update Password</button></div>
                    <div className="p-2"><button type="submit" onClick={handlelogout} className="btn btn-info mx-2">Logout</button></div>
                </div>
                <br />


                {/* Modal Code Begins */}

                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Click Me
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Update Your Password</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="prevPasswd" className="form-label">Previous Password</label>
                                    <textarea name="prevPasswd" onChange={handleChange} value={details.prevPasswd} className="form-control" id="prevPasswd" rows="1"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newPasswd" className="form-label">New Password</label>
                                    <textarea name="newPasswd" onChange={handleChange} value={details.newPasswd} className="form-control" id="newPasswd" rows="1"></textarea>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button ref={ref2} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={handleClick} type="button" className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Code Ends */}

            </div>
        </div>
    )
}

export default Profile