import React, { useState, useEffect } from "react";
import "./people.css";
import axios from "axios";
function Peoples() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:9000/alluser", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });

      console.log(response.data.users);
      setUser(response.data.users);
    };
    fetchData();
  });

  return (
    <>
      <div className="mycontainer">
        <h1 className="mt-5"> Lets Find The Peoples Around You !!</h1>

        {
          user.map((element) => {
            return (
              <>
                <div className="myCard">
                  <div className="image">
                    <img src="pngegg.png" alt="imageload" />
                  </div>
                  <div className="names">
                    <h1>{element.username} </h1>
                  </div>

                  <div className="showprofile">
                    <button className="btn btn-outline-dark"> Show Profile</button>
                  </div>
                </div>
              </>
            );
          })

          /* <div className="myCard">
<div className="image">
    <img src="pngegg.png" alt="imageload"  />
</div>
<div className="names">
    <h1> YuvrajSinh Zala</h1>
</div>

<div className="showprofile"> 
  <button className='btn btn-primary'> Show Profile</button>
</div>


</div> */
        }
      </div>
    </>
  );
}

export default Peoples;
