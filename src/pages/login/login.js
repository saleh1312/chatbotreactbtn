import React,{useEffect,useContext,useRef} from 'react'
import { useNavigate } from 'react-router'
import { userContext } from '../context';
function Login() {
    const navigate = useNavigate();
    const [user,setuser]=useContext(userContext);
    const nameref = useRef(null);
    const emailref = useRef(null);

    useEffect(()=>{
        const user_data = JSON.parse(localStorage.getItem('user-data'));
        
        if(user_data!==null){
            setuser(user_data)
            navigate("/chat")
        }
    },[])
    const login_click=()=>{
       
        var usercopy=Object.assign({},user)
        usercopy.name=nameref.current.value
        usercopy.email=emailref.current.value
        setuser(usercopy)
        localStorage.setItem('user-data', JSON.stringify(usercopy));
        navigate("/chat")
    }

    return (
        <div className='w-100 h-100 bg-dark d-flex flex-column justify-content-center align-items-center text-light'>
            <div className=''>
                <span>Welcome</span>
            </div>
            <div className='mt-2 d-flex flex-column align-items-center w-100'>
                <span>Enter your Name</span>
                <input type="text" className='w-75' ref={nameref}/>
            </div>
            <div className='mt-2 d-flex flex-column align-items-center w-100'>
                <span>Enter your Email</span>
                <input type="text" className='w-75' ref={emailref}/>
            </div>
            <button className='mt-2 w-25' onClick={()=>{login_click()}}>Login</button>

        
        </div>
    )
}

export default Login