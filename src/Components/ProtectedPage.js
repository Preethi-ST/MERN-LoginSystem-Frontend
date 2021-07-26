import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router'
import axios from 'axios'
import { SpinnerDotted } from 'spinners-react';

function ProtectedPage() {
    const history = useHistory();
    const [flag,setFlag] = useState(true);
    const [content,setContent] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem('auth-token')
        async function fetchData(){
            const result = await axios.get(`https://mern-authentication-server.herokuapp.com/api/private/Authorized`,
                {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                    }
                }
            )
            setFlag(false)
            setContent(true)
        }
        if(token === null){
            setFlag(false)
        }else{
            fetchData();
        }
        
        
    }, [])
    
    const logoutHandler = () => {
        localStorage.removeItem('auth-token');
        setContent(false)
        history.push('/login')
    }
    return (
        <>
        {
            flag 
            ?
            <div className="d-flex align-items-center justify-content-center" style={{paddingTop:"150px",paddingBottom:"150px"}}>
                <SpinnerDotted /> 
            </div>
            :
            <>
            {
                content
                ?
                <div className='protected-wrapper'>
                    <h1 className='protected-access'>Congrats! You have successfully entered Protected route.</h1>
                    <div>
                    <button className='btn btn-primary' onClick={logoutHandler}>Logout</button>
                    </div>
                </div>
                :
                <div className='unauthorized-access'>
                    <p>You aren't authorized to access to page. Login to continue</p>
                    <Link to='/login'>Login</Link>
                </div>
            }
            </>
        }
        </>
    )
}

export default ProtectedPage
