import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RiSuitcase2Fill } from "react-icons/ri";
import { FaMountain } from "react-icons/fa";
import { MdPool } from "react-icons/md";
import { GiCampingTent } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import M_img from "./M_img";
import MainModal from "./mainModal/MainModal";
import MainModal2 from "./mainModal/MainModal2";
import { animateScroll as scroll } from "react-scroll";

const Text = styled.p`
  font-family: 'TAEBAEKmilkyway';
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  color: #1a5d98;
  text-decoration-line: none;
`;

const Category = styled.div`
  margin: 30px auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .abroad {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const SmallBanner = styled.div`
  font-family: 'TAEBAEKmilkyway';
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .naebild {
    width: 50%;
    height: 300px;
    background-color: #8abeeb;
    margin: 20px ;
  }
  .company {
    width: 50%;
    height: 300px;
    background-color: #8abeeb;
    margin: 20px;
  }
`;

const PopularItems = styled.div`
  font-family: 'TAEBAEKmilkyway';
  font-size: 30px;
  font-weight: bolder;

  .imgContainer {
    display: grid;
    grid-template-columns: repeat(4, 250px);
    grid-template-rows: repeat(4, 250px);
    grid-row-gap: 50px;
    grid-column-gap: 50px;
    justify-content: center;
    align-items: center;    
  }
  .imgContainer > * {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .img {
    width: 250px;
    height: 250px; 
    background-color: #a1f7d9;
  }
  span {
    color: #1a5d98;
    margin: 20px;
    display: flex;
    align-items: center;
  }
`;

const MainBody = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [modalVisible2, setModalVisible2] = useState(true);

  const closeModal = () => {
    setModalVisible(false);
  }

  const closeModal2 = () => {
    setModalVisible2(false);
  }

  const scrollToSection = () => {
    scroll.scrollTo(150); // 원하는 위치로 스크롤 이동 (여기서는 800px 위치)
  }
  const scrollToSection2 = () => {
    scroll.scrollTo(900); // 원하는 위치로 스크롤 이동 (여기서는 800px 위치)
  }
  const scrollToSection3 = () => {
    scroll.scrollTo(1500); // 원하는 위치로 스크롤 이동 (여기서는 800px 위치)
  }
  const scrollToSection4 = () => {
    scroll.scrollTo(2200); // 원하는 위치로 스크롤 이동 (여기서는 800px 위치)
  }

  return (
    <>
      <M_img />
      {modalVisible && (
        <MainModal visible={modalVisible} closable={true} maskClosable={true} onClose={closeModal}></MainModal>            
      )}
      {modalVisible2 && (
        <MainModal2 visible={modalVisible2} closable={true} maskClosable={true} onClose={closeModal2} />
      )}

      <Category>
        <div className="abroad">
          <Link to="/Ct_pages" onClick={scrollToSection}>
            <RiSuitcase2Fill size="100" color="#1a5d98" />
          </Link>
          <Text>해외여행</Text>
        </div>

        <div className="mountain">
          <Link to="/Ct_pages" onClick={scrollToSection2}>
            <FaMountain size="100" color="#1a5d98" />
          </Link>
          <Text>산(트래킹)</Text>
        </div>

        <div className="swimming">
          <Link to="/Ct_pages"onClick={scrollToSection3}>
            <MdPool size="100" color="#1a5d98" />
          </Link>
          <Text>물놀이</Text>
        </div>

        <div className="camping">
          <Link to="/Ct_pages"onClick={scrollToSection4}>
            <GiCampingTent size="100" color="#1a5d98" />
          </Link>
          <Text>캠핑</Text>
        </div>

        <div className="my">
          <Link to="/Borrow_Dream">
            <GiCampingTent size="100" color="#1a5d98" />
          </Link>
          <Text>Borrow Dream</Text>
        </div>
      </Category>

      <SmallBanner>
        <div className="company">
          <Text>여기는 회사 배너</Text>
        </div>
        <div className="naebild">
          <Text>여기는 내빌드</Text>
        </div>
      </SmallBanner>

      <PopularItems>
        <span><BsStars size="50" color="pink"/>일주일 인기품목</span>
        <div className="imgContainer">
          <div className="img">사진1</div>
          <div className="img">사진2</div>
          <div className="img">사진3</div>
          <div className="img">사진4</div>
          <div className="img">사진5</div>
          <div className="img">사진6</div>
          <div className="img">사진7</div>
          <div className="img">사진8</div>
          <div className="img">사진9</div>
          <div className="img">사진10</div>
          <div className="img">사진11</div>
          <div className="img">사진12</div>
          <div className="img">사진13</div>
          <div className="img">사진14</div>
          <div className="img">사진15</div>
          <div className="img">사진16</div>
        </div>
      </PopularItems>
    </>
  );
}

export default MainBody;
