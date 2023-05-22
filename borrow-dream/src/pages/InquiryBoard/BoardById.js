import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BaroApi from "../../api/BaRoApi";
import Modal from "../../utill/Modal";
import { useNavigate } from "react-router-dom";


const Wrap = styled.div`
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
        width:calc(30% - 16px);
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
        th:first-child, td:first-child {border-left: none; width: 10rem;}
        th:nth-child(2), td:nth-child(2) {width: 10rem; letter-spacing: -.4px;}
        th:last-child, td:last-child{width: 100px;}
        tr:hover, tr:hover td, tr:hover a {
            color: #4555AE; 
            background-color: #efefef; 
            cursor: pointer;
        }
    }

`;

const BoardById = () => {
    const navigate = useNavigate();
    const getId = window.localStorage.getItem("Id");
    // 게시물 목록불러오기
    const [byIdList, setByIdList] = useState([]);
    const [boardNo, setBoardNo] = useState();


    // 아이디별 리스트 불러오기
    useEffect(() => {
        const boardById = async() => {
            try {
                const boardByIdData = await BaroApi.byIdList(getId);
                setByIdList(boardByIdData.data);
            } catch(e) {
                console.log(e);
            }
        };
        boardById();
    }, []);
     // 비밀번호체크 모달
     const [modalOpen, setModalOpen] = useState(false);
     const [modalOption, setModalOption] = useState("");
     const closeModal = () => {
         setModalOpen(false);
     };
     // 타이틀 클릭시 모달열기 및 비밀 번호가 맞다면 조회수증가
     const viewsUp = (boardNo) => {
         setBoardNo(boardNo);
         setModalOpen(true);
         setModalOption('비밀번호체크');
     }
       // 비밀번호체크

    const handleConfirm = async (boardPwd) => {
        console.log("비밀번호넘어와랏" + boardPwd);
            const isOk = await BaroApi.checkPwd(boardNo, boardPwd);
            console.log(isOk);
            if(isOk) {
                // 비밀번호 확인되면 조회수 올리기
                await BaroApi.inquiryViewsUp(boardNo);
                console.log("열리는거에도 넘어오나요" + boardNo);
                const link = "/board-list/inquiry-view/" + boardNo;
                navigate(link);
            } 
    }
        




    return (
        <Wrap>
        <Modal open={modalOpen} close={closeModal} onConfirm={handleConfirm} option={modalOption}></Modal>
        <Section id="board" className="section">
            <div className="board_list sub_box">
                <table>
                    <tr>
                        <th>제목</th>
                        <th>작성일</th>
                    </tr>
                    {byIdList.map((e) => {
                            return(
                                <tr key={e.boardNo}>
                                    <td onChange={setBoardNo} onClick={() => viewsUp(e.boardNo)}>{e.title}</td>
                                    <td>{e.writeDate}</td>
                                </tr>
                            )
                    })}
                </table>
            </div>
        </Section>
    </Wrap>
    );
}

export default BoardById;