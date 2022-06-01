import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import {useState, useEffect} from "react"; 
import { Route } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import { Product } from "../models/product";
import { Header } from "./Header";

function App() {
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
        <CssBaseline/>
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
        <Container>
          <Route path="/" component={HomePage} exact/>
          <Route path="/catalog" component={Catalog} exact/>
          <Route path="/catalog/:id" component={ProductDetails}/>
          <Route path="/about" component={AboutPage}/>
          <Route path="/contact" component={ContactPage}/>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
