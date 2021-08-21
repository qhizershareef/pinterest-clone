import {Link} from "react-router-dom";
import React, { useEffect, useState } from 'react';

const Collection = React.memo(({coll,profileInfo})=>{

    const [recent, setRecent]=  useState('');

    useEffect(()=>{
        const match = profileInfo.saved.find((pin)=>pin.collectionName === coll.collectionName);
        if(match){
            setRecent(match.pin.pin);
        }
    },[coll])
    const temp=[]
    //coll = collectionName + colid
    // function setCollectionImages(){
    //     // collections.forEach(coll=>{
    //         // console.log(coll)
    //         console.log(profileInfo.saved);
    //         // console.log(userLogin.userInfo.saved.find(i=>coll.collectionName===i));
    //     // })
    // }
    // if(collections){
    //     // console.log(collections);
    //     setCollectionImages();
    // }

    const url ='https://picsum.photos/800'+'?sig='+Math.floor(Math.random()*800);

    return(
    <div className="Colletion_Container" key={coll._id}>
        <Link to={'/profile/collections/'+ coll.collectionName}>
            <img src={recent|| url} alt={coll.collectionName} />
            <h3>{coll.collectionName}</h3>
        </Link>
    </div>)
})
export default Collection;
