import React from 'react'
import "./cards.css";

function Cards({ imgUrl, title ,description }) {
    return (
        <div className="card" style={{ width: "18rem" }}>
        <img src={imgUrl} className="card-img-top" alt='image not found' />
        <div className="card-body">
            <h5 className="card-title"> {title}</h5>
            <p className="card-text cuttofText">{description}</p>
            <a href="" className="btn btn-primary">Read More...</a>
        </div>
    </div>





    )
}

export default Cards