import { Divider, Grid, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import agent from "../../api/agent";
import { Product } from "../../app/models/product";

export default function ProductDetails(){
    const {id} = useParams<{id: string}>(); 
    const [product , setProduct] = useState<Product | null>(null);
    const [isLoading, setLoading] = useState(true) ; 

    useEffect(()=>{
        agent.Catalog.details(parseInt(id))
        .then(data => setProduct(data))
        .catch(err => console.log(err))
        .finally(()=> setLoading(false)) ; 

    },[]);

    if(isLoading)return (<h1>Loading...</h1>) ; 
    if(!product)return (<h1>product not found</h1>); 

    return(
        <Grid container spacing ={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} style={{width : "100%"}}></img>
            </Grid>
            <Grid item xs={6}>
                <h3>{product.name}</h3>
                <Divider sx={{mb : 2}} />
                <h3>Price : {product.price}</h3>
                <TableContainer>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{product.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>{product.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>{product.brand}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Quantity in stock</TableCell>
                            <TableCell>{product.quantityInStock}</TableCell>
                        </TableRow>
                    </TableBody>
                </TableContainer>
            </Grid>
        </Grid>
    );
}