import React from "react";
import { storageService, db,} from "../firebase";
import { collection, addDoc,} from '@firebase/firestore';
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as v4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";



const Factory = ({userObj,}) => {
    const [nweet, setNweet] = React.useState("");
    const [attachment, setAttachment] = React.useState()
    const onSubmit = async(event) => {
        if (nweet === "") {
            return;
          }
        event.preventDefault();
        const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        const attachmentUrl = await getDownloadURL(response.ref)
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        
        await addDoc(collection(db,"nweets"),nweetObj);

        setNweet("");
        
        
        setAttachment("");
    };
    const onChange = (event) => {
        const {
            target: {value},
        } =event;
        setNweet(value);
    };
    const onFileChange = (event)=> {
        const {target: {files},} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) =>{
            const {currentTarget: {result}} =finishedEvent;
            setAttachment(result);
        }

        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => setAttachment("");

    return(
        <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
          <input
            className="factoryInput__input"
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
                <input
                  id="attach-file"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  style={{
                    opacity: 0,
                  }}
                />
                {attachment && ( 
                      <div className="factoryForm__attachment">
                      <img
                        src={attachment}
                        style={{
                          backgroundImage: attachment,
                        }}
                      />
                      <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                      </div>
                    </div>
                    )}
                </form>
                )};

export default Factory;