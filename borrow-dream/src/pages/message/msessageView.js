import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MessageModal from "./messageModal";
import BaroApi from "../../api/BaRoApi";
import { useNavigate, useParams } from "react-router-dom";

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


const ViewMsgList = () => {
    const navigate = useNavigate();
    let params = useParams();
    let getId = params.no;

    // 내용로드
    const [msgData, setMsgData] = useState([]);

    //메세지 보기위해 메세지넘버값 가지고오기
    const [msgNo, setMsgNo] = useState("");

    useEffect(() => {
        const MsgLoad = async () => {
            try {
                const MsgView = await BaroApi.receiverList(getId);
                setMsgData(MsgView.data);
                console.log(MsgView.data);

            } catch(e) {
                console.log(e);
            }
        };
        MsgLoad();
    }, [getId]);

    const onClicktToView = (msgNo) =>{
        navigate("/receiver/" + msgNo);
    }

    return (
        <Wrap>
            <Section className="section">
                <div className="board_list">
                    <table className="postInfo">
                        <tr>
                            <th>제목</th>
                            <th>보낸사람</th>
                            <th>보낸날짜</th>
                        </tr>
                    <tbody>
                        {msgData.map((e) =>{
                            return (
                                <tr key={e.receiver}>
                                <td onChange={setMsgNo} onClick={() => onClicktToView(e.msgNo)}>{e.msgTitle}</td>
                                <td>{e.sender}</td>
                                <td>{e.msgDate}</td>
                                </tr>
                            )
                            })}
                    
                    </tbody>
                    </table>
                </div>
            </Section>
        </Wrap>
    );

}

export default ViewMsgList;