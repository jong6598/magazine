import React, { useState } from "react";
import { db, storageService } from "../firebase";
import { doc, deleteDoc, updateDoc} from "@firebase/firestore"
import { async } from "@firebase/util";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = React.useState(false);
    const [newNweet, setNewNweet] = React.useState(nweetObj.text);

    const onDeleteClick = async() => {
        const ok = window.confirm("Do you want delete?");
        if (ok) {
           await deleteDoc(doc(db, `nweets/${nweetObj.id}`));
           await deleteObject(ref(storageService, nweetObj.attachmentUrl));
        }
    }
    const textEditing = () => setEditing((prev)=>!prev)
    const onSubmit = async(event) => {
        event.preventDefault();
        await updateDoc(doc(db, `nweets/${nweetObj.id}`),{
            text: newNweet,
        })
        setEditing(false)
    };
    const onChange = (event) => {
        const {target:{value}, } =event;
        setNewNweet(value)
    };

  return (
    <div className="nweet">
     {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input 
            type="text" 
            placeholder="Edit comment" 
            value={newNweet} 
            autoFocus
            onChange={onChange} 
            className="formInput"
            required/>
                <input type="submit" value="Update Nweet" className="formBtn" />
            </form>
            <span onClick={textEditing} className="formBtn cancelBtn">
                Cancel
            </span>
        </>
            ):( 
            <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
            {isOwner && (
                <div className="nweet__actions">
                     <span onClick={onDeleteClick}>
                       <FontAwesomeIcon icon={faTrash} />
                     </span>
                     <span onClick={textEditing}>
                       <FontAwesomeIcon icon={faPencilAlt} />
                     </span>
                   </div>
            )} </>
        )}
    </div>
)

}

export default Nweet;