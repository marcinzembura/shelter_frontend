import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import WindowIcon from '@mui/icons-material/Window';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { useState } from 'react';
import Dialog from './Dialog'
import DialogOwner from '../owners/Dialog'

export default function AnimalsToolbar() {



    const navigate = useNavigate();

    return (

        <Box
            sx={{
                marginLeft: 30,
                marginTop: 15,
                width: '70%'
            }}>
            <Typography
                sx={{ m: 1 }}
                variant="h4"
            >
                Zwierzęta przebywające w schronisku
            </Typography>
            <Card>
                <Box sx={{
                    m: 3,
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>

                    <TextField sx={{ maxWidth: 400 }}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SvgIcon
                                        color="action"
                                        fontSize="small"
                                    >
                                        <SearchIcon />
                                    </SvgIcon>
                                </InputAdornment>
                            )
                        }}
                        placeholder="Szukaj..."
                        variant="outlined" />
                    <Box sx={{
                        alignItems: 'center',
                        // display:'flex',
                        justifyContent: 'flex-end',
                        // flexWrap: 'wrap',


                    }}>
                        {/* <Button
                            sx={{ p: 1, pl: 3, pr: 3, marginRight: 1 }}
                            color='secondary'
                            variant="contained"
                            startIcon={(<AddCircleOutlineIcon />)}
                        >
                            Dodaj zwierzę
                        </Button> */}
                        <DialogOwner />
                        <Dialog />
                    </Box>
                </Box>
            </Card>
        </Box >

    );
}
