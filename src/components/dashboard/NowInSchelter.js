import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoneyIcon from '@mui/icons-material/Money';
import animalService from '../../services/animal-service';
import { useState, useEffect } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';






export default function NowInSchelter() {


  const [number, setNumber] = useState();

  useEffect(() => {
    animalService.getNumberOfActiveAnimals()
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
    // {...props}
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
              LICZBA ZWIERZĄT
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
                backgroundColor: 'error.main',
                height: 56,
                width: 56
              }}
            >
              <HomeOutlinedIcon />
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