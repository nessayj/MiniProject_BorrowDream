import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import BaroApi from "../../api/BaRoApi";
import Modal from "../../utill/Modal";
import MessageModal from "../message/messageModal";
import WriteMessage from "../message/message";


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

      .price-container {
        display: flex;
        flex-direction: column;
        .quantity {
            color:#135CD2;
            font-size: 1rem;
            width: 100%;
            height: 3rem;
        }
        .price{
            color: #135CD2;
            font-size: 1rem;
            width: 100%;
            height: 3rem;
        }
    
      }
      .borrowedStatus{
        display: flex;
        justify-content: space-between;
        .status {
            float: left;
            font-family:'bitbit';
            font-size: 1.2rem;
            color: #B96BC6;
        }
        .borrowBtn {
            background-color: #135CD2;
            color: white;
            border: none;
            transition: all .1s ease-in;
            border-radius: 0.7rem;
            &:hover{background-color:  #a1f7d9; color: #135CD2;}
            font-size: 1rem;
        }

      }
      .board-title{
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: midnightblue;
      }
      .board-contents{
        font-size: 1.6rem;
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


const ViewLentItem = (props) =>{
    const navigate = useNavigate();

    // 쪽지보내기
    const [sendMsg, setSendMsg] = useState(false);

    // 수정, 삭제는 본인만가능
    const isLogin = window.localStorage.getItem("isLogin");
    const getId = window.localStorage.getItem("Id");

    // 상세보기페이지를 위한 url파라미터 받기
    const params = useParams();
    const getNum = params.no;

    // 작성한 제품 불러오기
    const [lentItem, setLentItem] = useState("");
    
     // 모달
     const [modalOpen, setModalOpen] = useState(false);
     const [modalOption, setModalOption] = useState("");
     const [comment, setComment] = useState("");
     const closeModal = () => {
         setModalOpen(false);
     };

     const[isBorrowed, setIsBorrowed] = useState("");

     // 게시글 상세보기
     useEffect(() => {
        const viewMyLentItem = async () => {
            try{
                const viewMyLent = await BaroApi.viewMyLentItem(getNum);
                const {isBorrowed} = viewMyLent.data;
                setLentItem(viewMyLent.data);
                console.log(lentItem);
                setIsBorrowed(isBorrowed);
            } catch (e) {
                console.log(e);
            }
        };
        viewMyLentItem();
     }, [getNum]);

     // 후기 목록으로 이동
     const onClickToList = () => {
        navigate("/myLentItem");
     }


     // 수정페이지이동
     const onClickToEdit = () => {
        setModalOpen(true);
        setModalOption('내빌드수정');
        setComment("수정하시겠습니까?");
     }

     // 게시글 삭제
    const onClickToDelete = () => {
        setModalOpen(true);
        setModalOption('내빌드삭제');
        setComment("삭제하시겠습니까? (삭제 후 복구가 불가합니다)");
    }

    // 게시글 삭제버튼 로그인상태와 아이디가 일치했을 때만 활성화
    const showButtons = () => {
        return isLogin === "TRUE" && lentItem.borrowId === getId;
    }

    return(
        <Wrap>
        <Modal open={modalOpen} close={closeModal} reviewNo={getNum} option={modalOption}>{comment}</Modal>
        <div className="board-wrapper">
            {showButtons() ? (
               <div className="edit-delete-button">
                <button className="delete-button" onClick={onClickToDelete}>삭제</button> 
                <button className="delete-button" onClick={onClickToEdit}>수정</button>
                </div>
            ) : null}
        
        <div className="board-header">
            <div className="board-header-username">아이디 : {lentItem.borrowId}</div>
            <div className="board-header-date">작성일 : {lentItem.myDate}</div>
        </div>
        <div className="board-body">
            <div className="board-image">
                <img src={lentItem.itemUrl}/>
            </div>
            <div className="board-title-content">
                <div className="board-title">{lentItem.myItem}</div>
                <div className="price-container">
                    <div className="quantity">가능한 수량 : {lentItem.itemQuantity}</div>
                    <div className="price">가격 : {lentItem.itemPrice}원/하루</div>
                </div>
                <div className="borrowedStatus">
                    <div className="status">
                        {lentItem.isBorrowed === 0 ? "빌릴 수 있어요😘" : "빌려갔어요😥"}</div>
                    <button className="borrowBtn" onClick={() => setSendMsg(!sendMsg)}>연락해보기</button>
                    {sendMsg && (
                      <MessageModal closeModal={() => setSendMsg(!sendMsg)}>

                        <WriteMessage writerId={lentItem.borrowId}/>
                      </MessageModal>
                    )}
                </div>
               
                <div className="board-contents">{lentItem.itemExplain}</div>
            </div>
        </div>
        <div className="edit-delete-button">
                <button className="delete-button" onClick={onClickToList}>목록가기</button> 
               </div>
        </div>
        </Wrap>
    );
}
export default ViewLentItem;