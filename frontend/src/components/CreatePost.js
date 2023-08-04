import React from 'react'
import './Postcomponent.css'
import { Link ,useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react'
import {toast,ToastContainer} from "./ToastFile"
function CreatePost() {


  const [title, setTitle] = useState('')
  const [body, setBody] = useState("");
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate= useNavigate();



// send image and create link for image 
  const postData = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "uvigram");
    data.append("cloud_name", 'diapiscvg')
    fetch("https://api.cloudinary.com/v1_1/diapiscvg/image/upload", {
        method: "post",
        body: data
    })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            setLoading(false)
            setUrl(data.url)
            setLoading(true)
            console.log(data.url)

        })
        .catch(err => {
            console.log(err)
        })
}



// send a Post Request to the server 
useEffect(() => {

  fetch("http://localhost:9000/createpost", {
      method: "post",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
          title,
          body,
          pic: url
      })
  })
      .then(res => res.json()).then(data => {
          if (data.error) {
              // console.log(data.error)
              { loading ? toast.error(data.error) : console.log(data.error) }
              // toast.error(data.error)


          }
          else {
              console.log(data.Message);
              toast(data.Message)
              toast("Successfully Created")
             navigate("/");
          }
      }).catch(err => {
          console.log(err)
      })
}, [url])





  return (
    
    <div className='homepage'>
<div className="box">
      <h2>Lets Create Your Blog</h2>
      <div className='myform'>
        <div className="user-box">
          <input type="text" id="title"
          value={title} onChange={(e) => setTitle(e.target.value)}
          name="" required />
          <label>Title of your Blog</label>
        </div>
        <div className="user-box">
          <input type="textarea"
             value={body} onChange={(e) => setBody(e.target.value)}
          id="body" name="body"  required />
          <label>Desciption of Your BLog</label>
        </div>
        <div className="user-box">
          <input type="file" id="images"
          onChange={(e) => setImage(e.target.files[0])}
          name="" required />
          {/* <label>Attech File</label> */}
        </div>
        
         <button id="this" onClick={()=>postData()}   className="uvigram mb-3" >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        
          Create Post
        </button>
        <p>
        </p>
      </div>
    </div>



    </div>

  )
}

export default CreatePost