
import './App.css';
import Login from './pages/login/login';
import Chat from './pages/chat/chat';
import React,{useEffect,useState} from 'react'
import { Routes, Route, json } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
function App() {

  const [user,setuser]=useState({
    isLoggedIn:false
  })
  const navigate = useNavigate();

  useEffect(()=>{
    const user_data = JSON.parse(localStorage.getItem('user-data'));
    if(user_data===null){
      navigate("/login")
        
    }else{
      var usercopy=Object.assign({},user)
      usercopy.isLoggedIn=true
      navigate("/chat")

    }
  },[])

  return (
    <div className="App">
      <Routes>
        <Route index element={ <Login/> }/>
        <Route path="/login" element={ <Login/> }/>
        <Route path="/chat" element={ <Chat/> }/>
      </Routes>

    </div>
  );
}

export default App;
