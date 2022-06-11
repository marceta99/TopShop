import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useStoreContext } from "../../app/context/StoreContext";

export default function BasketSummary() {
    const {basket}  = useStoreContext();
    const [deliveryFee, setDeleveryFee] = useState(0);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(()=>{
        let count = 0 ; 
        basket?.items?.forEach(item =>{
            count += (item.price * item.quantity) ; 
        })
        setSubtotal(count) ; 
        if(count < 100)setDeleveryFee(10) ; 
    },[basket])

    

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{subtotal}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{deliveryFee}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{subtotal + deliveryFee}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}