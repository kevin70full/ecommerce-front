import * as React from 'react';
import Grid from '@mui/material/Grid';
import Product from './Product';
import './Pagina.css'
import { useEffect, useState } from "react"

export default function Products() {

  const url = "https://fierce-reaches-03717.herokuapp.com/Obtener-Productos"
  const [products, setProducts] = useState()
  const fetchMongo = async () => {
    const response = await fetch(url)
    const datos = await response.json()
    console.log(datos)
    setProducts(datos.productos)
  }
  useEffect(() => {
    fetchMongo()
  }, [])


  return (
    <div className='grid' >

      <Grid container spacing={2} >

        {products ? products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product key={product.id} products={product} />
          </Grid>
        )) : <p>Loading...</p>}

      </Grid>
  

    </div >

  );

}
