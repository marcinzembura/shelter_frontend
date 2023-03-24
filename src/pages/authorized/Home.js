import axios from 'axios';
import React from 'react';
import { useState,useEffect } from 'react';
import Sidebar from '../../components/sidebar/SideBar';
import DashBoard from '../../components/dashboard/DashBoard';
import { ThemeProvider, Typography } from '@mui/material';
import theme from '../../components/style/theme';
import {CssBaseline} from '@mui/material';





export default function HomeAdmin (){

    return(
        <> 
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Sidebar/>
        <DashBoard/>
        </ThemeProvider>
        </>
    )
}
