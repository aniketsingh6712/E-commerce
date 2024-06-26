import React from 'react'
import {  useNavigate } from 'react-router-dom';

import '../css/Contact.css';

const FormComponent =  () => {
    const nav=useNavigate();
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", "d37561d7-ed11-4ec5-9f4f-3a853d630c0d");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
    
        if (res.success) {
          console.log("Success", res);
        }
        nav('/');
      };
    
      return (
       <div className='main' >

          <div class="form-container">
            <h1>Contact Us</h1>
            <br/>
        <form onSubmit={onSubmit} method="POST">
            
            <input type="text" id="name" name="name" placeholder='&#xf007;  Name' required/>

            
            <input type="email" id="email" name="email" placeholder='&#xf0e0; Email' required/>

            
            <textarea id="message" name="message" rows="4" placeholder='&#xf27a;  Message' required></textarea>

            <button type="submit">Send Us <i class="fa fa-solid fa-arrow-right"></i></button>
        </form>
    </div>
    
  <div className='img' style={{width:'40%',margin:'50px '}}>
    <img src='/assets/5124556.jpg' height='auto' width='80%' style={{borderRadius:'8px'}}></img>
  </div>
    
    </div>
        
     );
};

export default FormComponent;

