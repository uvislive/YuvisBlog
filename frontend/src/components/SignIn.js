import React from 'react'
// import './Postcomponent.css'
import { Link ,useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import './demo.css';
import { UserContext } from '../App';
import { useState } from 'react';
import {toast, ToastContainer} from "./ToastFile"


function SignIn() {

 
  const { state, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();




  // sign in LOgic 
  const Login = () => {
    const data = { email, password }
    console.log(data)
    fetch("http://localhost:9000/signin", {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                toast(data.error)
                console.log(data.error)

            }
            else {
              console.log("i am here whatsa your name")
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user));
                dispatch({ type: "USER", payload: data.user })
                toast("SuccessFully Logged In")
                toast(data.token);
                console.log("userdata", data.user)
                navigate("/profile")

            }
        }).catch(err=>{
          console.log(err);
        })
}

// ends 



  return (
    <>
    
    <div className='homepage'>
       <div className="box">
      <h2>Sign In Form</h2>
      <div className='myform'>
        
        <div className="user-box">
          <input type="email" id="email"
          value={email} onChange={(e) => setEmail(e.target.value)}
          name="" required />
          <label>Email Id</label>
        </div>
        
        <div className="user-box">
          <input type="password" id="password"
          value={password} onChange={(e) => setPassword(e.target.value)} 
          name="" required />
          <label>Password</label>
        </div>
        
         <button id="this" onClick={() => Login()}   className="uvigram mb-3"   >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        
          {/* <Link to="/home">Sign In</Link> */}
          Sign In
        </button>
        <p>
          <Link to="/signup">Do not have Account ?</Link>
        </p>
      </div>
    </div>



    </div>

<ToastContainer/>
    
    </>
  )
}

export default SignIn