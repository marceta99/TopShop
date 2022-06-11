import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import {useState, useEffect} from "react"; 
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import "react-toastify/dist/ReactToastify.css"; 
import { Header } from "./Header";
import BasketPage from "../../features/basket/BasketPage";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../../api/agent";
import CheckoutPage from "../../features/checkout/CheckoutPage";

function App() {

  const {setBasket} = useStoreContext() ; 

  useEffect(()=>{
    const buyerId = getCookie("buyerId");  //get value from cookie with that buyerId key

    if(buyerId){
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
    }
  }, [setBasket]);

  const [darkMode, setDarkMode] = useState(false) ; 
  const mode = darkMode ? "dark" : "light" ; 
 
  const theme = createTheme({
    palette : {
      mode : mode
    }
  })
  function handleThemeChange(){
    setDarkMode(previousMode => !previousMode) ; 
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-right" hideProgressBar/>
        <CssBaseline/>
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
        <Container>
          <Route path="/" component={HomePage} exact/>
          <Route path="/catalog" component={Catalog} exact/>
          <Route path="/catalog/:id" component={ProductDetails}/>
          <Route path="/about" component={AboutPage}/>
          <Route path="/contact" component={ContactPage}/>
          <Route path="/basket" component={BasketPage}/>
          <Route path="/checkout" component={CheckoutPage}/>

        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
