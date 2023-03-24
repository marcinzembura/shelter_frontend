import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { FaHorse } from "react-icons/fa";
import { useEffect, useState } from 'react';
import animalService from '../../services/animal-service';



export default function Others() {


  const [numberOfTypeOther, setNumber] = useState();

  useEffect(() => {
    animalService.getNumberOfTypeOther()
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
        width:'25%',
        m:4,
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
            LICZBA INNYCH RODZAJÓW
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
           {numberOfTypeOther}
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
            <FaHorse />
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
          zwierząt w naszym schronisku
        </Typography>
      </Box>
    </CardContent>
  </Card>
    );
}