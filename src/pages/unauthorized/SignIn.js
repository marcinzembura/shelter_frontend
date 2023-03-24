// import { Dialog } from '@mui/material';
import React from 'react';
import '../../App.css'
import Navbar from '../../components/homePage/Navbar'
// import Sign from '../../components/signIn/SignIn'
import SignInDialog from '../../components/signIn/SignDialog'

export default function SignIn(){
    return(
        <>
        <Navbar/>
        <SignInDialog/>
        </>
    )
}
