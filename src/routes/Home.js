import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, query, getDocs, orderBy, onSnapshot} from '@firebase/firestore'
import Nweet from "../components/Nweet";
import Factory from "../components/Factory";

const Home= ({userObj}) => {
    const [nweets, setNweets] = useState([]);
        React.useEffect(() => {
            const q = query(collection(db, 'nweets'), orderBy('createdAt', 'desc'))    
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const nextNweets = querySnapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    }      
                })
                setNweets(nextNweets)
            })
            return () => {
                unsubscribe()
            }
        }, [])

    return (
        <div className="container">
            <Factory userObj={userObj}/>
            <div style={{ marginTop: 30 }}>
                {nweets.map((nweet) => (
                    <Nweet key = {nweet.id}
                    nweetObj={nweet}
                    isOwner={nweet.creatorId===userObj.uid}/>
                ))}
            </div>
        </div>
    )

}

export default Home;
 