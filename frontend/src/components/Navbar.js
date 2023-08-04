import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./mynav.css"
import { useContext } from 'react'
import { UserContext } from '../App'
import { toast, ToastContainer } from "react-toastify"
function Navbar() {



// starts here 

const { state, dispatch } = useContext(UserContext);
const navigate = useNavigate()

const renderList=()=>{

if (state){
    return(
        <>
             <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/home">HomePage</Link>
                        </li>
                        < li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/createPost"> Create Post</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">My Profile</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/people">Peoples Around You</Link>
                        </li>
                        
                       
                    </ul>
                    <form className="d-flex" role="search">
                        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                        <button className="btn btn-outline-success mx-3"  onClick={
                            ()=>{
                                localStorage.clear();
                                dispatch({ type: "CLEAR" })
                                navigate("/signin");
                                toast.success("Logging Out")
                            }
                        }>LogOut </button>
                    </form>
                </div>
       </>
    )
}



else{

return (
    <>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">HomePage</Link>
                        </li> */}
                        
                    </ul>
                    <form className="d-flex" role="search">
                        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                        <button className="btn btn-outline-success mx-3" type="submit"><Link className='mylink' to="/signup">Register </Link> </button>
                        <button className="btn btn-outline-success mx-3" type="submit"><Link className='mylink' to="/signin">Sign in </Link> </button>
                    </form>
                </div>
    
    
    </>
)

}

}







    return (




        <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-fixed w-100" style={{ zIndex: "100", top: 0 }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Uvis Bloging</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* comment from here  */}
                {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">HomePage</Link>
                        </li>
                        < li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/createPost"> Create Post</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">My Profile</Link>
                        </li>
                        
                       
                    </ul>
                    <form className="d-flex" role="search">
                        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                        {/* <button className="btn btn-outline-success mx-3" type="submit"><Link className='mylink' to="/signup">Register </Link> </button>
                        <button className="btn btn-outline-success mx-3" type="submit"><Link className='mylink' to="/signin">Sign in </Link> </button>
                    </form> */}
                {/* </div> */} 

                {/* comment her  */}


          {renderList()}

            </div>
        </nav>












    )
}

export default Navbar