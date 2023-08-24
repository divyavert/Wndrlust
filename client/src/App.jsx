import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import Login from './pages/Login'
import Layout from './pages/layout'
import Register from './pages/Register'
import axios from 'axios'
import Account from './pages/Account'
import UserContexProvider from './UserContextProvider'

axios.defaults.baseURL = "http://127.0.0.1:4000/";
axios.defaults.withCredentials = true;
function App() {

  return (
    <UserContexProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account/:subpage?/:action?' element={<Account/>}/>
          {/* <Route path='/account/:subpage?' element={<Account/>}/> */}

        </Route>

      </Routes >

    </UserContexProvider>


  )
}

export default App
