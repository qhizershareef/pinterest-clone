import React from 'react';
import '../styles/alert.css';

function Alert({variant,children}) {
    console.log(children)
    return (
        <div className={variant+' alert'}>
            <span className="closebtn" onClick={()=>document.querySelector('.alert').style.display='none'}>&times;</span> 

            {children}
        </div>
    )
}

export default Alert;
