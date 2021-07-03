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
                    <img src="https://image.flaticon.com/icons/svg/145/145808.svg" alt=""/>
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
