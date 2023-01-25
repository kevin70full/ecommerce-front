import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider"
import { actionTypes } from "../Reducer";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [correo, setCorreo] = useState("")
  const [clave, setClave] = useState("")
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

   
  const signin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("https://fierce-reaches-03717.herokuapp.com/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: correo, password: clave })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      
      // Guardar el usuario en el state
      dispatch({
        type: actionTypes.SET_USER,
        user: data.user
      });
      
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesion
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electronico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={clave}
              onChange={e => setClave(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recuerdame"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={signin}
            >
              Iniciar Sesion
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Se te olvidó tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <RouteLink to={"/SignUp"} variant="body2">
                  {"¿No tienes una cuenta? Registrate"}
                </RouteLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
