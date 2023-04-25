import React from "react";
import styled from "styled-components";
import Logoimg from "../images/BorrowDream로고.png";
import {FiAlignJustify,FiSmile,FiShoppingCart,FiSearch} from "react-icons/fi";


const Header = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 200px;
  margin: 0 auto;
  position: relative;

  .toggle {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .logo {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.right {
    position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

  .right .login{
    padding-left: 15px;
  }

  .right .cart {
    padding-left: 15px;
  }
`;


const Image = styled.img`
   
    width: 600px;
    height: 500px;
    
`;







const Head = () => {

return (
    <Header>
    <div className="toggle">
     <FiAlignJustify size="30" color="#5ba8ea"/>
  
    </div>
    
    <div className="logo">
        <Image src={Logoimg} />
    </div>
    <div className="right">
        <FiSearch className="login" size="30" color="#5ba8ea"/>
        <FiSmile className="login" size="30" color="#5ba8ea"/>
        <FiShoppingCart className="cart" size="30" color="5ba8ea"/>
    </div>



    </Header>
 

);

}



export default Head;
