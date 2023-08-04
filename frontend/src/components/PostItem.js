import React from 'react'
import "./postitem.css"

function PostItem({  urlToImage, title, description }) {

       
    return (
        <div className="postitem">






            <div className="card" style={{ width: "18rem" }}>
                <img src={urlToImage} className="card-img-top" alt='image not found' />
                <div className="card-body">
                    <h5 className="card-title"> {title}</h5>
                    <p className="card-text cuttofText">{description}</p>
                    <a href="" className="btn btn-primary">Read More...</a>
                </div>
            </div>

        </div>



    )
}

export default PostItem