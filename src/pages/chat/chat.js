import { useState,useContext, useEffect } from "react"
import { userContext } from "../context"
import React from 'react'
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu
} from 'react-pro-sidebar';
import { Link } from "react-router-dom";

function Chat() {
  const [user,setuser]=useContext(userContext);
  const { collapseSidebar } = useProSidebar();
  useEffect(()=>{
    console.log(user)
  },[])
  const [data,setdata]=useState({
    projectid:"",
    msgs:[{
      value:"Hello "+user.name+" you can select service you want to react with by clicking on the option you want",
      type:"",
      me:false
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
      data.msgs.map((ele,i)=>{

        if(ele.me===true){
          return(
            <div className="w-100 d-flex flex-row-reverse mt-2 pr-2" key={i}>
              <div className="bg-warning p-2" style={{borderRadius:"25px",maxWidth:"80%"}}>
                <span style={{wordWrap: "break-word"}}>{ele.value}</span>

              </div>
            </div>
          )
        }else{
          return(
            <div className="w-100 d-flex flex-row mt-2 pl-2" key={i}>
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
      <div
        style={{
          display: 'flex',
          height: '100%',
          position: 'absolute',
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
              routerLink={<Link to="/dashboard/extentions" />}
              rootStyles={{
                color: 'white',
                ':hover': { color: 'black' },
                fontWeight: 'bold',
              }}
            >
              Extentions
            </MenuItem>
            <MenuItem
              routerLink={<Link to="/dashboard/flows" />}
              rootStyles={{
                color: 'white',
                ':hover': { color: 'black' },
                fontWeight: 'bold',
              }}
            >
              Flow
            </MenuItem>
            <MenuItem
              routerLink={<Link to="/dashboard/livechat" />}
              rootStyles={{
                color: 'white',
                ':hover': { color: 'black' },
                fontWeight: 'bold',
              }}
            >
              Live chat
            </MenuItem>
            <MenuItem
              routerLink={<Link to="/projects" />}
              rootStyles={{
                color: 'white',
                ':hover': { color: 'black' },
                fontWeight: 'bold',
              }}
            >
              Back to projects
            </MenuItem>
            <SubMenu label="QR Code" rootStyles={{color: 'white',':hover': { color: 'black',backgroundColor:'white' },fontWeight: 'bold'}}>
                <MenuItem
                  routerLink={<Link to="/dashboard/readcontacts" />}
                  rootStyles={{
                    color: 'white',
                    backgroundColor:'black',
                    ':hover': { color: 'black' },
                    fontWeight: 'bold',
                  }}
                >
                  read contacts
                </MenuItem>
                <MenuItem
                  routerLink={<Link to="/dashboard/webcamqrcode" />}
                  rootStyles={{
                    color: 'white',
                    backgroundColor:'black',
                    ':hover': { color: 'black' },
                    fontWeight: 'bold',
                  }}
                >
                  webcam
                </MenuItem>
            </SubMenu>
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
