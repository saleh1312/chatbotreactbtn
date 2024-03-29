
import './App.css';
import Login from './pages/login/login';
import Chat from './pages/chat/chat';
import React,{useEffect,useState} from 'react'
import { Routes, Route } from "react-router-dom"

import { editModeContext,chat_stateContext ,userContext,socketContext} from './pages/context';
import { io } from 'socket.io-client';
import { SERVER_LINK } from './vars';

function App() {
  const [editMode,seteditMode]=useState(false)

  const [socket,setsocket]=useState(null)

  const [chat_state,setchat_state]=useState("flow")

  useEffect(()=>{
    if(socket===null){
      var socket_connected=io(`${SERVER_LINK}/clients`)
      socket_connected.on("message_from_admin",(data)=>{
        let message = data["message"]
        let customerid = data["customerid"]
        console.log("message from admin ")
        console.log(message)
        console.log(customerid)
      })
      setsocket(socket_connected)
      
    }
  },[])

  const [user,setuser]=useState({
    projectid:"639ba58c30d557ff89300e6a",
    msgs:[
      // {
      //   value:"Hello "+user.name+" you can select service you want to react with by clicking on the option you want",
      //   type:"",
      //   me:false
      // },{
      //   value:"test messagesssssssssssadssssssssssssssdsssssssssssssssssssssssssssssssssssssssssssssssssssss",
      //   type:"",
      //   me:false
      // },{
      //   value:"test messagesssssssssssadssssssssssssssdsssssssssssssssssssssssssssssssssssssssssssssssssssss",
      //   type:"",
      //   me:true
      // },{
      //   value:"test messagesssssssssssadssssssssssssssdsssssssssssssssssssssssssssssssssssssssssssssssssssss",
      //   type:"",
      //   me:false
      // }
    ]
  })

  return (
    <div className="App">
      <userContext.Provider value={[user, setuser]}>
        <editModeContext.Provider value={[editMode,seteditMode]}>
          <socketContext.Provider value={[socket,setsocket]}>
            <chat_stateContext.Provider value={[chat_state,setchat_state]}>

            
                <Routes>
                  {/* <Route index element={ <Login /> }/> */}
                  <Route path="/:projectId" element={ <Login/> }/>
                  <Route exact path="/chat" element={<Chat />}/>
                </Routes>


            </chat_stateContext.Provider>
          </socketContext.Provider>
        </editModeContext.Provider>
      </userContext.Provider>
      

    </div>
  );
}

export default App;
