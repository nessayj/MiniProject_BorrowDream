import React from "react";
import baro from "../../images/회사소개/회사소개.png";
import styled from "styled-components";
import freedeliever from "../../images/회사소개/무료배송.png";



const Wrap = styled.body`
    margin: 0 auto;
    font-family: 'bitbit';
    background-color: #B8E9FF;
 
`;

const Section = styled.div`
    margin: 0 auto; 
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    .aboutBaro {
        width: 100%;
        height: 100vh;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .companylogo-box {
            margin: 50px;
          
           
            
        }
    .text-box {
        margin: 20px;
        width: 100%;
        height: 100vh;
    }

    .freedeliever {
        margin-top: 20px;
    }

    }
 
`;


const Image = styled.img`
        width: 100%;
`;

const Image1 = styled.img`
margin: 20px;
        width: 100%;
`;

const IntroCompany = () => {

    return (
        <>
        <Wrap>
        <Section>
        <div className="aboutBaro">
        <div className="companylogo-box">
            <Image className="logo" src={baro}/>
        </div>
        <div className="text-box">
        <h2>바로드림이란?</h2>
        <p>고객님들의 여행이는 꿈에 더 가까이 다가갈 수 있도록</p>
        <p>여행물품을 편하게 집에서 원하는 기간만큼 받아볼 수 있는</p>
        <p>렌탈 회사입니다.</p>
        </div>
        </div>
        <div className="freedeliever">
            <Image1 className="freedeliever" src={freedeliever}/>
        </div>
        </Section>
        </Wrap>
        </>
     
    );
}

export default IntroCompany;