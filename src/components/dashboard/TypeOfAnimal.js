import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoneyIcon from '@mui/icons-material/Money';
import animalService from '../../services/animal-service';
import { useState, useEffect } from 'react';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';





export default function TypeOfAnimal() {
  var numberOfActiveAnimals = animalService.getNumberOfActiveAnimals();

  const [number, setNumber] = useState();


  useEffect(() => {
    animalService.getNumberOfTypeAnimal()
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
              LICZBA GATUNKÓW ZWIERZĄT
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {number}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'warning.light',
                height: 56,
                width: 56
              }}
            >
              <PetsOutlinedIcon />
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