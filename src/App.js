
import './App.css';
import Login from './pages/login/login';
import Chat from './pages/chat/chat';
import React,{useEffect,useState} from 'react'
import { Routes, Route, json } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { userContext } from './pages/context';
import { editModeContext } from './pages/context';
function App() {
  const [editMode,seteditMode]=useState(false)
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
          <Routes>
            <Route index element={ <Login /> }/>
            <Route path="/login" element={ <Login/> }/>
            <Route path="/chat" element={<Chat />}/>
          </Routes>
        </editModeContext.Provider>
      </userContext.Provider>
      

    </div>
  );
}

export default App;
