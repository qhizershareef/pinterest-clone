import React, { useEffect, useState } from 'react'
import '../styles/animation.css';
import '../styles/loginscreen.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userRegister } from '../actions/userActions';
import Loader from './Loader';
import Alert from './Alert';

function Login({location,history}) {

    const [selectedView, setView]= useState('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const userLoginData = useSelector(state=> state.userLogin);
    const {loading, userInfo, error} = userLoginData;

    
    const userRegisterData = useSelector(state=> state.userRegister);
    const {loading:regLoading, userInfo:userRegInfo, error:regError} = userRegisterData;

    const handleView = ()=>{
        if(selectedView==='login'){
            setView('register')
        }
        else{
            setView('login')
        }
    }

    const handleLogin=(e)=>{
        e.preventDefault();
        dispatch(userLogin(username,password))
    }
    const handleRegister= (e)=>{
        e.preventDefault();
        dispatch(userRegister({name:username,email,password}))
    }

    const redirect = location.search ? location.search.split('=')[1]: '/';

    useEffect(()=>{
        if(userInfo || userRegInfo){
            history.push(redirect)
        }

    },[dispatch, userInfo, userRegInfo])

    console.log('login')
    return (
        <div className="login_Container" style={{background:'white'}}>
            <div className="login_Screen">
                
            </div>
            <div className="login_View">
                <div className="login_Form">
                    <a href="/">
                        <img src="https://i.pinimg.com/originals/1b/76/01/1b7601e035a83c13c208b4ec905ee6d9.png"/>
                    </a>
                    {
                        selectedView==='login'?
                        <form onSubmit={handleLogin}>
                            <input type="text" placeholder="username" 
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                            />
                            <input type="password" placeholder="password" 
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            {
                                loading && <Loader/>
                            }
                            
                            <button type="submit">Submit</button>
                            <br />
                            
                            <div className="pin_Join">
                                Not on pinshare yet? <strong onClick={handleView}>register</strong>
                            </div>
                        </form>
                        :
                        <form onSubmit={handleRegister}>
                            <input type="text" placeholder="email" 
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder="email" 
                            />
                            <input type="text"
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                                placeholder="username" 
                            />
                            <input type="password" 
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                placeholder="password" 
                            />
                            {
                                regLoading && <Loader/>
                            }
                            <button type="submit">Submit</button>
                            <br />
                            <div className="pin_Join">
                                already a user? <strong onClick={handleView}>login</strong>
                            </div>
                        </form>
                    }
                </div>
                { (error || regError) && 
                    <Alert variant="danger">
                        {error || regError}
                    </Alert>
                }
            </div>
        </div>
    )
}

export default Login;
