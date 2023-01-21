import React,{useEffect} from 'react'
import { useNavigate } from 'react-router'
function Login() {
    const navigate = useNavigate();

    return (
        <div className='w-100 h-100 bg-dark d-flex flex-column justify-content-center align-items-center text-light'>
            <div className=''>
                <span>Welcome</span>
            </div>
            <div className='mt-2 d-flex flex-column align-items-center w-100'>
                <span>Enter your name</span>
                <input type="text" className='w-75'/>

            </div>
            <button className='mt-2 w-25' onClick={()=>{navigate("/chat")}}>Login</button>

        
        </div>
    )
}

export default Login
