import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTable from './UserTable';
import Login from './Login';
import './App.css'
import Create from './Create';

function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/user-table" element={<UserTable />}></Route>
        {/* <Route path="/create" element={<Create />}></Route> */}
        <Route path="/edit/:id" element={<Create />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
