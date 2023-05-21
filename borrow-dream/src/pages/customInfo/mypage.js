import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { RiTruckLine } from 'react-icons/ri';
import { RiUserSettingsLine } from 'react-icons/ri';
import { RiMagicLine } from 'react-icons/ri';
import { RiGift2Line } from 'react-icons/ri'; 
import Edit from '../../images/로그인이미지/setting.png';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "../../utill/Modal";


const Wrapper = styled.div`
    display: flex;
    /* flex-wrap: nowrap; */
`;

const MainContainer = styled.div`
    min-height: 1200px; // 
    background-color: #f6f6f6;
    width: 100%;
    height: 150px;// 중간 컨텐츠 전체 높이(회색부분)
    padding-bottom: 60px;
    
    .profileEdit {
        color: #404040;
        padding: 15px 0 15px 30px;
        position: relative;
        font-size: 20px;
        font-weight: 400;
        border-bottom: 1px solid #dbdbdb;
        margin-bottom: 5px;
    }
    .custominfo {
        display: block;
    }
    .deliveryinfo {
        display: inline-block;
    }
`;

const MypageTitle = styled.div`
    padding-top: 20px;
    margin-left: 3px;
    font-size: 2.3em;
    text-align: center;
    font-weight: 400px;
    font-family: 'bitbit';
`;

const Titlebox = styled.div`
    width: 100%;
    background: linear-gradient( to bottom, #f2dfe4, #e3daf5);
    min-height: 250px;
    position: relative;
    
    .topinfo {
        font-size: 25px;
        padding: 30px 0;
        text-align: center;
        padding-left: 5px;
    }
    .topinfo > h2 {
        color: violet;
        font-family: 'bitbit';
    }
    .profile {
        position: relative;
        display: block;
        top: 48%;
        left: 55%;
        transform: translate(-50%, -50%);
        width: 70%;
    }
    
    .setting {
        width: 85px;
        height: 29px;
        background-color: white;
        display: flex;
        align-items: center;
        font-size: 15px;
        margin-right: 10px;
        padding : .5em;
        text-align : center;
        border-radius: 5px;
        text-decoration: none;
        box-shadow: 0 6px 20px 0 rgba(150, 150, 160, 0.45);
        border: 1px solid #dbdbdb;
    }
    .linkarea {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        font-family: 'bitbit';
    }
   
`;
    const Mymenu = styled.div`
        text-align: left;
        position: ralative;
        width: auto;
        margin-top: 20px;
        border: 0;
        border-radius: 5px;
        padding-bottom: 20px;
    `;

    const Container = styled.dl`
        display: inline-block;
        border: 1px solid #333;
        min-height: 200px;
        vertical-align: top;
        width: calc(30% - 16px);
        margin: 10px 100px;
        padding: 40px;
        justify-content: space-between; 
        background-color: #f2f2f2;
        border: 1px solid #e9e9e9;
        
    `;

const Title = styled.dt`
    color: #404040;
    padding: 2px 0px 13px 18px;
    position: relative;
    font-size: 20px;
    font-weight: 400;
    border-bottom: 1px solid #dbdbdb;
    margin-bottom: 5px;
    outline: none;
    `;

const MypageItem = styled.dd`
    display: flex;
    padding: 13px 0px 10px 3px;
    position: relative;
    outline: none;
    a {
        text-decoration: none;
    }
`;


const EditImg = styled.img`
    box-sizing: border-box;
    width: 16px;
    height: 16px; 
    margin-left: 4px;
    margin-top: 1px;   
`;



const Mypage = () => {

const navigate = useNavigate()
const isLogin = window.localStorage.getItem("isLogin"); // 로그인 들어오면 마이페이지 접속
const id = window.localStorage.getItem("Id");

    // 모달
    const [comment, setComment] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOption, setModalOption] = useState("");
    const closeModal = () => {
        setModalOpen(false);
    };

console.log(isLogin);
if(isLogin !== "TRUE") navigate("/MainBody");




 // 로그아웃모달
const onClickLogout = () =>{
    setModalOpen(true);
    setModalOption("로그아웃")
    setComment("로그아웃하시겠습니까?")
}


    return(
        <div className="mypage">
        <Modal open={modalOpen} close={closeModal} option={modalOption}>{comment}</Modal>
        <Wrapper>
        <MainContainer>
            <Titlebox>
                <MypageTitle><h1>마이페이지</h1></MypageTitle>
                    <div className="topinfo">
                        <h2>{id}님 환영합니다</h2>
                        <br /><br />

                        <div className="linkarea">
                        <Link to="/MypageInfo" className="setting">정보조회<EditImg src={Edit} /></Link>
                        <button className="setting" onClick={onClickLogout}>로그아웃<EditImg src={Edit} /></button>
                        </div>
                    </div>
            </Titlebox>   
                <Mymenu>
                <Container>
                    <div class="item">
                        <Title><RiTruckLine size="17" /> 주문관리</Title>
                        <MypageItem><a href="!#">장바구니</a></MypageItem>
                        <MypageItem><a href="!#">빌린내역</a></MypageItem>
                    </div>
                </Container> 
                <Container>
                    <div class="item">
                        <Title><RiUserSettingsLine size="17" /> 정보관리</Title>
                        <Link to = "/MypageEdit"><MypageItem>회원정보수정</MypageItem></Link>
                        <Link to = "/CustomDelete"><MypageItem>회원탈퇴</MypageItem></Link>
                    </div>
                </Container> 
                <Container>
                    <div class="item">
                        <Title><RiGift2Line size="17" /> 내빌드</Title>
                        <MypageItem><a href="!#">빌려준내역</a></MypageItem>
                        <MypageItem><a href="!#">반납 상태</a></MypageItem>
                    </div>
                </Container> 
                <Container>
                    <div class="item">
                        <Title><RiMagicLine size="17" /> 활동관리</Title>
                        <MypageItem><a href="!#">1:1    문의</a></MypageItem>
                        <MypageItem><a href="!#">후기내역</a></MypageItem>
                        </div>
                </Container> 
                </Mymenu>
        </MainContainer>
        </Wrapper>
        </div>
    );
}
export default Mypage;