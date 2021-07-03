import React, { useEffect } from 'react'
import CreateIcon from '@material-ui/icons/Create';
import PublishIcon from '@material-ui/icons/Publish';
import TuneIcon from '@material-ui/icons/Tune';
import AddIcon from '@material-ui/icons/Add';
import {IconButton} from '@material-ui/core';
import {Link} from "react-router-dom";
import '../styles/profile.css';
import { useSelector } from 'react-redux';
function ProfileComponent({history}) {
    
    const userLoginData = useSelector(state=> state.userLogin);
    const {loading, userInfo, error} = userLoginData;

    function test(){
        history.push('/')
    }
    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }
    },[userInfo])
    return (
        <div className="profile_Screen">
            <div className="profile_section">
                <div className="profile">
                    <img onClick={test}  src="https://i.pinimg.com/280x280_RS/42/16/19/4216195c2a4da59d950879b61993ba90.jpg" alt=""/>
                    <h1 className="profile_Name">qhizer shareef</h1>
                    <div className="row">                       
                        <p><span>0</span> followers</p>
                        <p><span>0</span> following</p>
                    </div>
                </div>
            </div>
            <div className="icons_section">
                <div className="left_icons">
                    <IconButton>
                        <CreateIcon className="icon"/>
                    </IconButton>
                    <IconButton>
                        <PublishIcon className="icon"/>
                    </IconButton>
                </div>
                <div className="center_buttons">
                    <button className="active">Boards</button>
                    <button className="noColor">Pins</button>
                </div>
                <div className="right_icons">
                    <IconButton>
                        <TuneIcon className="icon"/>
                    </IconButton>
                    <Link to="/create-pin">
                        <IconButton>
                            <AddIcon className="icon"/>
                        </IconButton>
                    </Link>
                </div>
            </div>
            <div className="cards_section">
                <div className="card_board">
                    <div className="images">
                        <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="" width={200} height={200} className="img1 img"/>
                        <img src="https://www.gettyimages.in/gi-resources/images/500px/983794168.jpg" alt="" width={200} height={200} className="img2 img"/>
                        <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="" width={200} height={200} className="img3 img"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileComponent;
