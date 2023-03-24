import React from 'react'
import SideBar from '../../components/sidebar/SideBar';
import { ThemeProvider, Typography } from '@mui/material';
import theme from '../../components/style/theme';
import {CssBaseline} from '@mui/material';
import MealAnomalyComponent from '../../components/mealAnomaly/MealAnomalyComponent'

export default function MealAnomaly() {
    return (
        <>
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <SideBar />
            <Typography sx={{marginLeft: 30,marginTop: 15,marginBottom:5,fontWeight: 'bold',width: '70%'}}
            variant="h4"  component='h2'
            >
                Anomalia zwierząt
            </Typography>
           < MealAnomalyComponent/>
         </ThemeProvider>
        </>);
}
