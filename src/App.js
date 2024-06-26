import React from 'react';
import './App.css';
//import NavBar from './component/NavBar';
import Home from './component/Home';
import {Routes,Route} from 'react-router-dom';
import Product from './component/Product';
import Productdetails from './component/Productdetails';
import Cart from './component/cart';
//import Login from './component/Login';
import SignIn from './component/SignIn';
import NavBar2 from './component/NavBar2';
import Register from './component/Register';
import Footer from './component/parts/Footer';
import FormComponent from './component/parts/Contact';
import Checkout from './component/parts/Checkout';


 function App() {
  return (
    <>
    
    <NavBar2></NavBar2>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/products" element={<Product/>}/>
      <Route exact path="/product/:id" element={<Productdetails/>}/>
      <Route exact path="/cart" element={<Cart/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/login" element={<SignIn/>}/>
      <Route exact path="/contact" element={<FormComponent/>}/>
      <Route exact path="/checkout" element={<Checkout/>}/>


     
      
      

      
      
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
