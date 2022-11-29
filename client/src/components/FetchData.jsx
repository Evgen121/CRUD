import React from 'react'
//import images from "../data/data"
import "./fetchdata.css";


const FetchData = ({ result }) => {

    return (
        <div className='fetch-container'>
            <div className="fetch-cards">
                {result.map((item, index) => (
                    <div className="card" key={index}>
                        <div className="card-body">
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div className="card-footer">
                            <h2 className="card-title">
                                Name: {item.title}
                            </h2>
                            <h3 className="card-desc">
                                Description: {item.desc}
                            </h3>
                        </div>
                        <button className='delete' >Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FetchData;
