import React, { useState } from "react";
import BaroApi from "../../api/BaRoApi";
import styled from "styled-components";
import Modal from "../../utill/Modal";

const MsgStyle = styled.div`
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .receiver-container {
        font-size: 1.2rem;
        width: 13rem;
        color: #135CD2;
    }

    .title-container {
        color: #7F8EEF;
        padding: 0;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        font-size: 1.2rem;
        width: 24rem;
        > input {
            width: 20rem;
          border: 1px solid black ;
          border-radius: .3rem;
        }
    }

    .contents-container {
        height: 20rem;
        color: #7F8EEF;
        font-size: 1.2rem;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        .contents {
          color: #7F8EEF;
          height: 2rem;
        }
        > textarea {
            width: 23rem;
            height: 18rem;
            border: 1px solid black;
        }
    }

    .modalBtnDiv{
        color: #135CD2;
        cursor: pointer;
        font-size: 1.5rem;
        &:hover{background-color:  #a1f7d9; color: white;}
    }



`;



const WriteMessage = ({writerId}) => {
   const getId = window.localStorage.getItem("Id");

    // 모달
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOption, setModalOption] = useState("");
    const [comment, setComment] = useState("");
    const closeModal = () => {
        setModalOpen(false);
    };

    const [inputs, setInputs] = useState ({
        title: "",
        contents: "",
        
    })

    const {title, contents} = inputs;

    // 정보넣기
    const onChangeMessageData = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    }

    
 

    // 메세지보내기(저장)
    const onClickToMessage = async() => {
        const result = await BaroApi.writeMessage(title, contents, writerId, getId);
        const success = result.data;
        console.log(success);
        if(success) {
            alert("쪽지가 성공적으로 보내졌습니다.");
        } else {
            setModalOpen(true);
            setModalOption('쪽지로그인');
            setComment("문의는 로그인 후 보내실 수 있습니다.")
        }
    }

       // 글자 입력시 엔터마다 줄바꿈 넣어주는 함수
       const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            contents(contents+'\n');
        }
    }


    return(
        <MsgStyle>
        <Modal open={modalOpen} close={closeModal} option={modalOption}>{comment}</Modal>
        <form onSubmit={onClickToMessage}>
        <div className="receiver-container">
          <label htmlFor="receiver">TO. {writerId}</label>
        </div>
        <div className="title-container">
          <label htmlFor="email">제목</label>
          <input
            type="text" 
            id="title" 
            name="title" 
            value={title}
            onChange={onChangeMessageData}
            required
          />
        </div>
        <div className="contents-container">
          <div className="contents">내용</div>
          <textarea
            type="contents"
            id="contents"
            name="contents"
            value={contents}
            onChange={onChangeMessageData}
            onKeyDown={handleKeyPress} 
            required
          />
        </div>
        

        <div className="modalBtnDiv">
          <input
            type="submit"
            value="쪽지보내기"
          />

        </div>
      </form>
  </MsgStyle>
    );
}

export default WriteMessage;