import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BaroApi from "../../api/BaRoApi";
import { Card } from "./MyListCard";
import {SiStarship} from "react-icons/si";
import {GiFallingStar} from "react-icons/gi";

const Wrap = styled.div`
    width: 100%;
    height: 100vh;
    background-color: white;
    margin: 0 auto;
    border-radius: 10px;
    font-family:'bitbit';

    .title {
      margin-left: 100px;
      margin-bottom: 50px;
      display: flex;
      align-items: center;
      font-size: 30px;
      font-weight: 600;
      color: #1a5d98;
      h2 {margin-left: 10px; font-size: 35px; margin-top: 35px; font-weight: 500; color: #135CD2; }

    }   
    .writebtn {
        margin-left: 70rem;
        width: 7rem;
        background-color: #135CD2;
        color: white;
        border: none;
        transition: all .1s ease-in;
        border-radius: 0.7rem;
        &:hover{background-color:  #a1f7d9; color: #135CD2;}
        font-size: 1.2rem;
      }
      p {
        margin-top: 0;
        margin-left: 10rem;
        font-size: 1.2rem;
        color: #7F8EEF;

      }


.boardList-wrapper{  
  display: flex;
  flex-direction: column;
  align-items: center;
  .boardList-header{
    color: midnightblue;
    font-weight: bold;
    font-size: 2rem;
  }
  .boardList-body{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  .boardList-footer{
    margin: 1.5rem;
  }

}
`;



const MyLentItemList = () => {
     // 페이지이동을 위한 네비게이트
     const navigate = useNavigate();   
    // Review 목록
    const [myLendList, setMyLendList] = useState([]);

    // 후기(reviewList) 불러오기
    useEffect(() => {
        const myLendData = async () => {
            try {
                const myLendListData = await BaroApi.myLendList();
                setMyLendList(myLendListData.data);
            }catch(e) {
                console.log(e);
            }
        };
        myLendData();
    }, []);

    // 리뷰작성이동
    const onClickToWriteReview = () => {
      navigate("/myLentItem/write");
    }

    return (
        <Wrap>
          <div className="title">
          <SiStarship size="50" color="7F8EEF" />
          <h2>내가 빌려 DREAM</h2>
          </div>
          <p><GiFallingStar size="20" color="#FD9F28"/>가격은 하루 기준입니다</p>
          <div className="button-container">
          <button className="writebtn" onClick={onClickToWriteReview}>팔아보자</button> 
          </div>
          <div className="boardList-wrapper">
          <div className="boardList-body">
            {myLendList.map((item) => {
              return(
                <Card key={item.myNo}
                      boardId={item.myNo}
                      username={item.borrowId} 
                      date={item.myDate}
                      title={item.myItem} 
                      price={item.itemPrice} 
                      borrowStatus={item.isBorrowed}
                      img_url={item.itemUrl}

          />)})}
      </div>
      </div>

        </Wrap>



    );

}

export default MyLentItemList;