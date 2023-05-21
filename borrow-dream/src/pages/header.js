import React from "react";
import styled from "styled-components";
import log from ".././images/로고/새로운로고(배경제거).png";
import {FiMenu, FiSmile,FiShoppingCart,FiSearch} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import {TbPlaneDeparture} from "react-icons/tb"
import {GiMountains} from "react-icons/gi"
import {TbBeach} from "react-icons/tb"
import {FaCampground} from "react-icons/fa"
import {BiFoodMenu} from "react-icons/bi"
import {RiSpaceShipLine} from "react-icons/ri"



const Header = styled.div`

  width: 100%;
  height: 200px;
  margin: 0 auto;
  position: relative;
  font-family: 'bitbit';
  z-index: 10px;

//네비바 스타일

input[id="menuicon"] {display:none;}


input[id="menuicon"] + label {display:block;
  position:fixed;
  cursor:pointer;
  
}
input[id="menuicon"] + label span {
  display:block;
  position:absolute;
  width:100%;
  background:#5ba8ea;

}

input[id="menuicon"] + label span:nth-child(1) {top:0;}
input[id="menuicon"] + label span:nth-child(2) {top:50%;transform:translateY(-50%);} /* 비슷하게 사용할 수 있는 style top:calc(50% - 2.5px); margin-top:-2.5px;*/
input[id="menuicon"] + label span:nth-child(3) {bottom:0;}
input[id="menuicon"]:checked + label span:nth-child(1) {top:50%;transform:translateY(-50%) rotate(45deg);}
input[id="menuicon"]:checked + label span:nth-child(2) {opacity:0;}
input[id="menuicon"]:checked + label span:nth-child(3) {bottom:50%;transform:translateY(50%) rotate(-45deg);}

input[id="menuicon"]:checked + label{
  z-index: 11;
  left: 14rem;

  
}


/*사이드바*/
div[class="sidebar"] {
width: 20rem;
height: 100rem;
background-color: #7FC2EF;
text-align: center;
position:fixed;
left:-500px;
transition:all .35s;
}

input[id="menuicon"]:checked + label + div {
left:-50px;
}

ul{
margin-left: 0;
font-weight: 400;
list-style:none;
font-size: 35px;
color: white;

}
.logo2{
  display: flex;
  text-decoration: underline;
  color: white;
  font-size: 35px;

}

h4 {
margin: 20px;
}
.abroad{
  margin-top: 2rem;
}

a{
margin-left: 0;
margin-bottom: 1rem;
text-decoration: none;
color: #135CD2;
font-size: 20px;
font-weight: 400;
text-decoration: none;
}



li:hover {
background-color: white;
color: #71EBF2;
}

  .toggle {
    position: absolute;
    left:50px;
    top: 45%;
    transform: translateY(-50%);
    z-index: 10;
  }

  .logo {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.right {
  width: 10rem;
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  right: 70px;
  top: 50%;
  transform: translateY(-50%);
  @media ( max-width: 768px ) {
      display: none;
}
  
}

`;


const Image = styled.img`
   
    width: 100%;
    height: 100%;
    @media ( max-width: 768px ) {
      width: 100%;
      height: 100%;
}
    
`;







const Head = () => {
  const navigate = useNavigate();
  // 스마일아이콘 로그인 시 마이페이지로 이동
  const isLogin = window.localStorage.getItem("isLogin");


  // 로그인 전 스마일누르면 로그인페이지
  const onClickToLogin = () =>{
    navigate("/Login");
  }

  // 로그인 확인
  const IsLogin = () =>{
    return isLogin === "TRUE"
  }

  // 로그인 후 스마일누르면 마이페이지
  const onClickToMypage = () => {
    navigate("/MyPage");
  }

return (
    <Header>
       <div className="toggle">
       {/* 왼쪽 네비바 */}
       
       <input type="checkbox" id="menuicon" />

       <label for="menuicon" calss="menubtn">
      <FiMenu size="30" color="#5ba8ea" />
       </label>

    <div className="sidebar">
      <ul className="navi">
      

      <div className="myLent">
       <a href="/myLentItem"><h4 className="logo2"><RiSpaceShipLine size="30"/>내가 빌려 DREAM</h4></a> 

      </div>
      
      <div className="abraod">
     <h4 className="logo2"><TbPlaneDeparture size="30"/>해외여행</h4>
      <li><a href="/Carrier">캐리어</a></li>
      <li><a href="">카메라</a></li>
      <li><a href="">전자기기</a></li>
      <li><a href="">기타 해외여행 용품</a></li>
      </div>

      <div className="hiking">
      <h4 className="logo2"><GiMountains size="30"/>산(트래킹)</h4>
      <li><a href="">등산 가방</a></li>
      <li><a href="">등산 신발</a></li>
      <li><a href="">등산 옷</a></li>
      <li><a href="">기타 등산 용품</a></li>
      </div>
      
      <div className="swim">
      <h4 className="logo2"><TbBeach size="30"/>물놀이</h4>
      <li><a href="">수영복</a></li>
      <li><a href="">스노쿨</a></li>
      <li><a href="">오리발</a></li>
      <li><a href="">기타 물놀이 용품</a></li>
      </div>
     
     <div className="camp">
      <h4 className="logo2"><FaCampground size="30"/>캠핑</h4>
      <li><a href="">텐트</a></li>
      <li><a href="">수면 용품</a></li>
      <li><a href="">취사 도구</a></li>
      <li><a href="">기타 캠핌 용품</a></li>
      </div>

    

      <div className="board">
      
        <h4 className="logo2"><BiFoodMenu size="30"/>게시판</h4>
        <h3><a href="/service">BORROWDREAM</a></h3>
        <li><a href="/review-list">후기</a></li>
        <li><a href="/qna-list">Qna</a></li>
        <li><a href="/board-list">문의하기</a></li>
        
      </div>
      
      </ul>


    </div>
    </div>
    
      
    <div className="logo">
    <Link to="/">
        <Image height="100px" src={log} />
    </Link>
    </div>



    <div className="right">
      
        <FiSearch className="login" size="30" color="#5ba8ea"/>
        {IsLogin() ?
        <FiSmile className="login" size="30" color="#5ba8ea" onClick={onClickToMypage}/> :
        <FiSmile className="login" size="30" color="#5ba8ea" onClick={onClickToLogin}/> }
        <Link to='/cart'><FiShoppingCart className="cart" size="30" color="5ba8ea"/></Link>
    </div>
    



    </Header>
 

  );

};



export default Head;
