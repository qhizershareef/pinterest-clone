import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSavedPins } from '../actions/userActions';
import ImageComponent from '../components/ImageComponent';
import Loader from '../components/Loader';

function CollectionScreen({match, history, location}) {

    const collectionName = match.params.name;
    const dispatch = useDispatch();
    const userSaved = useSelector(state=> state.userSavedPins);
    const {loading, savedPins, error} = userSaved;

    useEffect(()=>{
        dispatch(getSavedPins(collectionName))
    },[dispatch])

    console.log(match.params.name);
    console.log(savedPins);
    return (
        <div>
            {
                loading 
                    &&
                <div className="loader_Main">
                    <Loader pinscreen={true}/>
                </div>
            }
            <div className="Pinterest_Images">
                
                {
                    savedPins && savedPins.map(data=>
                            <ImageComponent pinData={data.pin} key={data.pin._id} savedPin={true}/>
                        )
                }
                
           </div>
        </div>
    )
}

export default CollectionScreen;
