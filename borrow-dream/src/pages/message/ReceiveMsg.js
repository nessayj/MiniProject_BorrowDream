// 받은메세지 보기
import React, { useEffect, useState } from "react";
import MessageModal from "./messageModal";
import WriteMessage from "./message";
import styled from "styled-components";
import BaroApi from "../../api/BaRoApi";

const MsgStyle = styled.div`
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .receiver-container2 {
        font-size: 1.2rem;
        width: 13rem;
        color: #135CD2;
    }

    .title-container2 {
        padding: 0;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        font-size: 1.2rem;
        width: 24rem;
        .title-title {
            color: #7F8EEF;
            width: 20rem;
        }
        .title2 {
            color: black;
        }
    }

    .contents-container2 {
        color: #7F8EEF;
        font-size: 1.2rem;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        .contents-contents {
            width: 23rem;
        }
        .contents2{
            width: 23rem;
            height: 15rem;
            border: 1px solid black;
            color: black;
        }
    }

    .modalBtnDiv{
        color: #135CD2;
        cursor: pointer;
        font-size: 1.5rem;
        &:hover{background-color:  #a1f7d9; color: white;}
    }
    .reply {
        color: #135CD2;
        cursor: pointer;
        font-size: 1.5rem;
        border-radius: .5rem;
        &:hover{color: #a1f7d9;}
    }



`;

const ReceiveMsg = ({getNum}) => {
   

    const [receiveMsg, setReceiveMsg] = useState("");

    // 내용로드
    useEffect(() => {
        const ReceiveMsgLoad = async () =>{
            try {
                console.log(getNum);
                const viewReview = await BaroApi.viewReceiveMsg(getNum);
                setReceiveMsg(viewReview.data);
                console.log(viewReview.data);
            } catch(e) {
                console.log(e);
            }

        };
        ReceiveMsgLoad();

    },[getNum]);

    // 답장을 위한
    const [sendMsg, setSendMsg] = useState(false);



    return(
        <MsgStyle>
        <div className="receiver-container2">
          <div className="receiver">{receiveMsg.sender}</div>
        </div>
        <div className="receiver-container2">
          <div className="receiver">{receiveMsg.msgDate}</div>
        </div>
        <div className="title-container2">
          <div className="title-title">제목</div>
          <div className="title2">{receiveMsg.msgTitle}</div>
        </div>
        <div className="contents-container2">
          <div className="contents-contents">내용</div>
          <div className="contents2">{receiveMsg.msgContents.split('\n').map((line, index) => {return <p key={index}>{line}</p>})}</div>
        </div>
        <div className="button-container">
            <button className="reply" onClick={() => setSendMsg(!sendMsg)}>답장하기</button>
            {sendMsg && (
                      <MessageModal closeModal={() => setSendMsg(!sendMsg)}>

                        <WriteMessage writerId={receiveMsg.sender}/>
                      </MessageModal>
                    )}
        </div>
  </MsgStyle>        



    );

}

export default ReceiveMsg;