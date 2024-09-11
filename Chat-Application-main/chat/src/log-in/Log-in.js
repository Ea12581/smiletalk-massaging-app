import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PasswordLog from './password/PasswordLog.js';
import UsernameLog from './userName/UsernameLog.js';

function LogIn({setUser}) {
    const navigate = useNavigate();
    const [isCorrect, setIsCorrect] = useState(true);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);

    async function handleSubmit(event) {
      event.preventDefault();
      const userDetails = {
        "userName": name,
        "password": password
      };
      const res = await fetch('http://localhost:5000/api/Tokens', {
        'method': 'post',
        'headers': {
          'Content-Type': 'application/json',
        },
        'body': JSON.stringify(userDetails)
      });
    
      if (res.status !== 200) {
        setIsCorrect(false);
      } else {
        
        userDetails.token = await res.text();
          const respond = await fetch('http://localhost:5000/api/Users/' + userDetails.userName, {
          'headers': {
          'Content-Type': 'application/json',
          'authorization': 'bearer ' + userDetails.token
            },
          }
                  )
         // Show the server's response
          const user = await respond.json()
          user.registered = "yes"
          user.token = userDetails.token
          setUser(user);
          navigate('/chat');
      }
    }
      
    return (
        <div>
            {
        //<!--background like sea-->
        }
        <div className="patterns sea"></div>
        <form onSubmit={handleSubmit}>
{
            //<!--the log in screen-->
            }
            <div className="container-fluid" id="log-screen">
                    {
                    //<!--Username lable-->
}

                <UsernameLog setVal={setName} />
    {
                //<!--password lable-->
    }
                <PasswordLog setVal={setPassword}/>
                {
                    !isCorrect &&(
                        <div className="lable alert alert-danger">
                            Incorrect username or password
                </div>
                    )
                }
    {
                //<!--login botton-->
    }
                <button type="submit" className="btn btn-primary screen-foot" id="login">Login</button>
               {
                //<!--link to register-->
               }
            <span className="screen-foot" id="register">Not registered? <Link to="/">click here</Link> to register</span>
            </div>
        </form>
    </div>
    );
  }
  
  export default LogIn;