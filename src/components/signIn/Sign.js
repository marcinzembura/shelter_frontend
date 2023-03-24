// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import AuthService from '../../services/auth-service';
// import { Navigate } from "react-router-dom";
// import { Card } from '@mui/material';
// import {theme} from '../theme';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



// const required = value => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//        To pole jest wymagane!
//       </div>
//     );
//   }
// };




// class Login extends React.Component {

//   constructor(props) {
//     super(props);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);

//     this.state = {
//       username: "",
//       password: "",
//       loading: false,
//       message: "",
//       isNavigate:false
//     };
//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value
//     });
//   }




//   handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//      await AuthService.login(data.get('username'), data.get('password'))
//       .then(responseStatus => {
//         console.log(responseStatus); 
//         if (responseStatus === 200)  {
//           toast.success('Zalogowano', {position: toast.POSITION.TOP_RIGHT});
//           setTimeout(() => {
//             this.setState({
//               isNavigate: true
//             });
//           }, 2000);
//         } 
//       })
//       .catch(error=>{      
//           toast.error('Błędna nazwa użytkownika lub hasło', {
//           position: toast.POSITION.TOP_RIGHT
//       });
//       });
//   };


// render(){
//   return (   
//     <ThemeProvider theme={theme}>
//               {this.state.isNavigate && (
//           <Navigate to="/system" replace={true} />
//         )}
//       <Container  sx={{ display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             width:350,
//             p:2}}>
//         <CssBaseline />
//           <Avatar sx={{ m: 1, bgcolor: 'error.main',display:'flex',justifyContent:'center' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Logowanie
//           </Typography>
//            <Box component="form" onSubmit={this.handleSubmit} ref={c => {this.form = c;}}> 
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="nazwa użytkownika"
//               value={this.state.username}
//               onChange={this.onChangeUsername}
//               validations={[required]}
//               name="username"
//               autoComplete="username"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="hasło"
//               value={this.state.password}
//               onChange={this.onChangePassword}
//               validations={[required]}
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Zapamiętaj mnie"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="outlined"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Zaloguj się
//             </Button>
//           </Box>
//           <ToastContainer />
//         {/* </Card> */}
//       </Container>
//     </ThemeProvider>
//   );
// }
// }
// export default Login;
