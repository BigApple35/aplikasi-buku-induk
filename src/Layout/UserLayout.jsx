import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function UserLayout() {
    if (localStorage.getItem("token")) {
        return(
            <Navigate to={"/dashboard"}/>
        )
    }

    return (
        <>
            <Outlet/>
        </>
    )
}

export default UserLayout