import React from "react";
import styled from "styled-components";


const Foot = styled.div`
    background-color: #EEEEEE;
    margin-top: 5rem;
    height: 100vh; 
    width: 100%;
    border-top:2px solid #1a5d98;
    color: #1a5d98;
  
  
  p{
    font-family: 'bitbit';
  }  
  
  a {
    font-family: 'bitbit';
  }
  
  li {
    font-family: 'bitbit';
  }


  #bottomMenu{
    height:20px;
    margin-left:60px;
  }
  #bottomMenu ul {
    margin-top:15px;  
  }
  #bottomMenu ul li{
    float:left; 
    padding:5px 20px;
    list-style: none;
 
  }
  #bottomMenu ul li:last-child{
    border:none;  
  }
  #bottomMenu ul li a, #bottomMenu ul li a:visited {  
    font-size:13px;  
    font-weight: bold;
    color:#666;   
  }
  #bottomMenu ul li p {
    font-size:13px;  
    font-weight: bold;
    color:#666; 
  }
  .forth {
    font-size: 14px;
    font-weight: bold;
    color: black;
  }
  #bottomMenu p {
    font-size: 13px;
    font-weight: bold;
    color: black;
  }
`;


  const Footer = () => {
    return(
        <Foot>
            <div id="bottomMenu">
          <ul class="first">
            <li><a href="#!">회사 소개</a></li>
            <li><a href="#!">개인정보처리방침</a></li>
            <li><a href="#!">사이트약관</a></li>
            <li><a href="#!">사이트맵</a></li>
          </ul>
          <br/>
          <ul class="second">
            <li><p>(주)바로드림</p></li>
            <li><p>대표 : 장연주 정연우 최민혁 조승혁</p></li>
            <li><p>주소 : (12345) 서울특별시 강남구 </p></li>
            <li><p>사업자등록번호: 123-45-67890</p></li>
            <li><a href="#!">사업자정보확인</a></li>
        </ul>
        <br/><br />
        <ul class="third">
            <li><p>통신판매업신고번호 : 강남01-1234호</p></li>
            <li><p>사업자등록번호 : 제1234-000001호</p></li>
            <li><p>팩스 : 02-123-4567</p></li>
            <li><a href="#!">이메일 : borrowdream@bd.co.kr</a></li>
        </ul>
        <br/><br />
        <ul class="forth">
            <li>고객센터 : 1511-1234</li>
        </ul>    
        </div>   
        </Foot>

    );
  }

  export default Footer;