import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from '../Assets/Logo.png'
import './Pagina.css'
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import { Badge } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../Reducer';
import axios from 'axios';
import Cookies from 'js-cookie';


export default function Navbar() {
    const [{ basket, user }, dispatch] = useStateValue()
    const navigate = useNavigate();

    // const handleAuth = async () => {
    //     if (user) {

    //         localStorage.removeItem('token');

    //         dispatch({
    //             type: actionTypes.EMPTY_BASKET,
    //             basket: []
    //         });
    //         dispatch({

    //             type: actionTypes.SET_USER,
    //             user: null
    //         });
    //         // Redirigir al usuario a la página de inicio
    //         navigate("/");
    //     }

    // };

    const handleAuth = async () => {
        if (user) {
          try {
            const token = Cookies.get('token');
            const response = await axios.get('http://localhost:3001/verify', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            if (!response.ok) {
              throw new Error('Token inválido');
            }
          } catch (error) {
            Cookies.remove('token');
            dispatch({
              type: actionTypes.EMPTY_BASKET,
              basket: []
            });
            dispatch({
              type: actionTypes.SET_USER,
              user: null
            });
            navigate("/");
          }
        }
      };







    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" className='nav'>
                <Toolbar>
                    <Link to={"/"}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}

                        >
                            <img src={logo} alt="" className='logo' />
                        </IconButton>
                    </Link>

                    <div className='nav1' />
                    <Typography variant="h6" color="textPrimary" component="textPrimary" sx={{ flexGrow: 1 }}>
                        Bienvenido {user ? user.email : "Invitado"}
                    </Typography>
                    <div className='button'>
                        <Link to={"/SignIn"}>
                            <Button variant='outlined' onClick={handleAuth} >
                                <strong>{user ? "Cerrar Sesión" : "Iniciar Sesión"}</strong>
                            </Button>

                        </Link>


                        <Link to={"/CheckoutPage"}>
                            <IconButton aria-label="show card items" color="inherit">
                                <Badge badgeContent={basket?.length} color="secondary">
                                    <AddShoppingCartSharpIcon fontSize='large' color="primary" />
                                </Badge>
                            </IconButton>
                        </Link>

                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
