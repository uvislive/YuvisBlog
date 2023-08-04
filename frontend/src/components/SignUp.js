

import React from 'react'
// import './Postcomponent.css'
import { Link } from 'react-router-dom'
import './demo.css';
import { useState } from 'react';
import { ToastContainer , toast } from "./ToastFile";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
function SignUp() {


  const navigate = useNavigate();

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")



// sign up function 
const SignupUser = () => {

  const data = { username, email, password }
  fetch("http://localhost:9000/signup", {
      method: "post",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      // body: JSON.stringify({
      //     username: "",
      //     email: "",
      //     password: ""
      // })
      body: JSON.stringify({
          username,
          email,
          password
      })
  }).then(res => res.json())
      .then(data => {
          if (data.error) {
            toast(data.error);
              console.log(data.error)
          }
          else {
              toast(data.message)
              console.log(data.message)
              navigate('/signin')
          }
      })

}


// finish


  return (
    <>
    
    <div className='homepage'>
       <div className="box">
      <h2>Sign Up Form</h2>
      <div className='myform'>
        <div className="user-box">
          <input type="text" id="username" 
           value={username} onChange={(e) => setUsername(e.target.value)}
           required />
          <label>Username </label>
        </div>
        <div className="user-box">
          <input type="email" id="email" 
           value={email} onChange={(e) => setEmail(e.target.value)}
          name="email" required />
          <label>Email Id</label>
        </div>
        
        <div className="user-box">
          <input type="password" id="password"
          value={password} onChange={(e) => setPassword(e.target.value)}
          name="" required />
          <label>Password</label>
        </div>
        
         <button onClick={() => SignupUser()} id="this"   className="uvigram mb-3"  type="submit" >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        
          {/* <Link to="/">Register User</Link> */}
         Register User
        </button>
        <p>
        <Link to="/signin">Already have a Account ?</Link>
        </p>
      </div>
    </div>



    </div>

<ToastContainer/>
    
    </>
  )
}

export default SignUp