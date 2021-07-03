import React from 'react'
import CreateIcon from '@material-ui/icons/Create';
import PublishIcon from '@material-ui/icons/Publish';
import TuneIcon from '@material-ui/icons/Tune';
import AddIcon from '@material-ui/icons/Add';
import {IconButton} from '@material-ui/core';
import {Link} from "react-router-dom";
import '../styles/profile.css';
function UserScreen ({match}) {

    const uname = match.params.uname;
    return (
        <div className="profile_Screen">
            <div className="profile_section">
                <div className="profile">
                    <img src="https://i.pinimg.com/280x280_RS/42/16/19/4216195c2a4da59d950879b61993ba90.jpg" alt=""/>
                    <h1>{uname}</h1>
                    <div className="user_Bio">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem in et molestiae totam dolorem debitis accusamus corporis nulla nesciunt aperiam fugit iusto quo nobis voluptatum eligendi ea facilis, non modi.</p>
                    </div>
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

                </div>
            </div>
        </div>
    )
}

export default UserScreen;
