import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MaleIcon from '@mui/icons-material/Male';
import { useEffect, useState } from 'react';
import animalService from '../../services/animal-service';


export default function Males() {


    const [numberOfMales, setNumber] = useState();

    useEffect(() => {
      animalService.getNumberOfMales()
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
                            LICZBA SAMCÓW
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {numberOfMales}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'secondary.main',
                                height: 56,
                                width: 56
                            }}
                        >
                            <MaleIcon />
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
                        W naszym schronisku
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}