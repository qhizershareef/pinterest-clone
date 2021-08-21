import React, { useEffect, useState } from 'react'
import CreateIcon from '@material-ui/icons/Create';
import PublishIcon from '@material-ui/icons/Publish';
import TuneIcon from '@material-ui/icons/Tune';
import AddIcon from '@material-ui/icons/Add';
import {IconButton} from '@material-ui/core';
import {Link} from "react-router-dom";
import '../styles/profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { userCollectionsRequest, userProfileRequest } from '../actions/userActions';
import Collection from './Collection';
function ProfileComponent({history}) {
    
    const dispatch = useDispatch();
    const userLogin = useSelector(state=> state.userLogin);
    const [selectedView, setView] = useState('Collections');

    const UserProfile = useSelector(state=> state.userProfile);
    const {loading, profileInfo, error} = UserProfile;

    const userCollections = useSelector(state=> state.userCollections);
    const {loading:collectionsLoading, collections, error:collError} = userCollections;

    // const Collection = React.memo(({coll})=>{
    //     const url ='https://picsum.photos/800'+'?sig='+Math.floor(Math.random()*800);
    //     return(
    //     <div className="Colletion_Container" key={coll._id}>
    //         <Link to={'/profile/collections/'+ coll.collectionName}>
    //             <img src={url} alt={coll.collectionName} />
    //             <h3>{coll.collectionName}</h3>
    //         </Link>
    //     </div>)
    // })

    function test(){
        history.push('/')
    }
    useEffect(()=>{
        if(!userLogin.userInfo){
            history.push('/login')
        }else{
            dispatch(userProfileRequest());
            dispatch(userCollectionsRequest());
        }
    },[dispatch])
    return (
        <>
        {profileInfo? <div className="profile_Screen">
            <div className="profile_section">
                <div className="profile">
                    <img onClick={test}  src={profileInfo.profile || `https://ui-avatars.com/api/?length=1&size=1000&bold=true&name=${profileInfo.name}`} alt={profileInfo.name}/>
                    <h1 className="profile_Name">{profileInfo.name}</h1>
                    <div className="row">                       
                        <p><span>{profileInfo.followers.length}</span> followers</p>
                        <p><span>{profileInfo.following.length}</span> following</p>
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
                    <button className={selectedView==='Collections'?'active':'noColor'} id="Coll" onClick={()=>setView('Collections')} >Collections</button>
                    <button className={selectedView==='Pins'?'active':"noColor"} onClick={()=>setView('Pins')} >Pins</button>
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
            {
                selectedView==='Collections'?
                <div className="cards_section">
                    <div className="collectionCards">
                        {
                            collections && collections.map((collection)=><Collection coll={collection} key={collection._id} profileInfo={profileInfo}/>)
                        }
                    </div>
                </div>:
                <div className="Uploaded_Pins">
                    render uploaded pins store them in user.uploaded model 
                </div>
            }
        </div>
:'error/loading'   
}
        </>
    )
}

export default ProfileComponent;
                {/* <div className="card_board">
                    <div className="images">
                        <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="" width={200} height={200} className="img1 img"/>
                        <img src="https://www.gettyimages.in/gi-resources/images/500px/983794168.jpg" alt="" width={200} height={200} className="img2 img"/>
                        <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="" width={200} height={200} className="img3 img"/>
                    </div>
                </div> */}