import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from 'react';
import { FaDog } from "react-icons/fa";
import animalService from '../../services/animal-service';

export default function Dogs() {

  const [numberOfDogs, setNumber] = useState();

  useEffect(() => {
    animalService.getNumberOfDogs()
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
              LICZBA PSÓW
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {numberOfDogs}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'info.dark',
                height: 56,
                width: 56
              }}
            >
              <FaDog />
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