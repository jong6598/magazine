import React from "react";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { async } from "@firebase/util";
import { updateProfile } from "@firebase/auth";

const Profile= ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = React.useState(userObj.displayName);
    const onLogOutClick = () => {
        auth.signOut();
        history.push('/');  
        };


const onChange = (event) => {
    const { 
        target: {value},
    } = event;
    setNewDisplayName(value);
}
const onSubmit= async(event) => {
    event.preventDefault();
    if(userObj.displayName !==newDisplayName){
    await updateProfile(auth.currentUser,{displayName: newDisplayName
    });
    refreshUser();
    }
}

    return (
        <div className="container">
        <form onSubmit={onSubmit} className="profileForm">  
                <input 
                onChange={onChange} 
                type="text" autoFocus 
                placeholder="Display name" 
                value={newDisplayName}
                className="formInput">    
                </input>
                <input
                type="submit"
                value="Update Profile"
                className="formBtn"
                style={{
                 marginTop: 10,
                 }}
                 />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                    Log Out
                </span>
            </div>
    )
}
export default Profile;

