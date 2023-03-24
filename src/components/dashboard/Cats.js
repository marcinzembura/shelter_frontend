import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FemaleIcon from '@mui/icons-material/Female';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { FaCat } from "react-icons/fa";
import { useEffect, useState } from 'react';
import animalService from '../../services/animal-service';

export default function Cats() {


  const [numberOfCats, setNumber] = useState();

  useEffect(() => {
    animalService.getNumberOfCats()
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
            LICZBA KOTÓW
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {numberOfCats}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.light',
              height: 56,
              width: 56
            }}
          >
            <FaCat/>
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