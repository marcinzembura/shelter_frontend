import React from 'react'
import SideBar from '../../components/sidebar/SideBar';
import { ThemeProvider, Typography } from '@mui/material';
import theme from '../../components/style/theme';
import {CssBaseline} from '@mui/material';
import MedicalCardComponent from '../../components/medicalCard/MedicalCardComponent'

export default function MedicalCard() {
    return (
        <>
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <SideBar />
            <Typography sx={{marginLeft: 30,marginTop: 15,marginBottom:5,fontWeight: 'bold',width: '70%'}}
            variant="h4"  component='h2'
            >
                Historia medyczna
            </Typography>
           < MedicalCardComponent/>
         </ThemeProvider>
        </>);
}
