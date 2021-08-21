import React,{useState} from 'react'
import '../styles/Main.css';
import ShareIcon from '@material-ui/icons/Share';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
function ImageComponent({pinData,callback,setModal,savedPin=false}) {
    const history = useHistory()
    
    const userLogin = useSelector(state=> state.userLogin);

    const {pin,_id}= pinData;
    const displayBoards= ()=>{
        if(!userLogin.userInfo){
            history.push('/login')
        }
        else{
            console.log('callback called');
            callback(pinData);
            setModal(true);
        }
    }

//open only one save modal with the pin id as dependency
    return (
            <div className="single_Image">
                { !savedPin &&
                    <div className="save_button img_Det" onClick={displayBoards}>Save</div>
                }
                <Link to={`/pin/${_id}`} className="pin_Link"><img src={pin} alt="" className="pin_Image"/></Link> 
                <div className="img_info onHover img_Det">
                    <div className="Link_box">
                        <a href={pin}>{pin.slice(0,12)}</a>
                        <strong>...</strong>
                    </div>
                    <div className="right_info">
                        <div className="Share_button"><ShareIcon/></div>
                        <div className="settings_button"><MoreHorizIcon/></div>
                    </div>
                </div>
            </div>)

    }



export default ImageComponent

/* <div className="save_Board_Options">
                <div className="newBoard">
                    <form>
                        <input type="text" id="Board_Val" placeholder="Enter Board Name"/>
                        <input type="submit" value="submit" id="Board_Submit"/>
                    </form>
                </div>
                <div className="user_Boards_DropDown">
                    <select name="boards" id="Dropdown">
                        <option value="Cars">Cars</option>
                        <option value="Nature">Nature</option>
                        <option value="Cars">Cars</option>
                        <option value="Nature">Nature</option>
                        <option value="Cars">Cars</option>
                        <option value="Nature">Nature</option>
                        <option value="Cars">Cars</option>
                        <option value="Nature">Nature</option>
                        <option value="Cars">Cars</option>
                        <option value="Nature">Nature</option>
                        <option value="Cars">Cars</option>
                        <option value="Nature">Nature</option>
                        <option value="Cars">Cars</option>
                        <option value="Nature">Nature</option>
                        <option value="Cars">Cars</option>
                        <option value="Nature">Nature</option>
                    </select>
                </div>
    </div> */