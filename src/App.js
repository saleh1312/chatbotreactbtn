
import './App.css';
import Login from './pages/login/login';
import Chat from './pages/chat/chat';
import React,{useEffect} from 'react'
import { Routes, Route } from "react-router-dom"
function App() {

  useEffect(()=>{
    const user_data = JSON.parse(localStorage.getItem('user-data'));
    if(user_data===null){
        
    }
  },[])

  return (
    <div className="App">
      <Login/>
      <Routes>
        <Route index element={ <Login/> }/>
        <Route path="/login" element={ <Login/> }/>
        <Route path="/chat" element={ <Chat/> }/>
      </Routes>

    </div>
  );
}

export default App;
