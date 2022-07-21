import React from "react";
import {auth} from "../firebase";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,} from "firebase/auth";




const AuthForm = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [newAccount, setNewAccount] = React.useState(true);
    const [error, setError]= React.useState("");
    const onChange = (event) => {
        const {target:{name, value}} =event;


        if(name === "email") {
            setEmail(value)
        } else if (name ==="password") {
            setPassword(value);
        }
    };
    const onSubmit = async(event) => {
        event.preventDefault()
        try {
            let data;
            if (newAccount) {
               data= await createUserWithEmailAndPassword(auth, email, password);
             } else {
               data= await signInWithEmailAndPassword(auth, email, password);
             }
             console.log(data);
        } catch(error) {
            setError(error.message);
        }
    }

    
    const toggleAccount=() =>setNewAccount(prev =>!prev)

    return (
     <>
      <form onSubmit={onSubmit} className="container">
                <input 
                name="email" 
                type="email" 
                placeholder="Email" 
                required 
                value={email}
                onChange={onChange}
                className="authInput"
                />
                <input 
                name="password" 
                type="password" 
                placehoder="Password" 
                required 
                value={password}
                onChange={onChange}
                className="authInput"
                />
                <input 
                type="submit" 
                className="authInput authSubmit"
                value={newAccount ? "Create Accout" : "Log In" }
                />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "Sign in" : "Create Acount"}
            </span>
     </>   
    )
    

}

export default AuthForm; 