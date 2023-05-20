import React from "react";
import { BrowserRouter as Router, Link} from "react-router-dom";

import styled from "styled-components";
import { BsStars } from "react-icons/bs";


import cr from "../../../images/카테고리이미지/캐리어.jpg";
import cm from "../../../images/카테고리이미지/카메라.jpg";
import dv from"../../../images/카테고리이미지/전자기기.jpg";
import ot1 from "../../../images/카테고리이미지/기타1.jpg";
import beg from "../../../images/카테고리이미지/등산가방.jpg";
import ms from "../../../images/카테고리이미지/등산화.jpg";
import mc from "../../../images/카테고리이미지/등산복.jpg";
import mcot from "../../../images/카테고리이미지/등산기타.jpg";
import wg from "../../../images/카테고리이미지/스노쿨.jpg";
import ws from "../../../images/카테고리이미지/오리발.jpg";
import wc from "../../../images/카테고리이미지/수영복.jpg";
import wot from "../../../images/카테고리이미지/물놀이 기타.jpg";
import tt from "../../../images/카테고리이미지/텐트.jpg";
import ti from "../../../images/카테고리이미지/취사.jpg";
import ts from "../../../images/카테고리이미지/침낭.jpg";
import toh from "../../../images/카테고리이미지/캠핑기타.jpg";



const PopularItems = styled.div`
  font-size: 30px;
  font-family: 'TAEBAEKmilkyway';
  font-weight: bolder;

  .imgContainer {
    display: grid;
    grid-template-columns: repeat(4, 3fr); /* 변경된 부분: 가로 2개의 열 */
    gap: 40px;
    justify-content: center;
    align-items: center;
    margin: 140px;
  }

  a {
    text-decoration: none;
  }

  .imgContainer > * {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  span {
    color: #1a5d98;
    margin: 100px;
    display: flex;
    align-items: center;
  }

  .productName {
    color: #1a5d98;
    margin-top: 20px;
    font-size: 23px;
    font-weight: bold;
    text-align: center;
  }

  .img {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 768px) {
  .imgContainer {
    grid-template-columns: repeat(2, 1fr); /* 세로로 2열로 변경 */
  }
}
`;

const Image = styled.img`
  display: flex;
  width: 240px;
  height: 240px;
  border-radius: 25px;
`;

const Ct_pages = () => {
  return (
    <div className="categoryWrapper">
      <PopularItems>
        <span><BsStars size="50" color="pink" />카테고리</span>
        <div className="imgContainer">
          <div className="img">
            <Link to="/Carrier" className="img">
              <Image src={cr} />
            </Link>
            <div className="productName">케리어</div>
          </div>
          <div className="img">
            <Link to="/Camera" className="img">
              <Image src={cm} />
            </Link>
            <div className="productName">카메라</div>
          </div>
          <div className="img">
            <Link to="/Devices" className="img">
              <Image src={dv} />
            </Link>
            <div className="productName">전자기기</div>
          </div>
          <div className="img">
            <Link to="/Travel" className="img">
              <Image src={ot1} />
            </Link>
            <div className="productName">기타 해외여행 용품</div>
          </div>
          <div className="img">
            <Link to="/hiking_bag" className="img">
              <Image src={beg} />
            </Link>
            <div className="productName">등산 가방</div>
          </div>
          <div className="img">
            <Link to="/hiking_boots" className="img">
              <Image src={ms} />
            </Link>
            <div className="productName">등산 신발</div>
          </div>
          <div className="img">
            <Link to="/hiking_clothes" className="img">
              <Image src={mc} />
            </Link>
            <div className="productName">등산복</div>
          </div>
          <div className="img">
            <Link to="/hiking_other" className="img">
              <Image src={mcot} />
            </Link>
            <div className="productName">기타 등산 용품</div>
          </div>
          <div className="img">
            <Link to="/swimsuit" className="img">
              <Image src={wc} />
            </Link>
            <div className="productName">수영복</div>
          </div>
          <div className="img">
            <Link to="/snorkel" className="img">
              <Image src={wg} />
            </Link>
            <div className="productName">스노쿨</div>
          </div>
          <div className="img">
            <Link to="/fillper" className="img">
              <Image src={ws} />
            </Link>
            <div className="productName">오리발</div>
          </div>
          <div className="img">
            <Link to="/water_other" className="img">
              <Image src={wot} />
            </Link>
            <div className="productName">기타 물놀이 용품</div>
          </div>
          <div className="img">
            <Link to="/tent" className="img">
              <Image src={tt} />
            </Link>
            <div className="productName">텐트</div>
          </div>
          <div className="img">
            <Link to="/sleeping_gear" className="img">
              <Image src={ts} />
            </Link>
            <div className="productName">수면 용품</div>
          </div>
          <div className="img">
            <Link to="/cooking_tools" className="img">
              <Image src={ti} />
            </Link>
            <div className="productName">취사 도구</div>
          </div>
          <div className="img">
            <Link to="/camping_other" className="img">
              <Image src={toh} />
            </Link>
            <div className="productName">기타 캠핑 용품</div>
          </div>
        </div>
      </PopularItems>
    </div>
  );
};

export default Ct_pages;
