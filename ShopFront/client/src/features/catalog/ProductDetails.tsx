import { Button, Divider, Grid, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import agent from "../../api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Basket } from "../../app/models/basket";
import { Product } from "../../app/models/product";

export default function ProductDetails(){
    const {basket, setBasket , removeItem} = useStoreContext() ; 
    const {id} = useParams<{id: string}>(); 
    const [product , setProduct] = useState<Product | null>(null);
    const [isLoading, setLoading] = useState(true) ; 
    const [quantity , setQuantity] = useState(0) ; 
    const item = basket?.items?.find(item => item.productId === parseInt(id)) ; 

    useEffect(()=>{
        if(item)setQuantity(item.quantity) ; 

        agent.Catalog.details(parseInt(id))
        .then(data => setProduct(data))
        .catch(err => console.log(err))
        .finally(()=> setLoading(false)) ; 

    },[id, item]);

    function handleInputChange(event : any){
        const value = parseInt(event.target.value) ; 
        if(value < 0)return ; 
        setQuantity(value) ; 
    }

    function handleUpdateCard(){
        if(!item || quantity > item.quantity){
            const updatedQuantity = item ? quantity - item.quantity : quantity; 
            agent.Basket.addItem(parseInt(id), updatedQuantity)
                    .then(newBasket => setBasket(newBasket as unknown as Basket))
                    .catch(error => console.log(error))
        }else{
            const updatedQuantity = item?.quantity - quantity ; 
            agent.Basket.removeItem(parseInt(id) , updatedQuantity)
                        .then(()=> removeItem(parseInt(id) , updatedQuantity))
        }
    }

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
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <label>Quantity in basket</label>
                        <input type="number" value={quantity} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <Button sx={{height : "55px"}}color= "primary" 
                            size="large" variant="contained" onClick={handleUpdateCard}
                            disabled={item?.quantity === quantity  || !item && quantity === 0 }>
                            {item ? "update quantity" : "add to cart"}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}