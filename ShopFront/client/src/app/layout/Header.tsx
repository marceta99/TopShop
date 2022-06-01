import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

interface Props{
    darkMode : boolean ; 
    handleThemeChange : ()=> void ; 
}

const midLinks = [
    {title : "catalog", path : "/catalog"},
    {title : "about", path : "/about"},
    {title : "contact", path : "/contact"},
];
const rightLinks = [
    {title : "login" , path : "/login"}, 
    {title : "register", path : "/register"},
]; 


export function Header({darkMode , handleThemeChange} : Props){
    return (
        <AppBar position="static" sx={{mb : 4}}>
            <Toolbar sx={{display : "flex", justifyContent : "space-between" ,alignItems : "center"}}>
                <>
                <Typography variant="h6">
                    <Link to="/">TOP SHOP</Link>
                </Typography>
                </>
                <>
                <Switch checked={darkMode} onChange={handleThemeChange}/>
                <List sx={{display : "flex"}}>
                    {midLinks.map( ({title, path}) => (
                        <ListItem key={path}><NavLink to={path}>{title}</NavLink></ListItem>
                    ))}
                </List>
                </>
                <>
                <IconButton size="large">
                    <Badge badgeContent={4}>
                        <ShoppingCart />
                    </Badge>
                </IconButton>
                <List sx={{display : "flex"}}>
                    {rightLinks.map( ({title, path}) => (
                        <ListItem key={path}><NavLink to={path}>{title}</NavLink></ListItem>
                    ))}
                </List>
                </>
            </Toolbar>
        </AppBar>
    );
}