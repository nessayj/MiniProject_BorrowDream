// 보낸메세지보기
import React, { useEffect, useState } from "react";
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
        color: #7F8EEF;
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
        border: 1px solid black;
        background-color: #7F8EEF;
        color: white;
        width: 20rem;
        }
        .title2 {
            color: black;
        }
    }

    .contents-container2 {

        border: 1px solid black;
        color: white;
        font-size: 1.2rem;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        .contents-contents {
            background-color: #7F8EEF;;
            border: 1px solid black;
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

const SendMsg = ({getNum}) => {
   

    const [sendMsgData, setSendMsgData] = useState("");

    // 내용로드
    useEffect(() => {
        const ReceiveMsgLoad = async () =>{
            try {
                console.log(getNum);
                const viewReview = await BaroApi.viewSendMsg(getNum);
                setSendMsgData(viewReview.data);
                console.log(viewReview.data);
            } catch(e) {
                console.log(e);
            }

        };
        ReceiveMsgLoad();

    },[getNum]);

  



    return(
        <MsgStyle>
        <div className="receiver-container2">
          <div className="receiver">{sendMsgData.receiver}</div>
        </div>
        <div className="receiver-container2">
          <div className="receiver">{sendMsgData.msgDate}</div>
        </div>
        <div className="title-container2">
          <div className="title-title">제목</div>
          <div className="title2">{sendMsgData.msgTitle}</div>
        </div>
        <div className="contents-container2">
          <div className="contents-contents">내용</div>
          <div className="contents2">{sendMsgData.msgContents}</div>
        </div>
        <div className="button-container">
            <button className="reply" >확인</button>
        </div>
  </MsgStyle>        



    );

}

export default SendMsg;