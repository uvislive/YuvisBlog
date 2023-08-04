import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostComponent from './components/PostComponent';
import MyProfile from './components/MyProfile';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CreatePost from './components/CreatePost';
import { useNavigate } from 'react-router-dom';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from "../src/reducer/userReducer"
import Peoples from './components/Peoples';




export const UserContext = createContext();


// lets start here routing function 
const Routing = () => {

  const { state, dispatch } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    if (user) {
      dispatch({ type: "USER", payload: user })
      navigate("/")
    }
    else {
      navigate("/signin")
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<PostComponent />} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/home' element={<PostComponent />} />
      <Route path='/profile' element={<MyProfile />} />
      <Route path='/createpost' element={<CreatePost />} />
      <Route path='/people' element={<Peoples />} />

    </Routes>
  )
}




// app code starts here 



// function App() {
//   return (
//     <div className="App">

// <Router>
//         <Navbar />
//         <Routes>
//           {/* <Route path="/" element={<PostComp category="de&category=science" />} /> */}
//           <Route path='/' element={<PostComponent category="de&category=science" /> } />
//           <Route path='/profile' element={<MyProfile/> } />
//           <Route path='/signup' element={<SignUp/> } />
//           <Route path='/signin' element={<SignIn/> } />
//           <Route path='/createpost' element={<CreatePost/> } />
//         </Routes>
//       </Router>


//     </div>
//   );
// }




// code app started here 

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>

          <Navbar />
          <div className="appconfig">
          <Routing />
          </div>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
