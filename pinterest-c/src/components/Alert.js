import React from 'react';
import '../styles/alert.css';

function Alert({variant,children}) {
    // console.log(children)
    // setTimeout(()=>{
    //     document.getElementById('alertt')?.style.display = 'none';
    // },2000)
    return (
        <div className={variant+' alert'} id="alertt">
            <span className="closebtn" onClick={()=>document.querySelector('.alert').style.display='none'}>&times;</span> 

            {children}
        </div>
    )
}

export default Alert;
