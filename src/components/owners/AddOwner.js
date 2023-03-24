import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import themecomp from "../style/theme";
import toast from 'react-hot-toast';
import Autocomplete from "@mui/material/Autocomplete";
import FiberNewRoundedIcon from '@mui/icons-material/FiberNewRounded';
import { useEffect, useState } from 'react';
import axios from 'axios';
import animalService from '../../services/animal-service';
import ownerService from '../../services/owner-service';




function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    toast.error('Błędny email');
    return (false)
}

export default function AddOwner() {

    const [selected, setSelected] = useState([]);
    const [animals, setAnimals] = useState();
    const [flag, setFlag] = useState(false);


    const handleRegister = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setFlag(false);
        if (data.get('phoneNumber').length != 9) {
            toast.error('Numer telefonu musi posiadać 9 cyfr');
            setFlag(true);
        } else if (!ValidateEmail(data.get('email'))) {
            setFlag(true);
        } else if (data.get('pesel').length != 11) {
            toast.error('Błędny numer PESEL');
            setFlag(true);
        } else if (flag === false) {
            ownerService.addOwner({
                name: data.get('firstName'),
                surname: data.get('surname'),
                phoneNumber: data.get('phoneNumber'),
                email: data.get('email'),
                pesel: data.get('pesel'),
                address: data.get('address'),
                animal: selected
            }
            ).then(responseStatus => {
                console.log(responseStatus);
                toast.success('Dodano własciciela do systemu');
                window.location.reload(false);
            }).catch(error => {
                console.log(error);
                toast.error('Nie dodano własciciela');
            }
            );
        }
    }


    useEffect(() => {
        animalService.getActiveAnimals()
            .then((result) => {
                setAnimals(result.data);
            }).catch((error) => {
                console.log(error);
            });
    }, []
    )





    return (
        <ThemeProvider theme={themecomp}>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 350,
                        p: 2,
                    }}
                    onSubmit={handleRegister}
                >
                    <Avatar
                        sx={{
                            m: 1,
                            bgcolor: "info.main",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <FiberNewRoundedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
                        Nowy własciciel
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="firstName"
                                name="firstName"
                                required
                                fullWidth
                                label="Imię"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="surname"
                                label="Nazwisko"
                                name="surname"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="phoneNumber"
                                label="Numer telefonu"
                                name="phoneNumber"
                                type="number"
                                helperText='numer telefonu powinien posiadac 9 cyfr'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Adres e-mail"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="pesel"
                                name="pesel"
                                label="PESEL"
                                helperText='PESEL powinien posiadac 11 cyfr'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id='address'
                                name="address"
                                label="Miejsce zamieszkania"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                getOptionLabel={(animals) => `id: ${animals.id} imię: ${animals.name}`}
                                noOptionsText="Nie dostępny!"
                                options={animals}
                                onChange={(event, value) => setSelected(value)}
                                renderInput={(params) => (<TextField {...params} label="Zwierzę, które adoptuje"
                                    id="animal"
                                    name="animal" />)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Dodaj
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}