import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import AuthService from '../../services/auth-service';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import {theme} from '../style/theme';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
       To pole jest wymagane!
      </div>
    );
  }
};



export default function SignIn(){

const navigate = useNavigate();


 const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
     await AuthService.login(data.get('username'), data.get('password'))
      .then(responseStatus => {
        console.log(responseStatus); 
        if (responseStatus === 200)  {
         toast.success('Zalogowano pomyślnie')
          navigate('/system');
        } 
      })
      .catch(error=>{      
        toast.error('Błędna nazwa użytkownika lub hasło');
      });
  };


  return (   
    <ThemeProvider theme={theme}>
      <Container  sx={{ display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width:350,
            p:2}}>
        <CssBaseline />
          <Avatar sx={{ m: 1, bgcolor: 'error.main',display:'flex',justifyContent:'center' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logowanie
          </Typography>
           <Box component="form" onSubmit={handleSubmit}> 
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="nazwa użytkownika"
              validations={[required]}
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="hasło"
              validations={[required]}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Zapamiętaj mnie"
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Zaloguj się
            </Button>
          </Box>
      </Container>
    </ThemeProvider>
  );
}

