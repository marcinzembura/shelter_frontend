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
import PetsIcon from '@mui/icons-material/Pets';
import animalService from '../../services/animal-service'


const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                To pole jest wymagane!
            </div>
        );
    }
};


export default function AddAnimal() {

    const [typeOfAnimal, setTypeOfAnimal] = useState();
    const [gender, setGender] = useState();
    const typeOfAnimalType = ['Pies', 'Kot', 'Inny'];
    const typeOfGender = ['Samiec', 'Samica'];
    const handleRegister = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        animalService.addAnimal({
            name: data.get('name'),
            gender:gender,
            typeOfAnimal: typeOfAnimal,
            age: data.get('age'),
            weight: data.get('weight'),
            status: true,
            picture: data.get('picture'),
            sector: data.get('sector'),
            date:data.get('date')
        }
        )
            .then(responseStatus => {
                    toast.success('Dodano podopiecznego do systemu');
                    window.location.reload(false);
            }).catch(error => {
                console.log(gender);
                console.log(error);
                toast.error('Nie dodano zwierzęcia!');
            }
            );
    }





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
                            bgcolor: "success.main",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <PetsIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
                        Nowy podopieczny
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                id="name"
                                name="name"
                                required
                                fullWidth
                                label="Imię zwierzaka"
                                autoFocus
                                validations={[required]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                               <Autocomplete
                                disablePortal
                                required
                                id="gender"
                                name="gender"
                                options={typeOfGender}
                                onChange={(event, value) => setGender(value)}
                                renderInput={(params) => <TextField {...params} label="Płeć" />}
                            />
                            </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                disablePortal
                                required
                                id="type0fAnimal"
                                name="type0fAnimal"
                                options={typeOfAnimalType}
                                onChange={(event, value) => setTypeOfAnimal(value)}
                                renderInput={(params) => <TextField {...params} label="Rodzaj" />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="age"
                                label="Wiek"
                                name="age"
                                type="number"
                                validations={[required]}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="weight"
                                label="Waga"
                                name="weight"
                                type="number"
                                validations={[required]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="picture"
                                name="picture"
                                label="Zdjęcie"
                                validations={[required]}
                            />
                        </Grid>
                        <Grid item xs={12}sm={6}>
                            <TextField
                                required
                                fullWidth
                                id='sector'
                                name="sector"
                                label="Boks/Sektor"
                                validations={[required]}
                            />
                        </Grid>
                        <Grid item xs={12}sm={6}>
                        <TextField
                             required
                            id="date"
                            name="date"
                            label="Data dodania"
                            type="date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
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