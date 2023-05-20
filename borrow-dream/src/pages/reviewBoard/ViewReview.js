import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import BaroApi from "../../api/BaRoApi";
import { HiStar } from "react-icons/hi";
import {FaSadTear} from "react-icons/fa";
import Modal from "../../utill/Modal";

const Wrap = styled.div`
@keyframes smoothAppear {
  from {
    opacity: 0;
    transform: translateY(-10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media all and (min-width: 1024px){
  .board-wrapper{
    width: 1000px;
    .board-body{
      height: 400px;
    }
  }
}

@media all and (max-width: 1024px) {
  .board-wrapper{
    width: 700px;
    .board-body{
       height: 360px;
     }
  }
}
@media all and (max-width: 768px) {
  .board-wrapper {
    width: 400px;
    .board-body{
      height: 320px;
    }
  }
}


@media all and (max-width: 768px) {
  .board-wrapper {
    width: 360px;
    .board-body{
      height: 300px;
    }
  }
}

.edit-delete-button{
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 0.7rem;
  
  button{
    width: 7rem;
    background-color: #135CD2;
    color: white;
    border: none;
    transition: all .1s ease-in;
    border-radius: 0.7rem;
    &:hover{background-color:  #a1f7d9; color: #135CD2;}
    font-size: 1.2rem;
  }
  .delete-button{
    margin-left: 0.5rem;
  }
}

.modal{
  .modal-title{
    font-size: 2rem;
    font-weight: bold;
    padding: 2rem 0;
  }
  .modal-button{
    display: flex;
    align-items: center;
    justify-content: space-between;
    button{
      font-size: 1.4rem;
    }
  }
}


.board-wrapper{
  transition: width 1s;
  margin: 0 auto 1.5rem auto;
  opacity: 0;
  border-radius: 10px;
  animation: smoothAppear 1.5s forwards;
  animation-delay: 0.5s;
  font-family: 'bitbit';
  background-color: #fff;
  padding: 4rem;
  
  .board-body{
    display: flex;
    .board-image{
      flex-shrink: 0;
      margin-right: 1rem;
      width: 50%;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .board-title-content{
      word-break: break-all;
      margin-left: 1rem;
      overflow: auto;
      flex-grow: 1;
      &::-webkit-scrollbar {
        display: none;
      }
      .board-title{
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: midnightblue;
      }
      .board-content{
        font-size: 1.2rem;
      }
      .star-container {
      font-size: 1.4rem;
      color: #a1f7d9;
      }
    }
  }
  .board-body{
    display: flex;
  }
  .board-footer{

  }

  .board-header {
    display: flex;
    justify-content: space-between;
    padding: 1.04rem;
    font-size: 1.3rem;
    color: #7F8EEF;
  }
}
`;



const ViewReview = () => {
    // 페이지이동
    const navigate = useNavigate();

    // 수정, 삭제는 본인만가능
    const isLogin = window.localStorage.getItem("isLogin");
    const getId = window.localStorage.getItem("Id");

    
    // 리뷰상세보기를 위한 url파라미터받기
    const params = useParams();
    const getNum = params.no;
   
    // 작성한 리뷰 불러오기
    const [review, setReview] = useState("");

    // 모달
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOption, setModalOption] = useState("");
    const [comment, setComment] = useState("");
    const closeModal = () => {
        setModalOpen(false);
    };

    const[youLike, setYouLike] = useState();
    // 게시글 상세보기
    useEffect(() => {
        const viewReviewLoad = async () => {
            try{
            const viewReview = await BaroApi.viewReview(getNum);
            const { youLike } = viewReview.data;
            setReview(viewReview.data);
            setYouLike(youLike);
            } catch (e) {
                console.log(e);
            }
          
        };
        viewReviewLoad();
    }, [getNum]);
    
    // 후기목록이동
    const onClickToback = () => {
        navigate(-1);
    }

    // 수정페이지 이동
    const onClikckToEditReview = () => {
        setModalOpen(true);
        setModalOption('리뷰수정');
        setComment("수정하시겠습니까?");
    }

    // 게시글 삭제모달
    const onClickToDeleteReview = () => {
        setModalOpen(true);
        setModalOption('리뷰삭제');
        setComment("삭제하시겠습니까? (삭제 후 다시 복구불가합니다)");
    }

      // 별점 출력
      const renderStars = () => {
        switch(youLike) {
          case 1:
            return(
              <span><HiStar size="25" color="#7F8EEF"/></span>
            );
          case 2:
            return(
              <div style={{ display: 'flex'}}><HiStar size="25" color="#7F8EEF"/>
              <HiStar size="25" color="#7F8EEF"/></div>
            )
          case 3:
            return(
              <div style={{ display: 'flex' }}>
              <HiStar size="25" color="#7F8EEF"/>
              <HiStar size="25" color="#7F8EEF"/>
              <HiStar size="25" color="#7F8EEF"/>
              </div>
            )
            case 4:
              return(
                <div style={{ display: 'flex' }}>
              <HiStar size="25" color="#7F8EEF"/>
              <HiStar size="25" color="#7F8EEF"/>
              <HiStar size="25" color="#7F8EEF"/>
              <HiStar size="25" color="#7F8EEF"/>
              </div>
              )
            case 5:
              return(
                <div style={{ display: 'flex' }}>
                  <HiStar size="25" color="#7F8EEF"/>
                  <HiStar size="25" color="#7F8EEF"/>
                  <HiStar size="25" color="#7F8EEF"/>
                  <HiStar size="25" color="#7F8EEF"/>
                  <HiStar size="25" color="#7F8EEF"/>
                </div>
              );
            default: 
                return(
                  <FaSadTear size="25" color="red"/>
                )
        };
      }

    const showButtons = () => {
        return isLogin === "TRUE" && review.rid === getId;
    }

  
    return (
        <>
        <Wrap>
        <Modal open={modalOpen} close={closeModal} reviewNo={getNum} option={modalOption}>{comment}</Modal>
        <div className="board-wrapper">
          {showButtons() ? (
               <div className="edit-delete-button">
                <button className="delete-button" onClick={onClickToDeleteReview}>삭제</button> 
                <button className="delete-button" onClick={onClikckToEditReview}>수정</button>
              </div>
        ) : null}
        
        <div className="board-header">
            <div className="board-header-username">아이디 : {review.rid}</div>
            <div className="board-header-date">작성일 : {review.rdate}</div>
        </div>
        <div className="board-body">
            <div className="board-image">
                <img src={review.rurl}/>
            </div>
            <div className="board-title-content">
                <div className="board-title">{review.rtitle}</div>
                <div className="star-container">
                    {renderStars(review.youLike)}
                    {review.youLike}/5
                    </div>
                <div className="board-contents">{review.rcontents}</div>
            </div>
        </div>
        <div className="edit-delete-button">
                <button className="delete-button" onClick={onClickToback}>후기목록가기</button> 
               </div>
        </div>
        </Wrap>
        </>

    );

}

export default ViewReview;