
import { useState, useEffect } from "react";
import agent from "../../api/agent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";


export default function Catalog(){
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading , setLoading] = useState(true) ; 

  useEffect(()=>{
    agent.Catalog.list().
      then(products => setProducts(products))
      .catch(error => console.log(error))
      .finally(()=> setLoading(false)) ; 
  },[]);
    
    if(isLoading)return(<h1>Loading ...</h1>);
    
    return (
        <>
            <ProductList products={products} />
        </>
    );
}