import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import AuthService from '../../services/auth-service';
import themecomp from "../style/theme";
import toast from 'react-hot-toast';
import { useState } from 'react';



// const required = value => {
//     if (!value) {
//       return (
//         <div className="alert alert-danger" role="alert">
//           To pole jest wymagane!
//         </div>
//       );
//     }
//   };


function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true)
  }
  toast.error('Błędny email');
  return (false)
}


export default function AddEmployee() {

  const [flag, setFlag] = useState(false);


  const handleRegister = async (event) => {
    setFlag(false);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('phoneNumber').length != 9){
      toast.error('Numer telefonu musi posiadać 9 cyfr');
      setFlag(true);
    } else if (data.get('username').length < 3 || data.get('username').length > 20){
      toast.error('Błędna nazwa użytkownika');
      setFlag(true);
    } else if (data.get('password').length < 6 || data.get('password').length > 40){
      toast.error('Błędne hasło');
      setFlag(true);
    } else if (!ValidateEmail(data.get('email'))){
      setFlag(true);
    } else if (flag === false){
      AuthService.register(
        data.get('username'),
        data.get('password'),
        data.get('firstName'),
        data.get('surname'),
        data.get('phoneNumber'),
        data.get('email'),
      )
        .then(() => {
          toast.success('Konto zostało dodane');
          window.location.reload(false);
        }).catch(() => {
          toast.error('Błąd systemu, nie dodano konta!');
        }
        );
    }
  }


  return (
    <ThemeProvider theme={themecomp}>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 350,
            p: 2
          }}
          onSubmit={handleRegister}>
          <Avatar sx={{ m: 1, bgcolor: 'error.main', display: 'flex', justifyContent: 'center' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
            Rejestracja pracownika
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="firstName"
                name="firstName"
                required
                fullWidth
                label="Imię"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="surname"
                label="Nazwisko"
                name="surname"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Login"
                name="username"
                autoComplete="username"
                helperText='liczba znaków pomiędzy 3 a 20'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Adres e-mail"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Hasło"
                type="password"
                id="password"
                autoComplete="new-password"
                helperText='liczba znaków pomiędzy 6 a 40'

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phoneNumber"
                label="Numer telefonu"
                type="number"
                id="phoneNumber"
                autoComplete="phoneNumber"
                helperText='numer telefonu powinien posiadac 9 cyfr'
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Stwórz konto
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}