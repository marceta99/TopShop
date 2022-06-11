import { ListItem, ListItemAvatar, Avatar, ListItemText, Card, Button, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { Link } from "react-router-dom";
import agent from "../../api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Basket } from "../../app/models/basket";
import { Product } from "../../app/models/product";

interface Props{
    product: Product ; 
    index : number ; 
}

export default function ProductCard({product , index} : Props){
    const {setBasket} = useStoreContext() ; 

    function handleAddItem(productId : number){
        agent.Basket.addItem(productId)
                    .then(basket => setBasket(basket as unknown as Basket))
                    .catch(error =>console.log(error))
    }

    return(
        <>
          <Card >
                <CardHeader 
                    avatar={
                        <Avatar>{product.name.charAt(0).toUpperCase()}</Avatar>
                    }
                    title={product.name}
                />
                <CardMedia
                    sx={{height : 140 , backgroundSize: "contain"}}
                    image={product.pictureUrl}
                    title={product.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.brand}/{product.type}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={()=> handleAddItem(product.id)}>Add To Card</Button>
                    <Button size="small"><Link to={`catalog/${product.id}`} >View</Link></Button>
                </CardActions>
          </Card>
        </>
    );
}