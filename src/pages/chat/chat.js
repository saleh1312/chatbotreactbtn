import { useState,useContext, useEffect, useRef } from "react"
import { userContext,editModeContext, socketContext,chat_stateContext} from "../context"
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
import {ButtonsMsg,TextMsg,RepliedButton} from './shapes.js'
import { io } from "socket.io-client";
function Chat() {
  const [user,setuser]=useContext(userContext);
  const [editMode,seteditMode]=useContext(editModeContext);
  const [socket,setsocket]=useContext(socketContext);
  const [chat_state,setchat_state]=useContext(chat_stateContext);

  const { collapseSidebar } = useProSidebar();
  const navigate = useNavigate();
  const msgref=useRef(null)

  useEffect(()=>{
    const effect=()=>{
      socket.emit("join_room",user.id)
      const resp=axios.post("http://127.0.0.1:3030/change_customer_data",{
        "userId":user.id,
        "data":{"chat_state":chat_state},
        "projectId":user.projectid
      })
      console.log(resp)
      //console.log(user)
    }
    effect();
    console.log(user)
  },[])

  const send_message=async (from_text_box=true,message_to_sent="",message_to_show="",message_data={})=>{

    const resp=await axios.post("http://127.0.0.1:3030/message_from_website",{
      "sid":user.projectid,
      "message":from_text_box?msgref.current.value:message_to_sent,
      "userid":user.id,
      "user_data":{
        "name":user.name,
        "email":user.email
      },
      "message_data":message_data,
      "chat_state":chat_state
    })
    console.log(resp.data.msgs)
    var user_copy=Object.assign({},user);
    if(from_text_box===true){
      user_copy.msgs=[...user_copy.msgs,...resp.data.msgs]
    }else{
      user_copy.msgs=[...user_copy.msgs,...resp.data.msgs]
    }

    setuser(user_copy);
    setchat_state(resp.data.msgs[resp.data.msgs.length-1].chat_state)
    
  }

  const show_messages=()=>{
    return(
      user.msgs.map((ele,i)=>{
        if (ele.messaging_type==="buttons"){
          return(<ButtonsMsg data={[ele,i,send_message]} key={i}/>)
        }else if(ele.messaging_type==="text"){
          
          return(<TextMsg data={[ele,i]} key={i}/>)
        }else if(ele.messaging_type==="replied_button"){
          
          return(<RepliedButton data={[ele,i]} key={i}/>)
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
