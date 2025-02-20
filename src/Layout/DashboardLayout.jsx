import React from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'

import { LuHome } from "react-icons/lu";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsBarChartLine } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa6";
import { SiGoogleclassroom, SiIfixit } from "react-icons/si";
import { FiBookOpen } from "react-icons/fi";

function DashboardLayout() {
  if (!localStorage.getItem("token")) {
    return(
        <Navigate to={"/admin"}/>
    )
  }

  return (
    <div className='d-flex gap-2'>
        <nav className='vh-100 text-white bg-prim sticky-top'>
            <div className='mt-4 w-100' style={{fontSize : "24px", opacity : "50%"}}>
              Selamat Datang
            </div>
            <div className='divider'></div>
            <div className='navbar-main'>
              <small style={{fontSize : "10px"}}>MAIN</small>
              <NavbarButton icons={<LuHome/>} text={"Halaman Utama"} url={"/dashboard/"}/>
              <NavbarButton icons={<FiBookOpen/>} text={"Mata Pelajaran"} url={"/dashboard/mapel"} />
              <NavbarButton icons={<BsBarChartLine />} text={"Data Siswa"} url={"/dashboard/siswa"} /> 
              <NavbarButton icons={<FaGraduationCap />} text={"Data Angkatan"} url={"/dashboard/angkatan"} /> 
              <NavbarButton icons={<SiGoogleclassroom />} text={"Data Jurusan"} url={"/dashboard/jurusan"} /> 
            </div>
            <div className='divider'></div>
            <NavbarButton icons={<IoLogOutOutline />} logout={true} text={"Keluar"} style={{color : "#CC8889"}} /> 
        </nav>

        <main className='my-2 '>
            <Outlet/>
        </main>
    </div>
  )
}

function NavbarButton({icons, text, active, style, url, logout}){
  url = url ? url : "/thisisnothinglol"

  if(logout){
    return(
      <NavLink to={url} end activeClassName="active" className={`navbar-button `} onClick={(e) => {
        e.preventDefault()
        localStorage.clear()
        window.location.reload()
      }}  style={style}>
      {icons}
      <div>{text}</div>
    </NavLink>
    )
  }

  return (

    <NavLink to={url} end activeClassName="active" className={`navbar-button `}  style={style}>
      {icons}
      <div>{text}</div>
    </NavLink>

  )
}

export default DashboardLayout