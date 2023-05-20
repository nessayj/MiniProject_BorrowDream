import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {HiStar} from "react-icons/hi";
import {FaSadTear} from "react-icons/fa";
import { useState } from "react";


const Wrap = styled.div`

@media all and (min-width: 1024px) {
  .card-wrapper {
    width: 300px;
    height: 400px;

    &:hover {
      width: 310px;
      height: 410px;
      box-shadow: rgba(0, 0, 0, 0.9) 0px 22px 70px 4px;
    }
  }
}

@media all and (max-width: 1024px) {
  .card-wrapper {
    width: 270px;
    height: 540px;

    &:hover {
      width: 280px;
      height: 550px;
      box-shadow: rgba(0, 0, 0, 0.9) 0px 22px 70px 4px;
    }
  }
}

@media all and (max-width: 768px) {
  .card-wrapper {
    width: 240px;
    height: 480px;

    &:hover {
      width: 250px;
      height: 490px;
      box-shadow: rgba(0, 0, 0, 0.9) 0px 22px 70px 4px;
    }
  }
}

.card-wrapper {
  flex-shrink: 0;
  margin: 15px;
  font-family: 'Noto Sans KR', sans-serif;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 1s, height 1s, box-shadow 1s;
  cursor: pointer;

  .card-body-img {
    width: 100%;
    height: 60%;

    img {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card-body-text {
    font-family:'bitbit';
    flex-grow: 1;
    word-break: break-all;
    overflow: auto;
    padding: 0.6rem;

    &::-webkit-scrollbar {
      display: none;
    }

    .card-body-text-title {
      font-family:'bitbit';
      font-size: 1.7rem;
      color: #1a5d98;
      font-weight: bold;
    }

    .card-body-text-rate {
      font-size: 1.4rem;
      color: #a1f7d9;

    }
  }

  .card-footer {
    font-family:'bitbit';
    border-top: 0.5px solid black;
    padding: 0.6rem;
    font-weight: 200;
    display: flex;
    color: #1a5d98;
    font-size: 1.1rem;
    justify-content: space-between;
  }
}


`;




export const Card = ({boardId, title, rate, content, img_url, username, date}) => {
  const navigate = useNavigate();
  // 별점 출력
    const renderStars = () => {
      switch(rate) {
        case 1:
          return(
            <span><HiStar size="25" color="#7F8EEF"/></span>
          );
        case 2:
          return(
            <span><HiStar size="25" color="#7F8EEF"/>
            <HiStar size="25" color="#7F8EEF"/></span>
          )
        case 3:
          return(
            <span>
            <HiStar size="25" color="#7F8EEF"/>
            <HiStar size="25" color="#7F8EEF"/>
            <HiStar size="25" color="#7F8EEF"/>
            </span>
          )
          case 4:
            return(
              <span>
            <HiStar size="25" color="#7F8EEF"/>
            <HiStar size="25" color="#7F8EEF"/>
            <HiStar size="25" color="#7F8EEF"/>
            <HiStar size="25" color="#7F8EEF"/>
            </span>
            )
          case 5:
            return(
              <span>
                <HiStar size="25" color="#7F8EEF"/>
                <HiStar size="25" color="#7F8EEF"/>
                <HiStar size="25" color="#7F8EEF"/>
                <HiStar size="25" color="#7F8EEF"/>
                <HiStar size="25" color="#7F8EEF"/>
              </span>
            );
          default: 
              return(
                <FaSadTear size="25" color="red"/>
              )
      };
    }
    return (
    <Wrap>
      <div className="card-wrapper" onClick={() => {
            navigate(`/review-list/review/${boardId}`)
    }}>
        <div className="card-body-img">
          <img src={img_url}/>
        </div>
        <div className="card-body-text">
          <div className="card-body-text-title">{title}</div>
          <div className="card-body-text-rate">
            {renderStars(rate)}
            {rate}/5</div>
          <div className="card-body-text-content">{content}</div>
        </div>
  
        <div className="card-footer">
          <div className="username">{username}</div>
          <div className="date">{date}</div>
        </div>
      </div>
      </Wrap>
    );
  };
  