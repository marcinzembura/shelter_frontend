import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ElderlyWomanIcon from '@mui/icons-material/ElderlyWoman';
import { useEffect, useState } from 'react';
import animalService from '../../services/animal-service';


export default function Older() {

    const [numberfOlderAnimals, setNumber] = useState();

    useEffect(() => {
        animalService.getNumberOfOlderAnimals()
            .then((result) => {
                setNumber(result.data);
            }).catch((error) => {
                console.log(error);
            });
    }, []
    )

    return (
        <Card
            sx={{
                height: '100%',
                width: '25%',
                m: 4,
            }}
        >
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="overline"
                        >
                            LICZBA PODOPIECZNYCH
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {numberfOlderAnimals}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'info.main',
                                height: 56,
                                width: 56
                            }}
                        >
                            <ElderlyWomanIcon />
                        </Avatar>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        pt: 2,
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <ArrowForwardIcon color="error" />
                    <Typography
                        color="textSecondary"
                        variant="caption"
                    >
                        mających ponad 10 lat
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}