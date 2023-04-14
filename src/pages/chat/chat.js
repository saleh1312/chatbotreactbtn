import {useContext, useEffect, useRef } from "react"
import { userContext, socketContext,chat_stateContext} from "../context"
import React from 'react'
import './chat.css';
import axios from "axios";
import {ButtonsMsg,TextMsg,RepliedButton} from './shapes.js'
import {IoSend} from 'react-icons/io5'
import { SERVER_LINK } from "../../vars";


function Chat() {
  const [user,setuser]=useContext(userContext);

  const [socket,setsocket]=useContext(socketContext);
  const [chat_state,setchat_state]=useContext(chat_stateContext);


  const msgref=useRef(null)
  const myRef = useRef(null)


  useEffect(()=>{
    const effect=()=>{
      socket.emit("join_room",user.id)
      const resp=axios.post(`${SERVER_LINK}/change_customer_data`,{
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

  useEffect(()=>{
    myRef.current.scrollIntoView() 
  },[user])

  

  const send_message=async (from_text_box=true,message_to_sent="",message_to_show="",message_data={})=>{

    const resp=await axios.post(`${SERVER_LINK}/message_from_website`,{
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
    msgref.current.value = "";
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
      {/* <div className="chat_header" style={{width:"100%",height:"20%"}}> */}
          <div className="head-text">
          Pi Bot
          <p>(Online)</p>
          </div>
      {/* </div> */}
      
      <div className="chat_body" style={{width:"100%",height:"85%",overflowY:"scroll",paddingTop:"33px"}}>
        {
          show_messages()
        }
      <div ref={myRef}></div> 
      </div>
      {/* <div style={{width:"100%",height:"15%"}} className='d-flex flex-row'>
        <input type="text" style={{width:"70%"}} ref={msgref}></input>
        <button className="btn btn-primary" style={{width:"30%"}} onClick={()=>{send_message()}}>Send</button>
        

      </div> */}
      <div className="chatbox__footer">
      <input type="text"  ref={msgref}
      placeholder = 'Write a message...'
      >
      </input>


      {/* <button className="chatbox__send--footer send__button"  onClick={()=>{send_message()}}>Send</button> */}
      <i> <IoSend style={{color:"white"}} onClick={()=>{send_message()}}></IoSend></i>



      </div>
      <div className="chatbox__footer__text">

        <p>Powered by </p>
        <a href="http://electropi.ai/">Electro Pi</a>
      </div>
    </div>
  )
}

export default Chat
