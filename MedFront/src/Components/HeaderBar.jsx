import React from 'react';
import { useState,useEffect } from 'react';
import { NavBar } from './headerfiles/NavBar';
import  {AdminNavBar}  from './AdminNavBar';
export const HeaderBar = () => {
    const [isAdmin,setIsAdmin]=useState(false);
    const role=localStorage.getItem("role");
    useEffect(()=>{
        if(role==='admin')setIsAdmin(true);
    },[role])
    return (
        isAdmin ? <AdminNavBar/> :<NavBar/>
    )
}
