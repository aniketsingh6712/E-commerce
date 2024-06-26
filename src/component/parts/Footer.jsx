import React from 'react'
import '../css/Footer.css';
export default function Footer() {
  return (
    <div><footer>
    <div class="footerContainer">
        <div class="socialIcons">
            <a href="" style={{width:'40px',textAlign:'center'}}><i class="fa fa-brands fa-facebook"></i></a>
            <a href=""><i class="fa fa-brands fa-instagram"></i></a>
            <a href=""><i class="fa fa-brands fa-twitter"></i></a>
            <a href=""><i class="fa fa-brands fa-google-plus"></i></a>
            <a href=""><i class="fa fa-brands fa-youtube"></i></a>
        </div>
        <div class="footerNav">
            <ul><li><a href="">Home</a></li>
                <li><a href="">News</a></li>
                <li><a href="">About</a></li>
                <li><a href="">Contact Us</a></li>
                <li><a href="">our Team</a></li>
            </ul>
        </div>
        
    </div>
    <div class="footerBottom">
        <p>Copyright &copy;2024; Designed by <span class="designer">Team Sigma</span></p>
    </div>
</footer></div>
  )
}
