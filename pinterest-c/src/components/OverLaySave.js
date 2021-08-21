import React, {memo, useState, useEffect} from 'react';
import '../styles/modal.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import { collectionCreateAction } from '../actions/pinsActions';
import Loader from './Loader';
import Alert from './Alert';
import { userCollectionsRequest, userSavePin } from '../actions/userActions';
import { useHistory } from 'react-router';

const OverLaySave = memo (({pin,setModal, modal}) => {
    const history = useHistory();

    const [err,setErr] = useState('');
    const [scc,setScc] = useState('');

    const [collectionName, setCollectionName] = useState('');
    const [dropSelection, setDropSelection] = useState('');

    const dispatch = useDispatch();
    const userLogin = useSelector(state=> state.userLogin);
    const {userInfo} = userLogin;
    const createCollectionState = useSelector(state=> state.createCollection);
    const {loading, success, error} = createCollectionState;

    const userCollections = useSelector(state=> state.userCollections);
    const {loading:collectionsLoading, collections, error:collError} = userCollections;

    function OpenModal(e){
        //wrapper click event
        // console.log(e);
        setModal(null);
        e.stopPropagation();
    }    
    const handleSelect = (e)=>{
        setDropSelection(e.target.value.trim())
        userInfo.selectedCollection = e.target.value;
        console.log(userInfo.selectedCollection);
    };
    // userSavePin
    const handleSavePin = (e) =>{
        e.preventDefault();
        if(dropSelection.trim() && pin._id){
            dispatch(userSavePin(pin._id,dropSelection));
            setScc('Pin Saved!');
            setTimeout(()=>setModal(null),1000);
        }else{
            setErr("Please select a collection!");
        }
    }
    const handleCollectionForm = ()=>{
        if(collectionName.trim()){
            dispatch(collectionCreateAction(collectionName.trim()))
        }else{
            setErr("Field Cannot be empty");
        }
    }
    useEffect(()=>{
        if(!userLogin.userInfo){
            history.push('/login')
        }
        if(userInfo.selectedCollection){
            setDropSelection(userInfo.selectedCollection)
        }
        dispatch(userCollectionsRequest());
    },[dispatch,success])
    return (
        <div className={`pop-Wrapper ${modal?"display":"hide"}`} onClick={OpenModal}>
                <div className="popup" onClick={(event)=>event.stopPropagation()}>
                    <div className="create_Collection">
                        <form className="saveBoard">
                            <input  className="input_BoardName" type="text"  placeholder="Create Collection"
                                onChange={(e)=>setCollectionName(e.target.value)}
                                value={collectionName}
                            />
                            <p className="btn-over" onClick={handleCollectionForm} ><AddCircleIcon className="addBoard_Icon"  /></p>
                        </form>
                    </div>
                    <div className="content">
                        <h3>COLLECTIONS:</h3>
                        <form className="savePin" onSubmit={handleSavePin}>
                            <select id="dropDown" onChange={(e)=>handleSelect(e)} value={userInfo.selectedCollection}>    
                                <option disabled="true" selected>Select</option>
                                {
                                    collections && collections.map((coll,i)=>
                                        <option key={i} value={coll.collectionName}>{coll.collectionName}</option>
                                    )
                                }

                            </select>
                            <button type="submit" className="btn_Submit" id="send">Save</button>
                            
                        </form>
                            
                    </div>
                    
                    { (error || err) && 
                        <Alert variant="danger">
                            {error || err}
                        </Alert>
                    }
                    {
                    (success || scc) &&
                        <Alert variant="success">
                            {success && 'Collection Created!' || scc}
                        </Alert>
                    }
                </div>
        </div>
    )
})

export default OverLaySave;


