import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cards from './Cards';
import "./profile.css"
import { useContext } from 'react'
import { UserContext } from '../App'

function MyProfile() {

    const { state, dispatch } = useContext(UserContext);
    const [myPost, setMyPost] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get("http://localhost:9000/mypost", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('jwt')
                }
            })
            console.log("mypostdata", data.data.myPost)
            setMyPost(data.data.myPost)
        }
        fetchData();
    }, [])



    return (
        <div className="profileContent">
            <div className="container">
                <div className="part1">
                    {/* <h3>Profile pic</h3> */}
                    <img src="pngegg.png" className='w-20' alt="profile" />
                </div>
                <div className="part2">
                    <div><h1 className='text-4xl font-bold'>{state ? state.username : "loading"} </h1></div>
                    <div className="follow">
                        <h1 className='m-3 sm:text-2xl'>33 Post</h1>
                        <h1 className='m-3 sm:text-2xl'>33 Follower</h1>
                        <h1 className='m-3 sm:text-2xl'>33 following</h1>
                    </div>
                    <div>
                        <p>bio :
                            hii How are you !
                            this is yuvi
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi explicabo iure nam sed est officiis fuga sapiente esse unde harum. Doloribus necessitatibus cum quae, saepe obcaecati quod, mollitia atque libero facere porro amet. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore, error.
                        </p>
                    </div>

                </div>
            </div>
            <hr />
            <div className="secondpart">
                <div className="thiscontainer">

                    {
                        myPost.map((element) => {
                            return (
                                <>
                                    <Cards key={element._id} description={element.body} imgUrl={element.photo} title={element.title} />
                                </>


                            )
                        })

                    }
                </div>
            </div>

        </div>
    )

}

export default MyProfile