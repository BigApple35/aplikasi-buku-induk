import React, { useState } from 'react'
import background from "../Resource/background.png"
import logo from "../Resource/logo-smkn.png"
import "../css/loginAdmin.css"
import { FaEnvelope } from 'react-icons/fa6'
import client from '../utils/client'

function AdminOTP() {

    const [otpCode, setOtpCode] = useState('');

    const handleChange = (event) => {
      setOtpCode(event.target.value);
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault()
      try {
        const response = await client.post('/auth/code-admin', { code: otpCode });
        localStorage.setItem("token", response.data.token)
        window.location.reload()
        console.log('Verification successful', response.data);
      } catch (error) {
        alert(error.response.data.message)
      }
    };

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
                        <div style={{fontSize : 18, opacity : .3, fontFamily : "Inter"}}>Langkah 2 dari 2</div>
                        <h1 >Verifikasi</h1>
                    </div>
                    <hr />
                    <div className=' d-flex flex-column w-100 align-items-center' style={{marginTop : "70px"}}>
                        <input onChange={handleChange} type="text" name="" id="Email" style={{textAlign : "center", width : "100%"}} className='input-login'/>
                        <div style={{fontSize : "24px", textAlign : "center", opacity : ".4"}}>Kami telah mengirim Kode Verifikasi ke Email Anda</div>
                        <FaEnvelope size={60} opacity={.4}/>
                    </div>

                    <div className='' style={{width : "100%", display : "flex", flexGrow : "1", alignItems : "end", justifyContent : "center"}}>
                        <button onClick={handleSubmit} className='btn btn-primary' >Submit</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminOTP