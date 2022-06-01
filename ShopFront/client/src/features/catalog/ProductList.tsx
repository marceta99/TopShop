import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props{
    products : Product[] ; 
}

export default function ProductList({products} : Props){
    return (
        <>
            <Grid container spacing={4}>
            {products.map((prod : Product, index:number) =>(
                    <Grid item xs={3} key={index}>  
                        <ProductCard product={prod} index={index}></ProductCard>
                    </Grid> 
                ))}
            </Grid>
        </>
    );
}