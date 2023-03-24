import React from 'react'
import { Paper, Card, Typography, makeStyles, Button, CardHeader } from '@mui/material';
import './style/PageHeader.css'
import { createTheme, Box, Container, ThemeProvider } from '@mui/system';
import { positions } from '@mui/system';
import image from '../assets/images/404-img.jpg'

  

export default function PageHeader(props) {

    const { title, subTitle, icon } = props;
    return (

            <Card     
                sx={{
                    minWidth: 500,
                    margin: 10,
                    marginLeft: 30,
                    borderRadius: 7,
                    backgroundColor: '#253053',
                    display:'flex',
                    
                }}>
                    
                <Card
                sx={{
                    boxShadow: 1,
                    borderRadius: 70,
                    p: 5,
                    margin:2,
                    marginLeft:4,                
                    alignItems: 'center',
                    backgroundColor: '#30829c',
                    display:'inline-block',
                }}>
                    {icon}
                </Card>
                <Card
                    sx={{
                        boxShadow: 1,
                        borderRadius: 4,
                        pl: 6,
                        margin:2,
                        marginLeft: 5,
                        backgroundColor: '#30829c',
                    }}>
                    <Typography
                        sx={{ 
                        margin: 2 ,
                        width:400,
                    }}
                        variant="h4"
                        component="div"
                        fontFamily={'monospace'}
                    >
                        {title}</Typography>
                    <Typography
                        sx={{ margin: 2 }}
                        variant="subtitle"
                        component="div"
                        fontFamily={'monospace'}>     
                                       
                        {subTitle}</Typography>
                </Card>
            </Card>
    )
}