import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import accounting from 'accounting';
import './Pagina.css'
import { actionTypes } from '../Reducer';
import { useStateValue } from '../StateProvider'





const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),

}));



export default function Product({ 
    products: { id, nombre, precio, estrellas, descripcion, imagen, tipo_de_producto } }
    ) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const addToBasket = () => {
        dispatch({
            type: actionTypes.ADD_TO_BASKET,
            item: {
                id,
                nombre,
                precio,
                estrellas,
                descripcion,
                imagen,
                tipo_de_producto
            }
        })
    }
    
    const [{ basket }, dispatch] = useStateValue()
    

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
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {tipo_de_producto}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to cart" onClick={addToBasket}>
                    <AddShoppingCartSharpIcon />
                </IconButton>

                {
                    Array.from({ length: estrellas }, (_, i) => i).map(i => (
                        <p key={i}>&#11088;</p>
                    ))
                }

                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Descripción:</Typography>
                    <Typography paragraph>
                        {descripcion}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
