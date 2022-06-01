import { ListItem, ListItemAvatar, Avatar, ListItemText, Card, Button, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";

interface Props{
    product: Product ; 
    index : number ; 
}

export default function ProductCard({product , index} : Props){
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
                    <Button size="small">Add To Card</Button>
                    <Button size="small"><Link to={`catalog/${product.id}`} >View</Link></Button>
                </CardActions>
          </Card>
        </>
    );
}