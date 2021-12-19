import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import UserOptions from './component/layout/header/UserOptions';
import Router from "./Router"
function App() {
  const {isAuthenticated,user} = useSelector( (state:any) => state.authStore)
  return (
    <>
    {isAuthenticated &&  <UserOptions user={user}/>}
      <Router/>
    </>
  );
}

export default App;
