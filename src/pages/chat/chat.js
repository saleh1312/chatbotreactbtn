import { useState,useContext, useEffect, useRef } from "react"
import { userContext,editModeContext } from "../context"
import React from 'react'
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu
} from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {ButtonsMsg,TextMsg} from './shapes.js'

function Chat() {
  const [user,setuser]=useContext(userContext);
  const [editMode,seteditMode]=useContext(editModeContext);
  const { collapseSidebar } = useProSidebar();
  const navigate = useNavigate();
  const msgref=useRef(null)
  useEffect(()=>{
    // console.log(user)
  },[])

  const send_message=async (from_text_box=true,message_to_sent="",message_to_show="")=>{
    const resp=await axios.post("http://127.0.0.1:3030/message_from_website",{
      "sid":user.projectid,
      "message":from_text_box?msgref.current.value:message_to_sent,
      "userid":user.id
    })
    resp.data.me=false

    var user_copy=Object.assign({},user);
    if(from_text_box===true){
      user_copy.msgs=[...user_copy.msgs,{messaging_type:"text",me:true,content:msgref.current.value},resp.data]
    }else{
      user_copy.msgs=[...user_copy.msgs,{messaging_type:"text",me:true,content:message_to_show},resp.data]
    }
    
    setuser(user_copy);
    
  }

  const show_messages=()=>{
    return(
      user.msgs.map((ele,i)=>{
        if (ele.messaging_type==="buttons"){
          return(<ButtonsMsg data={[ele,i,send_message]} key={i}/>)
        }else if(ele.messaging_type==="text"){
          return(<TextMsg data={[ele,i]} key={i}/>)
        }
      })
    )
  }
  
  return (
    
    <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center' style={{position:"relative"}}>
      <div
        style={{
          display: 'flex',
          height: '100%',
          position: 'absolute',
          left:"0px",
          zIndex: '10000',
        }}
      >
        <Sidebar
          collapsedWidth="0px"
          backgroundColor="rgb(0, 0, 0, 1)"
          defaultCollapsed={true}
        >
          <Menu>
            <MenuItem
              rootStyles={{
                color: 'white',
                ':hover': { color: 'black' },
                fontWeight: 'bold',
              }}
              onClick={()=>{seteditMode(true);navigate("/login")}}
              
            >
              login
            </MenuItem>
         
          </Menu>
        </Sidebar>
        <div>
          <button
            className="btn "
            style={{ backgroundColor: 'black', color: 'white' }}
            onClick={() => collapseSidebar()}
          >
            Services
          </button>
        </div>
      </div>
      <div style={{width:"100%",height:"85%",overflowY:"scroll",paddingTop:"33px"}}>
        {
          show_messages()
        }

      </div>
      <div style={{width:"100%",height:"15%"}} className='d-flex flex-row'>
        <input type="text" style={{width:"70%"}} ref={msgref}></input>
        <button className="btn btn-primary" style={{width:"30%"}} onClick={()=>{send_message()}}>Send</button>
        

      </div>
      
    </div>
  )
}

export default Chat
