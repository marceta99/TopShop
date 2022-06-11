import axios , {AxiosError, AxiosResponse} from "axios";
import { toast } from "react-toastify";


axios.defaults.baseURL = " https://localhost:5001/api/" ; 
axios.defaults.withCredentials = true ; //this will allow our browser to store cookie that we recive from server

const responseBody = (response: AxiosResponse) => response.data ; 

axios.interceptors.response.use(response => {
    //slučaj kada se vratio dobar reponse od servera
    return response ; 
}, (error : AxiosError)  => {
    //slučaj kada se vratio error response od servera, npr 404, 401 itd
    const {data , status} = error.response! ;//sa ovim znakom "!" sam iskljucio type safety na toj liniji koda 
    switch(status){
        case 400:
            toast.error("400 error") ; 
            break ;
        case 404:
            toast.error("404 error") ; 
            break ;    
        case 500:
            toast.error("500 error") ; 
            break ;
        default :
            break ;    
    }
    
    return Promise.reject(error.response) ; 
});

const request = {
    get:  (url : string) => axios.get(url).then(responseBody) ,  
    post:  (url : string , body : {}) => axios.post(url, body)
    .then(responseBody=>{
        console.log(responseBody);
        if (!document.cookie.split('; ').find(row => row.startsWith('buyerId'))) {
            document.cookie = `buyerId=${responseBody.data.buyerId}; SameSite=None; Secure`;
        }
        
        return responseBody ; 
    }) ,  
    put:  (url : string , body : {}) => axios.put(url , body).then(responseBody) ,  
    delete:  (url : string) => axios.delete(url).then(responseBody)
}
 const Catalog  = {
     list:()=> request.get("products") ,
     details:(id : number)=> request.get(`products/${id}`)
 }
 const TestErrors = {
     get400Error: ()=> request.get("Error/bad-request"),  
     get401Error: ()=> request.get("Error/unauthorized"),  
     get404Error: ()=> request.get("Error/not-found"),  
     get500Error: ()=> request.get("Error/server-error"),  
     getValidationError : ()=> request.get("Error/validation-error"),  
 }

 const Basket = {
     get : ()=> request.get("basket"),
     addItem : (productId : number, quantity = 1) => 
            request.post(`basket?productId=${productId}&quantity=${quantity}`,{}) ,
     removeItem : (productId : number, quantity = 1) => 
                    request.delete(`basket?productId=${productId}&quantity=${quantity}`)
 }
const agent = {
    Catalog : Catalog , 
    TestErrors : TestErrors, 
    Basket : Basket
}
export default agent; 
