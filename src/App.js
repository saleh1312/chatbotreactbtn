
import './App.css';
import Login from './pages/login/login';
import Chat from './pages/chat/chat';
import React,{useEffect,useState} from 'react'
import { Routes, Route, json } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { userContext } from './pages/context';

function App() {

  const [user,setuser]=useState({})

  return (
    <div className="App">
      <userContext.Provider value={[user, setuser]}>
        <Routes>
          <Route index element={ <Login /> }/>
          <Route path="/login" element={ <Login/> }/>
          <Route path="/chat" element={user.name ? <Chat /> : <Login />}/>
        </Routes>

      </userContext.Provider>
      

    </div>
  );
}

export default App;
