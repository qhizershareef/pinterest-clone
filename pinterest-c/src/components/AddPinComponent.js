import React from 'react'
import {Avatar} from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import '../styles/addpin.css';
/* width : 879
height : 611 */

function AddPinComponent() {
    return (
        <div className="addPin_Container">
            <div className="createPin_Container">
                <div className="select_Board">
                    <select name="select" id="dropDown" className="drop">
                        <option value="" disable>Select</option>
                        <option value="Photography">Photography</option>
                    </select>
                    <button>
                        Save
                    </button>
                </div>
                <div className="divide">
                    <div className="left_Half">
                        <div className="image_Upload">
                            <div className="dotted_border">
                                <PublishIcon className="icon"/>
                            </div>
                        </div>
                        <div className="url_Upload">Save from site</div>
                    </div>
                    <div className="right_Half">
                        <div className="title">
                            <input type="text" placeholder="Add your title"/>
                        </div>
                        <div className="profile_container">
                            <Avatar src="https://i.pinimg.com/75x75_RS/42/16/19/4216195c2a4da59d950879b61993ba90.jpg" className="icon"/>
                            <p>qhizer shareef</p>
                            <div className="followers">
                                4 followers
                            </div>
                        </div>
                        <div className="comment">
                            <input type="text" placeholder="Tell everyone what your Pin is about"/>
                        </div>
                        <div className="destination_Link">
                            <input type="text" placeholder="Add a destination link"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPinComponent;
