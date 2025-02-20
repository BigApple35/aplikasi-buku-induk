import React, { useState } from 'react'
import "../css/landignUser.css"

import Background from "../Resource/background.png"
import { useNavigate } from 'react-router-dom'
import client from '../utils/client'


function LandingUser() {
  const nav = useNavigate()
  const [nisn, setNisn] = useState({})
  const search = (e) => {
    client.post("/auth/login-siswa", nisn)
    .then(({data}) => {
      nav("/data-diri/" + data.id)
    })
    .catch((err) => {
      alert(err.response.data.message)
    })
  }



  return (
    <div>
        <img src={Background} alt="" />
        <div className='main-container'>
            <q style={{fontSize : "30px"}}>Buku Induk Virtual : Akses Data Dengan Mudah</q>
            <h1 style={{fontSize : "40px"}}>Data Buku Induk Siswa SMKN 2 Singosari</h1>
            <button onClick={(e) => {nav("/isi-data")}}>Masukkan Data</button>
            <button onClick={(e) => {nav("")}}>Lihat Data Siswa</button>
            <button
              type="button"
              class="btn btn-primary btn-md"
              data-bs-toggle="modal"
              data-bs-target="#haha"
            >
                Check Data
            </button>
            
        </div>


        <div
    class="modal fade"
    id="haha"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    
    role="dialog"
    aria-labelledby="modalTitleId"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalTitleId">
            Modal title
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <input type="text" onChange={(e) => {setNisn({[e.target.name] : e.target.value})}} name='nisn' className='form-control' placeholder='Masukkan NISN'/>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={search}>Save</button>
        </div>
      </div>
    </div>
  </div>
  
    </div>
  )
}

export default LandingUser