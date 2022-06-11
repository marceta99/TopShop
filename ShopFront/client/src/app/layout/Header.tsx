import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";

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
    const {basket} = useStoreContext() ; 

    function returnItemsCount(){
        let count = 0 ; 
        basket?.items?.forEach(item => {
            count += item.quantity ; 
        });
        return count; 
    }
    const count = returnItemsCount();   
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
                    <Badge badgeContent={basket?.items?.length}>
                        <NavLink to="/basket"><ShoppingCart /></NavLink>
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