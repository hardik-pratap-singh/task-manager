import React from 'react'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import Loader from "react-js-loader";


const Login = () => {
    const boxStyle = {
        display: "flex",
        justifyContent : "space-around",
    }

    const [loading, setLoading] = useState(false);

    const [login , logindata] = useState({email : "" , password : ""});
    let navigate = useNavigate() ; 
    const handlechange = (e) => {
        logindata({...login , [e.target.name] : e.target.value}); 
    }

    const handlesubmit = async (event) => {
        setLoading(true); 
        event.preventDefault() ;  //ye bhi kaafi zaroori cheez hai bhai // isko bhool gye to kaafi faltu ki errors aa sakti 
        //hai like url me teri personal cheeze show hone lag sakti hai , email , password type cheeze 

        const response = await fetch(`http://localhost:5000/auth/login` , {
            method : "POST" , 
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({email : login.email , password : login.password}) , 
        })



        const json = await response.json()  ;
        if(json.success === true){
            setLoading(false); 
            localStorage.setItem('token' , json.authToken);
            // navigate('/Mynotes')
            Swal.fire({
                title: "Good Job !",
                text: "Successfully Logged In !!",
                icon: "success",
                // confirmButtonText: "Try Again",
              }).then(function () {
                // Redirect the user
                // window.location.href = "/new-page";
                navigate("/task") ;
              });
            // alert("Succesfully loggedIn");   
            
            

        }
        else if(json.issue === "email"){
            // alert("Email Doesn't Exist. Try Signing Up !")
            setLoading(false); 

            Swal.fire({
                title: "Login Failed !",
                text: "Incorrect Email..",
                icon: "error",
                confirmButtonText: "Try Again",
              });
        }

        else{
            // alert("Password Didn't Match. Try Again !")
            setLoading(false); 

            Swal.fire({
                title: "Login Failed !",
                text: "Password Didn't Match..",
                icon: "error",
                confirmButtonText: "Try Again",
              });
        }
    }




  return (
    <div className="container" style={boxStyle}>
                
            <div className="left" style={{ display : "flex" ,flexDirection : "column" , marginTop : "6rem" , justifyContent : "space-around" , height : "35vh"}}>
                <br /><br />
                <h1>Master Your Tasks with TaskMaster..</h1>

                <h4>
                    Get Started for Free.
                </h4>
                <br /><br />
                <h5> Try TaskMaster Now !</h5>

            </div>

            {
                loading ? 
                <div className="loading" style={{height : "100vh" , display : "flex" , justifyContent : "center" , alignItems : "center" , textAlign : "center"}}>
                  <Loader type="box-rectangular" bgColor={"#343a40"} title={"Just a Moment Please..."} color={'#343a40'} size={40} />
                </div>

                :

                <div clasName="card" style={{height: "fit-content" , display : "flex" , alignItems : "center", "width": "20rem" , borderLeft : "3px dotted black" , borderTop: "3px dotted black", padding : "30px" , borderRadius : "24px" , justifyContent : "center" , marginTop : "7rem" , backgroundColor : "#ffffff" }}>

                <form onSubmit={handlesubmit} autoComplete="off">
                    <div className="mb-3">
                        <label style={{fontSize : "18px"}} for="exampleInputEmail1" className="form-label">Email address</label>
                        <input name = "email" value = {login.email} onChange = {handlechange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                
                    <div className="mb-3">
                        <label style={{fontSize : "18px"}} for="exampleInputPassword1" className="form-label">Password</label>
                        <input name = "password" value = {login.password} onChange = {handlechange} type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className='d-flex justify-content-around mt-4'>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <Link to="/register"><button type="submit" className="btn btn-primary">Sign up</button></Link>
                    
                    </div>

                </form>
            </div>



            }
            
        </div>
  )
}

export default Login