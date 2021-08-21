import React, { useCallback, useEffect, useState } from 'react';
import '../styles/pinscreen.css';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PublishIcon from '@material-ui/icons/Publish';
// import Pins from '../pins';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, IconButton } from '@material-ui/core';
import { pinDetails, pinLikeAction } from '../actions/pinsActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FavoriteIcon from '@material-ui/icons/Favorite';
import * as ActionTypes from '../actiontypes/pinsConstants';
import { userCollectionsRequest, userFollowAction } from '../actions/userActions';

function PinScreen({match,history}) {
    console.log('pinscreen');

    const location = useLocation()
    const [dropSelection, setDropSelection] = useState('');


    // const[liked, setLiked] = useState(false);
    // const[following, setFollowing] = useState(false);

    const id = match.params.id;

    const dispatch = useDispatch();

    const pinData = useSelector(state=> state.pinDetails);
    const {loading, pin:Pin, error} = pinData;

    const userLoginData = useSelector(state=> state.userLogin);
    const {userInfo, error:loginError} = userLoginData;

    const pinLikeStatus = useSelector(state=> state.pinLike);
    const {success, error:likeError} = pinLikeStatus;
    
    const userFollowStatus = useSelector(state=> state.userFollow);
    const {success:userFollowSuccess, error:userFollowError} = userFollowStatus;

    const userCollections = useSelector(state=> state.userCollections);
    const {loading:collectionsLoading, collections, error:collError} = userCollections;

    const displayModal = ()=>{

    }
    const reset = useCallback(()=>{
        dispatch({type:ActionTypes.PIN_DETAILS_RESET}) 
    },[])

    const handleLike = () =>{
        if(!userInfo){
            history.push('/login?redirect=pin/'+id)
            
        }else{
            dispatch(pinLikeAction(id))
        }
    }

    const handleSelect = (e)=>{
        setDropSelection(e.target.value)
        userInfo.selectedCollection = e.target.value;
        console.log(userInfo.selectedCollection);
    };

    const handleFollow =()=>{
        if(!userInfo){
            history.push('/login?redirect=pin/'+id);
        }else{
            //also check that the pin user is not the same person, error
            dispatch(userFollowAction(Pin.user._id))
            // console.log(userInfo)
            console.log({f:userInfo.following ,p:Pin.user._id})
        }
    }

    useEffect(()=>{

        dispatch(pinDetails(id));

        if(Pin && Pin._id !== id) { 
            dispatch({type:ActionTypes.PIN_DETAILS_RESET});
        
        }
        if(!collections){
            dispatch(userCollectionsRequest());
        }
        

        // if(userFollowSuccess){
        //     dispatch()
        // }
        // if(success){
        //     setLiked(Pin.likes.some(el=> el.user==userInfo._id))
        // }
        // if(userFollowSuccess){
        //     setFollowing(userInfo.following.some(el=> el.user== Pin.user._id))
        // }
        // return(()=>{
        //     dispatch({type:ActionTypes.PIN_DETAILS_RESET});
        // })
        // return () => {
        //     console.log('cleanup')
        //     if(success){
        //     }
        // }
    },[dispatch,id,success,userFollowSuccess,userInfo])

    return (
        <div className="pinScreen_Container">
            {
                Pin && Pin.user?
                
            <div className="post_section">
            <div className="post_div">
                <img src={Pin.pin} alt="house" />
            </div>
            <div className="post_Details">
                <div className="post_Icons">
                    <div className="icons_Left">
                        <MoreHorizIcon className="l_Icon"/>
                        <PublishIcon className="l_Icon"/>
                    </div>
                    <div className="post_Board">
                        <select name="select" id="dropDown" className="drop" 
                            onChange={(e)=>handleSelect(e)}
                        >
                            <option value="DEFAULT" disabled={true} selected={userInfo && !userInfo.selectedCollection}>Select</option>
                            {
                                collections && collections.map((c,i)=><option key={i} value={collections.collectionName}>{c.collectionName}</option>)
                            }
                            {/* <option onClick={displayModal}>Add Board</option>
                            <option value="Photography">Photography</option> */}
                            {/* collections */}
                        </select>
                        <button>
                            Save
                        </button>
                    </div>
                </div>
                <div className="post_Link"> 
                    <a href={Pin.link} className="link" target="_blank">
                        {Pin.link.slice(0,Pin.link.length>=48 ? 42 : Pin.link.length )}...
                    </a>
                </div>
                <div className="post_Title"><h2><strong>{Pin.title}</strong></h2></div>
                <div className="post_Description">{Pin.description}</div>
                <div className="post_pub_Details">
                    <div className="user_Profile">
                        <Link to={'/user/'+Pin.user.name}>
                            <Avatar src={Pin.user.profile} className="icon"/>
                        </Link>
                        <div className="user_Info">
                            <Link to={'/user/'+Pin.user.name}className="ref_Link"> 
                                <h5>{Pin.user.name}</h5>
                                <p>{Pin.user.followers.length} followers</p>
                            </Link>
                        </div>
                        
                    </div>
                    <div className="user_Follow">
                        {
                            userInfo && userInfo._id !== Pin.user._id?
                            Pin.user.followers.some(el=> String(el.user) == userInfo._id)?
                                <button style={{background:'var(--common-theme)',color:'var(--common-theme1)'}} onClick={handleFollow}>
                                    Following
                                </button>
                                :
                                <button onClick={handleFollow}>
                                    Follow
                                </button>
                                :<button onClick={()=> !userInfo? history.push('/login'):alert('Hmmm, cannot follow this user!')}>
                                Follow
                            </button>
                        }
                    </div>
                </div>
                
                <div className="post_Likes">
                        {
                            userInfo && Pin.likes.some(el=> el.user==userInfo._id)?
                            <div>
                                <IconButton onClick={handleLike}><FavoriteIcon className="like_Icon icon_Liked"/></IconButton> {Pin.likes.length} likes
                                </div>
                            :
                        
                            <div>
                                <IconButton onClick={handleLike}><FavoriteIcon className="like_Icon"/></IconButton>{Pin.likes.length} likes

                                </div>
                        }
                        </div>
                {/* <div className="post_Comments">asdfasd</div> */}
            </div>
        </div>
        : <div style={{marginTop:'18%'}}>
            <Loader pinscreen={true} />
        </div>
            }
        </div>
    )
}

export default PinScreen;
