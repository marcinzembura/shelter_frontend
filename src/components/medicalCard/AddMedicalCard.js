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
import { useEffect, useState } from 'react';
import medicalCardService from '../../services/medicalCard-service';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import animalService from '../../services/animal-service';


const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                To pole jest wymagane!
            </div>
        );
    }
};

export default function AddMedicalCard() {

    const [selected, setSelected] = useState([]);
   
    const [animals, setAnimals] = useState();

    const handleRegister = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        medicalCardService.addMedicalCard({
            doctor:data.get('doctor'),
            nameOfDisease:data.get('nameOfDisease'),
            date:data.get('date'),
            description:data.get('description'),
            animal: selected
        })
            .then(responseStatus => {
                console.log(responseStatus);
                toast.success('Dodano historię medyczną do systemu');
                window.location.reload(false);
            }).catch(error => {
                console.log(error);
                toast.error('Nie dodano zwierzaka');
            }
            );
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
                        <MonitorHeartIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
                        Dodaj historię medyczną
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Autocomplete
                                required
                                getOptionLabel={(animals) => `id: ${animals.id} imię: ${animals.name}`}
                                noOptionsText="Nie dostępny!"
                                options={animals}
                                onChange={(event, value) => setSelected(value)}
                                renderInput={(params) => (<TextField {...params} label="Zwierzę"
                                    id="animal"
                                    name="animal" />)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="doctor"
                                label="Lekarz"
                                name="doctor"
                                validations={[required]}

                            />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                             required
                            id="date"
                            name="date"
                            label="Data badania"
                            type="date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="nameOfDisease"
                                label="Choroba"
                                name="nameOfDisease"
                                validations={[required]}

                            />
                        </Grid>
  
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                multiline
                                id="description"
                                label="Opis"
                                name="description"
                                rows={3}
                                validations={[required]}
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