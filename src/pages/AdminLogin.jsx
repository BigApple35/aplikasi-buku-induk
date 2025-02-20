import React, { useState } from 'react'
import background from "../Resource/background.png"
import logo from "../Resource/logo-smkn.png"
import "../css/loginAdmin.css"
import client from '../utils/client'
import { useNavigate } from 'react-router-dom'


function AdminLogin() {
    const [loginData, setLoginData] = useState({})
    const nav = useNavigate()

    const changeData = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name] : e.target.value
        })
    }

    const submitData = (e) => {
        e.preventDefault()
        client.post("auth/login-admin", loginData)
        .then(({data}) => {
            nav("otp")
        })
        .catch((err) => {
            alert(err.response.data.message)
        })
    }

  return (
    <div>
        <img src={background} alt="" id='background' />
        <div className='main-cont container d-flex'>
            <div className='col-6 d-flex justify-content-center align-items-center flex-column h-100'>
                <img src={logo} alt="" style={{width : 350, height : 350}}/>
                <h1>Buku Induk</h1>
            </div>
            <div className='login-cont col-6'>
                <div className='login-card p-5 d-flex flex-column'>
                    <div className='login-card-title '>
                        <div style={{fontSize : 18, opacity : .3, fontFamily : "Inter"}}>Langkah 1 dari 2</div>
                        <h1 >Masuk</h1>
                    </div>
                    <hr />
                    <div className=' d-flex flex-column w-100 mb-4' style={{marginTop : "70px"}}>
                        <label htmlFor="Email"></label>
                        <input type="text" name="email" placeholder='masukkan email anda' onChange={changeData} id="Email" className='fs-5 input-login'/>
                    </div>

                    <div className='mt-2 d-flex flex-column w-100'>
                        <label htmlFor="password"></label>
                        <input type="password" name="password" onChange={changeData} id="password" placeholder='masukkan password anda' className='input-login fs-5'/>
                    </div>

                    <div className='' style={{width : "100%", display : "flex", flexGrow : "1", alignItems : "end", justifyContent : "center"}}>
                        <button className='btn btn-primary' onClick={submitData}>Submit</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminLogin