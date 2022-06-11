import { AxiosResponse } from "axios";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue{
    basket: Basket | null ;
    setBasket : (basket : Basket )=> void ; 
    removeItem : (productId : number, quantity : number) => void ; 
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext(){ // custom useContext hook
    const context = useContext(StoreContext) ; 

    if(context == null)throw Error("Error with context") ; 

    return context ; 
}
export function StoreProvider({children} : PropsWithChildren<any>){ // custom context Provider
    const [basket, setBasket] = useState<Basket | null >(null);
    
    function removeItem(productId : number , quantity : number){
        if(!basket)return ; 

        const items = [...basket.items] ; 
        const itemIndex = items.findIndex(item => item.productId == productId) ; 

        if(itemIndex >= 0 ){
            items[itemIndex].quantity -= quantity ; 
            if(items[itemIndex].quantity == 0)items.splice(itemIndex,1) ; 

            setBasket(prevState => {
                return {...prevState!,  items} //this ! will block type safety on this line because there was some typeScript error
            });
        }
    }
    return (
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    );
    
}
