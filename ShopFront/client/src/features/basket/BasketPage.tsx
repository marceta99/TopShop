import { Add, Delete, Remove } from "@mui/icons-material";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Box, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Basket } from "../../app/models/basket";
import BasketSummary from "./BasketSummary";


export default function BasketPage(){
    const {basket, setBasket ,removeItem} = useStoreContext();

    function handleAddItem(productId: number){
      agent.Basket.addItem(productId)
                  .then(bas => setBasket(bas as unknown as Basket))
                  .catch(error => console.log(error))
    }
    function handleRemoveItem(productId: number, quantity = 1){
      agent.Basket.removeItem(productId , quantity)
                  .then(()=> removeItem(productId , quantity))
                  .catch(error => console.log(error))
    }

    if(!basket)return (<h2>Your basket is empty</h2>);
    
    return (
      <>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket?.items?.map(item => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img src={item.pictureUrl} style={{height: 50 , marginRight: 20}}></img>
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{item.price}$</TableCell>
                <TableCell align="right">
                  <IconButton color="error" onClick={()=>handleRemoveItem(item.productId)}>
                    <Remove/>
                  </IconButton>
                  {item.quantity}
                  <IconButton color="secondary" onClick={()=>handleAddItem(item.productId)}>
                    <Add/>
                  </IconButton>
                </TableCell>
                <TableCell align="right">{item.price * item.quantity}$</TableCell>
                <TableCell align="right">
                  <IconButton color="error" onClick={()=>handleRemoveItem(item.productId,item.quantity)}>
                      <Delete/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
            <Grid item xs={6}/>
            <Grid item xs={6}>
                <BasketSummary/>
                <Button sx={{height : "55px"}} color= "primary" 
                            size="large" variant="contained" >
                              <Link to="/checkout">CheckOut</Link>
                </Button>
            </Grid>
      </Grid>
      </>

    ) ; 
}