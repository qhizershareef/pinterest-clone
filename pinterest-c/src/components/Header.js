import React, { useEffect, useState} from 'react'
import '../styles/header.css';
import {Avatar, IconButton} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SearchOutlined from '@material-ui/icons/Search';
import {Link, useHistory, useLocation, useParams} from 'react-router-dom';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import '../styles/animation.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout, userLogin } from '../actions/userActions';
import Loader from './Loader';
import Alert from './Alert';

function Header() {

    const location = useLocation();
    const history = useHistory();
    const pathname= location.pathname;
    const pathCheck =  pathname.includes('login');
    // const pathCheck = pathname.includes('profile');
    
    const redirect = pathname ? pathname: '/';
    
    const dispatch = useDispatch();
    const userLoginData = useSelector(state=> state.userLogin);
    const {loading, userInfo, error} = userLoginData;
    const [darkMode, setDarkMode] = useState(0);
    const [navHidden, setNavHidden] = useState(true);

    function handleTheme() {
        console.log('handle theme called')
        console.log(darkMode)
        if (darkMode) {
            console.log('switching to light mode')
            displayTheme('light')
        }
        else {
            console.log('switching to dark mode')
            displayTheme('dark')
        }
        // localStorage.setItem('theme',darkMode);
        setDarkMode(!darkMode);
    }
    
    const HideSearch = () =>{
        document.querySelector('.search_icon').style.display ='none'
        document.querySelector('.search input').style.fontSize='16px';
    }
    const visibleSearch = () =>{
        document.querySelector('.search_icon').style.display ='block'
        document.querySelector('.search input').style.fontSize='15px';
    }

    const showNav =()=>{
        setNavHidden(navHidden=> !navHidden)
    }

    const handleLogout = () =>{
        console.log(redirect)
        dispatch(logout())
        history.push(redirect)
        setNavHidden(false)
    }
    const displayTheme =(thm)=>{
        document.documentElement.setAttribute('data-theme', thm);
        localStorage.setItem('theme',thm)
    }
    useEffect(()=>{
            const theme = localStorage.getItem('theme') || 'light';
        // if(theme && !pathCheck){
            displayTheme(theme)
            if(theme === 'dark'){
                setDarkMode(1)
            }else{
                setDarkMode(0)
            }
        // }
    },[dispatch, userInfo, redirect,pathname, darkMode])
    
        
    return (
        !pathCheck &&
        <>
        <div className="Header_container">
           <div className="left_Header">
                <Link to="/" className="logo">
                    <img src="data:image/png;base64,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" alt=""/>
                </Link>
                <button className="active">Home</button>
                <button className="noColor">Today</button>
                <button className="noColor">Following</button>
            </div>
            <div className="search" onClick={HideSearch} onBlur={visibleSearch}>
                    <SearchOutlined className="search_icon"/>
                    <input type="text" placeholder="Search Your Pins"/>
            </div>
            <div className="right_icons">
                <IconButton className="header_Icon"><NotificationsIcon/></IconButton>
                <IconButton className="header_Icon"><ChatIcon/></IconButton>
                {userInfo?<Link to="/profile">
                    <IconButton><Avatar src={userInfo.profile || `https://ui-avatars.com/api/?length=1&size=200&bold=true&name=${userInfo.name}`} className="userIcon"/></IconButton>  
                </Link>:
                    <Link to="/login">
                        <IconButton><Avatar className="userIcon"/></IconButton>  
                    </Link>  
                }
                {
                    userInfo?
                        <div>
                            <IconButton className="header_Icon" onClick={showNav} ><KeyboardArrowDownIcon/></IconButton>
                            <ul className={`nav_Options ${navHidden && 'nav_Hidden'}`}  onMouseLeave={()=>setNavHidden(true)}>
                                <li onClick={handleLogout}>Logout</li>
                                <li>Settings</li>
                            </ul>
                        </div>
                        :
                        <IconButton className="header_Icon" onClick={showNav}><KeyboardArrowDownIcon/></IconButton>
                }
            </div>
            </div>
            {/* <div className="ui_Icons">
                <Brightness4Icon className="ui_Icon dark_Icon"/>
                <WbIncandescentIcon className="ui_Icon light_Icon"/>
            </div> */}
            <div id="mySidenav" className="sidenav theme_Icons" onClick={handleTheme}>
                <Brightness4Icon className={`theme_Icon dark_Icon ${darkMode && 'visible'}`}/>
                <WbIncandescentIcon className={`theme_Icon light_Icon ${!darkMode && 'visible'}`}/>
            </div>
        </>
    )
}




export default Header;
