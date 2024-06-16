import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "react-js-loader";
// useNavigate
// useState
const Register = () => {

    const boxStyle = {
        display: "flex",
        justifyContent : "center",
        alignItems : "center",
        margin : "auto",
        height : "90vh"
    }

    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, signupdata] = useState({ email: "", password: "" });

    const handleclick = async (event) => {
        setLoading(true) ; 
        // console.log(data) ; 
        event.preventDefault();

        const response = await fetch(`http://localhost:5000/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({  email: data.email, password: data.password })
        });

        const json = await response.json();
        console.log(json); 


        if (json.success) {
            // alert("signup Success");
            // navigate("/Login");
            setLoading(false); 
            Swal.fire({
                title: "Good Job !",
                text: "You are Registered Successfully..",
                icon: "success",
                // confirmButtonText: "Try Again",
              }).then(function () {
                // Redirect the user
                // window.location.href = "/new-page";
                navigate("/") ;
              });

        }

        else {
            setLoading(false); 
            Swal.fire({
                title: "Some Error Occurred !",
                text: "Some User With This Email Already Registered",
                icon: "warning",
                // confirmButtonText: "Try Again",
              });
        }
    }

    const handlechange = (e) => {
        // eslint-disable-next-line
        signupdata({ ...data, [e.target.name]: e.target.value });
    }


    

    return (
        <div className="container" style={boxStyle}>
            
            {
                loading ? 
                <div className="loading" style={{height : "100vh" , display : "flex" , justifyContent : "center" , alignItems : "center" , textAlign : "center"}}>
                  <Loader type="box-rectangular" bgColor={"#343a40"} title={"Just a Moment Please..."} color={'#343a40'} size={40} />
                </div>

                :

                <div clasName="card" style={{ "width": "20rem" ,padding : "30px", borderLeft : "3px dotted black" ,
                borderTop : "3px dotted black", borderRadius : "24px" , backgroundColor : "#ffffff  " }}>

                <form onSubmit={handleclick} autoComplete="off">
                    <div className="mb-3">
                        <label style={{fontSize : "18px"}}  for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name='email' value={data.email} onChange={handlechange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label style={{fontSize : "18px"}}  for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name='password' value={data.password} onChange={handlechange} className="form-control" id="exampleInputPassword1" />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Sign up</button>
                
                </form>
            </div>

            }

            
        </div>
    )
}

export default Register