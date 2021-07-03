import React from 'react'
import '../styles/animation.css';
import '../styles/Loader.css';
function Loader({pinscreen}) {
    return (
        <div className="loader_Container">
            <div className={`${pinscreen && 'pin'} loader`} >...</div>
        </div>
    )
}

export default Loader;
