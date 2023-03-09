import React,{useEffect,useContext,useRef} from 'react'
import { useNavigate } from 'react-router'
import { userContext ,editModeContext} from '../context';
import axios from 'axios';
import './login.css'
function Login() {
    const navigate = useNavigate();
    const [editMode,seteditMode]=useContext(editModeContext);
    const [user,setuser]=useContext(userContext);

    const nameref = useRef(null);
    const emailref = useRef(null);

    useEffect(()=>{
        const user_data = JSON.parse(localStorage.getItem('user-data'));
        
        if(user_data!==null){
            if(editMode===true){

            }else{
                seteditMode(true)
                setuser(user_data)
                navigate("/chat")
            }
            
        }
    },[])
    const login_click=async ()=>{
       
        var usercopy={
            projectid:user.projectid,
            msgs:[]
        }

        usercopy.name=nameref.current.value
        usercopy.email=emailref.current.value
        var data = await axios.post("http://127.0.0.1:3030/generateId")
        usercopy.id=data.data.id

        
        setuser(usercopy)
        localStorage.setItem('user-data', JSON.stringify(usercopy));
        navigate("/chat")
    }

    return (
<div className='wrapper w-100 h-100 d-flex flex-column  align-items-center' style={{position:"relative" , backgroundColor:"#ebeef2"}}>   
         {/* <div className=''>
                <span>Welcome</span>
            </div> */}
            <div className="head-text">
          Pi Bot
          <p>(Online)</p>
          </div>
            
            {/* <div className='mt-2 d-flex flex-column align-items-center w-100'>
                <span>Enter your Name</span>
                <input type="text" className='w-75' ref={nameref} />
            </div>
            <div className='mt-2 d-flex flex-column align-items-center w-100'>
                <span>Enter your Email</span>
                <input type="text" className='w-75' ref={emailref}/>
            </div>
            <button className='mt-2 w-25' onClick={()=>{login_click()}}>Login</button> */}
            <form>

                <div className='field'>
                    <input
                    type="text"
                    placeholder = "Your Name"
                    required = "true"
                    ref={nameref}
                    ></input>

                </div>

                


                <div className='field'>
                    <input
                    type="email"
                    placeholder = "Email Address"
                    required = "true"
                    ref={emailref}
                    ></input>

                </div>

                <div className='field'>
            <button onClick={()=>{login_click()}}>Login</button> 

                </div>

            </form>


            <div className="chatbox__footer__text_" style= {{position:"absolute !important" , backgroundColor:"red !mportant"}} >

            <p>Powered by </p>
            <a href="http://electropi.ai/">Electro Pi</a>
            </div>
        </div>
    )
}

export default Login
