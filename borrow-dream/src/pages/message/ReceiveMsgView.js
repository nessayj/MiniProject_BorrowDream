// 받은메세지보기
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MessageModal from "./messageModal";
import ReceiveMsg from "./ReceiveMsg";
import BaroApi from "../../api/BaRoApi";
import { Link, useParams } from "react-router-dom";

const Wrap = styled.div`
    width: 1000px;
    height: 100vh;
    background-color: white;
    margin: 0 auto;
    border-radius: 10px;
    font-family:'bitbit';
`;

const Section = styled.div`
    table {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: lighter;
        border-collapse: collapse; 
        width:100%;
        background-color: #4555AE;
        border-top: solid 1px #4555AE;
        border-bottom: solid 1px #4555AE;
        text-align: center;
        table-layout: fixed;
        th{padding: 10px 6px; color: white; background-color: #7F8EEF;}
        tr{
            background-color: white;
            &:nth-child(2n) td, &:nth-child(2n){
                background-color: #fbfbfb;
            }
        }
        th:first-child, td:first-child {border-left: none; width: 22rem;}
        th:nth-child(2), td:nth-child(2) {width: 10rem; letter-spacing: -.4px;}
        th:last-child, td:last-child{width: 100px;}
        tr:hover, tr:hover td, tr:hover a {
            color: #4555AE; 
            background-color: #efefef; 
            cursor: pointer;
        }
    }

`;


const ViewMsgList = (props) => {
    let params = useParams();
    let getId = params.no;

    // 내용로드
    const [msgData, setMsgData] = useState([]);


    useEffect(() => {
        const MsgLoad = async () => {
            try {
                const MsgView = await BaroApi.receiverList(getId);
                setMsgData(MsgView.data);
                console.log(MsgView.data);
                console.log(MsgView.data.msgNo);

            } catch(e) {
                console.log(e);
            }
        };
        MsgLoad();
    }, [getId]);

    // 모달로 쪽지확인
   const [sendMsg, setSendMsg] = useState(false);
   const [selectedMsgNo, setSelectedMsgNo] = useState(null);

   const onClickToView = (getNum) => {
    setSelectedMsgNo(getNum);
    setSendMsg(true);
   }
   
    return (
        <Wrap>
            <Section className="section">
                <div className="board_list">
                    <table className="postInfo">
                        <tr>
                            <th>제목</th>
                            <th>보낸사람</th>
                            <th>받은날짜</th>
                        </tr>
                    <tbody>
                        {msgData.map((e) =>{
                            return (
                                <tr key={e.receiver}>
                                <td onClick={() => onClickToView(e.msgNo)}>{e.msgTitle}</td>
                                
                                <td>{e.sender}</td>
                                <td>{e.msgDate}</td>
                                </tr>
                            )
                            })}
                    
                    </tbody>
                    </table>
                    {sendMsg && (
                                    <MessageModal closeModal={() => setSendMsg(!sendMsg)}>
                                        {msgData.map((e) => {
                                            if (e.msgNo === selectedMsgNo) {
                                               return <ReceiveMsg key={e.msgNo} getNum={e.msgNo}/>
                                            }
                                            return null;
                                        })}
                                       
                                    </MessageModal>
                                )}
                    <div className="mainbutton-container">
                        <Link to="/Mypage"><button className="btn">돌아가기</button></Link>
                    </div>
                </div>
            </Section>
        </Wrap>
    );

}

export default ViewMsgList;