import React from 'react'
import SideBarAdmin from '../../../components/sidebar/SideBar';
import EmplComponent from '../../../components/employees/EmplComponent';
import { ThemeProvider, Typography } from '@mui/material';
import { CssBaseline } from '@mui/material';
import theme from '../../../components/style/theme';


export default function AddEmployee() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Typography sx={{ marginLeft: 30, marginTop: 15, fontWeight: 'bold', width: '70%' }}
                    variant="h4" component='h2'
                >
                    Pracownicy
                </Typography>
                <SideBarAdmin />
                <EmplComponent />
            </ThemeProvider>
        </>)
}
