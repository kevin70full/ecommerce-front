import * as React from 'react';
import Grid from '@mui/material/Grid';
import './Pagina.css'
import { Typography } from '@mui/material';
import CheckoutCard from './CheckoutCard';
import { Total } from './Total';
import { useStateValue } from '../StateProvider'


export default function CheckoutPage() {
    const [{ basket },] = useStateValue()


    function FormRow() {
        return (
            <div className='grid'>

                <Grid container spacing={2} >

                    {basket.length > 0 ?
                        basket.map((item) => (
                            <Grid item xs={12} sm={8} md={6} lg={4}>
                                <CheckoutCard key={item.id} products={item} />
                            </Grid>
                        )) :
                        <p>No hay productos en el carrito</p>
                    }


                </Grid>


            </div >

        )
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography align='center' gutterBottom variant='h4'>
                    Carrito de Compras
                </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
                <FormRow />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
                <Typography align='center' gutterBottom variant='h4'>
                    <Total basket={basket} />
                </Typography>
            </Grid>

        </Grid>
    )

}