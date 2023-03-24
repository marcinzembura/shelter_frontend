import React from 'react'
import SideBar from '../../components/sidebar/SideBar';
import OwnersComponent from '../../components/owners/OwnersComponent';
import { ThemeProvider, Typography } from '@mui/material';
import theme from '../../components/style/theme';
import {CssBaseline} from '@mui/material';


export default function Owners() {


    
    return (
        <>
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <SideBar />
            <Typography sx={{marginLeft: 30,marginTop: 15,marginBottom:5,fontWeight: 'bold',width: '70%'}}
            variant="h4"  component='h2'
            >
                Właściciele
            </Typography>
            {/* <OwnersToolBar/> */}
            <OwnersComponent />
         </ThemeProvider>
        </>);
}
