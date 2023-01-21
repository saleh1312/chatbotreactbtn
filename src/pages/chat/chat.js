import { useState } from "react"
import React from 'react'

function Chat() {
  const [data,setdata]=useState({
    projectid:"",
    msgs:[{
      value:"test message messagesssssssssssadssssssssssssssdsssssssssssssssssssssssssssssssssssssssssssssssssssss",
      type:"",
      me:true
    },{
      value:"test messagesssssssssssadssssssssssssssdsssssssssssssssssssssssssssssssssssssssssssssssssssss",
      type:"",
      me:false
    },{
      value:"test messagesssssssssssadssssssssssssssdsssssssssssssssssssssssssssssssssssssssssssssssssssss",
      type:"",
      me:true
    },{
      value:"test messagesssssssssssadssssssssssssssdsssssssssssssssssssssssssssssssssssssssssssssssssssss",
      type:"",
      me:false
    }]
  })
  const show_messages=()=>{
    return(
      data.msgs.map((ele)=>{

        if(ele.me===true){
          return(
            <div className="w-100 d-flex flex-row-reverse mt-2 pr-2">
              <div className="bg-warning p-2" style={{borderRadius:"25px",maxWidth:"80%"}}>
                <span style={{wordWrap: "break-word"}}>{ele.value}</span>

              </div>
            </div>
          )
        }else{
          return(
            <div className="w-100 d-flex flex-row mt-2 pl-2">
              <div className="p-2" style={{borderRadius:"25px",backgroundColor:"rgb(220,220,220)",maxWidth:"80%"}}>
                <span style={{wordWrap: "break-word"}}>{ele.value}</span>

              </div>
            </div>
          )

        }

        

      })
    )
  }
  return (
    <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
      <div style={{width:"100%",height:"85%",overflowY:"scroll"}}>
        {
          show_messages()
        }

      </div>
      <div style={{width:"100%",height:"15%"}} className='bg-warning d-flex flex-column'>
        

      </div>
      
    </div>
  )
}

export default Chat
