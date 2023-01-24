import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import accounting from 'accounting';
import './Pagina.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../Reducer';

export default function CheckoutCard({ 
    
    products: { id, nombre, precio, estrellas, descripcion, imagen, tipo_de_producto } }) 
    {
    const [{ basket }, dispatch] = useStateValue()
const removeItem=()=>dispatch({
    type: actionTypes.REMOVE_ITEM,
    id,
})
    return (
        <Card sx={{ maxWidth: 285 }} className='card'>
            <CardHeader
                action={
                    <Typography

                        variant='h5'
                        color='textSecondary'
                    >
                        {accounting.formatMoney(precio)}
                    </Typography>
                }
                title={nombre}
                subheader="En-Stock"
            />
            <CardMedia
                component="img"
                height="auto"

                image={imagen}
                alt="Tommy"
            />

            <CardActions disableSpacing className='CardActions'>
                <div className='Starts'>
                    {
                        Array.from({ length: estrellas }, (_, i) => i).map(i => (
                            <p key={i}>&#11088;</p>
                        ))
                    }
                </div>

                <IconButton>
                    <DeleteIcon onClick={removeItem}/>
                </IconButton>
            </CardActions>
            
        </Card>
    );
}
