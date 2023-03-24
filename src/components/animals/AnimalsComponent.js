import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from "react-router-dom";
import animalService from '../../services/animal-service';


export default function AnimalsComponent() {

    const [animalsArray, setAnimals] = useState([]);


    useEffect(() => {
            animalService.getActiveAnimals()
            .then((result) => {
                setAnimals(result.data);
                console.log(animalsArray)
            }).catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <>
            <Box sx={{ marginTop: 8, marginLeft: 35, width: '75%' }}>
                <Grid
                    container
                    direction="row"
                    spacing={{ xs: 7, md: 7 }}
                    columns={{ xs: 4, sm: 20, md: 12 }}
                >
                    {animalsArray.map((animal) => (
                        <Card sx={{ m: 3, maxWidth: 250, borderRadius: 3 }}>
                                <CardMedia
                                    component="img"
                                    image={animal.picture} />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">

                                        {animal.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ID: {animal.id}<br></br>
                                        RODZAJ: {animal.typeOfAnimal}<br></br>
                                        SEKTOR: {animal.sector}

                                    </Typography>
                                </CardContent>
                        </Card>
                    ))}



                </Grid>
            </Box></>
    );
}