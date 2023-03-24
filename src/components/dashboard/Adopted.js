import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoneyIcon from '@mui/icons-material/Money';
import animalService from '../../services/animal-service';
import { useState, useEffect } from 'react';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import HolidayVillageOutlinedIcon from '@mui/icons-material/HolidayVillageOutlined';
import authService from '../../services/auth-service';
import { useNavigate } from "react-router-dom";



export default function Adopted() {


  const [number, setNumber] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.getCurrentUser() == undefined) {
      navigate('/');
      window.location.reload(false);
    }
    else if (authService.getCurrentUser().roles.at(0) === 'ROLE_ADMIN' ||
      authService.getCurrentUser().roles.at(0) === 'ROLE_EMPLOYEE') {
      animalService.getNumberOfAdoptedAnimals()
        .then((result) => {
          setNumber(result.data);
        }).catch((error) => {
          console.log(error);
        });
    } else {
      window.location.reload(false);
      navigate("/");
    }
  }, [])





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
                backgroundColor: 'success.main',
                height: 56,
                width: 56
              }}
            >
              <HolidayVillageOutlinedIcon />
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
          <RotateLeftIcon color="error" />
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Adoptowanych
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}