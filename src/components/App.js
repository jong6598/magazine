import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import {auth} from "../firebase";
import AppRouter from "./Router";
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userObj, setUserObj] = React.useState(null);

  React.useEffect (()=>{
    auth.onAuthStateChanged((user)=> {
      if(user){
        setIsLoggedIn(true);
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile: (args) => updateProfile(user,{displayName: user.displayName 
          }),
        });
        if(user.displayName===null){
          const name = user.email.split("@")[0];
          user.displayName=name;
        }
        } else {
          setUserObj(null);
        }
        setInit(true);
      });
  },[]);

  const refreshUser= () => {
    const user=auth.currentUser;
    setUserObj({
      uid: user.usd,
      displayName:user.displayName,
      updateProfile: (args) => updateProfile(user,{displayName: user.displayName
      }),
    });
  }

  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser}
      isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..." }
    </>
  )
}

export default App;
