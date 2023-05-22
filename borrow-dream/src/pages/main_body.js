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
import Card2 from "./Sub.Category/data/Card2";
import B1 from "../images/배너/Borrow Dream 05220701 전 품목10.png";
import B2 from "../images/배너/Borrow Dream 05220701 전 품목10 (1).png";
import { SiStarship } from "react-icons/si";


const Text = styled.p`
   font-family: 'bitbit';
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  color: white;
  text-decoration-line: none;
`;
const Image = styled.img`
    width: 50%;
    height: 300px;
    width: 650px;
  
    border-radius: 20px;
`;

const Category = styled.div`
  margin: 30px auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .abroad {
    width: 10rem;
    height: 10rem;
    border-radius: 100px;
    background-color: #7F8EEF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .mountain {
    width: 10rem;
    height: 10rem;
    border-radius: 100px;
    background-color: #7F8EEF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .swimming {
    width: 10rem;
    height: 10rem;
    border-radius: 100px;
    background-color: #7F8EEF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .camping {
    width: 10rem;
    height: 10rem;
    border-radius: 100px;
    background-color: #7F8EEF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .my{
    width: 10rem;
    height: 10rem;
    border-radius: 100px;
    background-color: #7F8EEF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const SmallBanner = styled.div`
font-family: 'bitbit';
  margin: 30px auto;
  margin-left: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  .Bimg{
    height: 300px;
    margin-left: 34px;
  }
  

  .naebild {
    width: 50%;
    height: 300px;
    background-color: white;
    margin: 20px ;

    border-radius: 20px;
    
  }

`;

const PopularItems = styled.div`
font-family: 'bitbit';
  font-size: 30px;
  font-weight: bolder;
  color: #135CD2;

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
    color: #135CD2;
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
    scroll.scrollTo(150); 
  }
  const scrollToSection2 = () => {
    scroll.scrollTo(900); 
  }
  const scrollToSection3 = () => {
    scroll.scrollTo(1500); 
  }
  const scrollToSection4 = () => {
    scroll.scrollTo(2200); 
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
            <RiSuitcase2Fill size="100" color="white" />
          </Link>
          <Text>해외여행</Text>
        </div>

        <div className="mountain">
          <Link to="/Ct_pages" onClick={scrollToSection2}>
            <FaMountain size="100" color="white" />
          </Link>
          <Text>산(트래킹)</Text>
        </div>

        <div className="swimming">
          <Link to="/Ct_pages"onClick={scrollToSection3}>
            <MdPool size="100" color="white" />
          </Link>
          <Text>물놀이</Text>
        </div>

        <div className="camping">
          <Link to="/Ct_pages"onClick={scrollToSection4}>
            <GiCampingTent size="100" color="white" />
          </Link>
          <Text>캠핑</Text>
        </div>

        <div className="my">
          <Link to="/Borrow_Dream">
            <SiStarship size="100" color="white" />
          </Link>
          <Text>Borrow <br /> Dream</Text>
        </div>
      </Category>

      <SmallBanner>
        <div className="company">
        <Image src={B1} />
        </div>
        <div className="naebild">
        <Image className="Bimg" src={B2} />
        </div>
      </SmallBanner>

      <PopularItems>
        <span><BsStars size="50" color="#7F8EEF"/>인기품목</span>
        <Card2 categoryNo={5000} />
      </PopularItems>
    </>
  );
}

export default MainBody;