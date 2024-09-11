import React, { useState } from 'react';
import Display from './displayName/Display.js';
import Password from './password/Password.js';
import Image from './image/Image.js';
import Username from './userName/Username.js';
import { Link, useNavigate } from 'react-router-dom';

function Sign({ users, setUsers }) {
  const navigate = useNavigate();
  const [isNameReady, setIsNameReady] = useState(null);
  const [isPasswordReady, setIsPasswordReady] = useState(null);

  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [display, setDisplay] = useState(null);
  const [picture, setPicture] = useState(null);

  async function handleSubmit(event) {
    if (isNameReady && isPasswordReady && display) {
      try{
        event.preventDefault();
      const newUser = {
        username: name,
        password: password,
        displayName: display,
        profilePic: picture
      };
      const res = await fetch('http://localhost:5000/api/Users', {
method: 'post', // send a post request
headers: {
'Content-Type': 'application/json', // the data (username/password) is in the form of a JSON object
},
'body': JSON.stringify(newUser) // The actual data (username/password)
});
if (res.status != 200){
  const errorMessage = await res.text();
  alert("This usrname is already exists. please peek another one");
} else {
  navigate('/login'); // Navigate to the LogIn component
}

      } catch(error){
        console.error('An error occurred:', error);
      } 
    }else{
      alert("One or more of the lables are missing");
    }
  }

  return (
    <div>
      <div className="patterns sea"></div>
      <form onSubmit={handleSubmit} >
        <div className="container-fluid" id="sign-screen">
          <Username setIsReady={setIsNameReady} setVal={setName} />
          <Password setIsReady={setIsPasswordReady} setVal={setPassword} />
          <Display setVal={setDisplay} />
          <Image setVal={setPicture} />
          <div>
            <button type="submit" className="btn btn-primary screen-foot" id="login">
              Register
            </button>
            <span className="screen-foot" id="register">
              Already registered? <Link to="/login">click here</Link> to log-in
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sign;

 
