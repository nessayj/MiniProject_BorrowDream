import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaroApi from "../../api/BaRoApi";
import styled from "styled-components";
import {SiStarship} from "react-icons/si";
import Modal from "../../utill/Modal";


const Wrap = styled.div`
    width: 1000px;
    height: 100vh;
    background-color: white;
    margin: 0 auto;
    border-radius: 10px;
    font-family:'bitbit';

    .title {
        display: flex;
        align-items: center;
        font-size: 30px;
        font-weight: 600;
        color: #1a5d98;
        h2 {margin-left: 10px; font-size: 35px; margin-top: 35px; font-weight: 500; color: #135CD2; }
    }   

`;

const Section = styled.div`
    width: 100%;
    height: calc(100vh - 40px);
    float: center;
    position: relative;
    .sub_box {
        a{
            font-size: 1.2rem;
            color:  #7FC2EF;
            text-decoration: underline;
        }
        button {
            cursor: pointer;
            font-weight: 400;
            float: right;
            font-size: 16px;
            padding: 8px 35px;
            border-radius: 25px;
            background-color: #135CD2;
            color: white;
            border: none;
            transition: all .1s ease-in;
            &:hover{background-color:  #a1f7d9; color: #135CD2;}
        }
    }

    table {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: lighter;
        border-collapse: collapse; 
        width:100%;
        background-color: #4555AE;
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
        
        td {
            padding: 10px 6px; 
            background-color: white; 
            border-left: solid 1px #bbb; 
            border-top: solid 1px #ddd; 
            font-weight: 400; 
            overflow: hidden; 
            text-overflow: ellipsis; 
            white-space: nowrap;
        }
        th:first-child, td:first-child {border-left: none; width: 70px;}
        td:first-child, td:nth-child(5), td:last-child { letter-spacing: -1px;}
        th:nth-child(2), td:nth-child(2) {width: 70px; letter-spacing: -.4px;} 
        td:nth-child(3) {text-align: center;} 
        th:nth-child(4), td:nth-child(4){width: 120px;}
        th:nth-child(5), td:nth-child(5){width: 60px;}
        th:last-child, td:last-child{width: 100px;}
        tr:hover, tr:hover td, tr:hover a {
            color: #4555AE; 
            background-color: #efefef; 
            cursor: pointer;
        }
        .bi-heart-fill {
            padding-right:5px; 
            color:#FC5C7D;
        }
    }
    .top_sub_menu{
        padding: 0%;
        margin-bottom: 8px;
        overflow: hidden;
        p{
            float: left;
            margin: 5px 0;
            color: #7FC2EF;
        }
        ul{
            color: #7FC2EF;
            width: calc(100% - 150px);
            overflow: hidden;
            margin: 16px 0 0;
            float: left;
            > li{
                cursor: pointer;
                list-style: none;
                float: left;
                padding: 0 11px;
                font-size: 18px;
                font-weight: 500;
                color: #7FC2EF;
                letter-spacing: 1px;
                &:first-child{padding-left: 0; color: #4555ae; font-weight: 900; border-right: 2px solid #4555ae; cursor: default;}
                &.active{
                    color: #135CD2;
                    text-decoration: underline;
                    font-weight: 800;
                }
            }
        }
    }
        .number-container {
        display: flex;
        align-items: center;
        justify-content: center;
        .page-list {
            width: 500px; 
            li {
                list-style-type: none;
                display: inline; 
                padding: 0px 5px;
                margin-top: 20px;
                margin-left: 20px;
                span {
                    cursor: pointer;
                    width: 25px;
                    text-align: center;
                    line-height: 25px;
                    display: inline-block; 
                    text-decoration: none; 
                    color:#000;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                    &:active {background-color: #135CD2; color: #fff;}
                    &:hover {background-color:#a1f7d9; color: #135CD2;  font-weight: bold;}
                    &[aria-current] {background-color: #135CD2; color:white;}
                    &[disabled] {cursor: default; pointer-events: none; background: #eee;}
                }
            }
        }
    }
   

`;




const Board = () => {
    const navigate = useNavigate();

    // 값을 불러오기위해 선언
    // 목록보기
    const [boardList, setBoardList] = useState([]);
    // 게시물 클릭시 문의하기 글 보이기
    const [boardNo, setBoardNo] = useState();

    // 페이지네이션을 위한 선언
    const limitPage = 10; // 한 페이지당 10개의 게시글 출력
    const [page, setPage] = useState(1); // 현재 페이지 번호 1
    const offset = (page - 1) * limitPage //  게시글의 시작 점과 끝점 설정(위치계산)
    const numPages = Math.ceil(boardList.length / limitPage);  // 필요한 페이지갯수(게시글에따라달라져야함)
    const [currPage, setCurrPage] = useState(page);
    let firstNum = currPage - (currPage % 5) + 1;
    let lastNum = currPage - (currPage % 5) + 5;


    // 문의하기 버튼 클릭 시 문의하기 작성페이지로 이동
    const onClickToWrite = () => {
        const link = "write/"
        navigate(link);
    }

    // 문의하기(boardList) 불러오기
    useEffect(() => {
        const boardData = async () => {
            try {
                const boardListData = await BaroApi.boardList();
                setBoardList(boardListData.data);
                console.log (boardListData.data);
            } catch(e) {
                console.log(e);
            }
        };
        boardData();
    }, []);

    // 비밀번호체크 모달
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOption, setModalOption] = useState("");
    const [comment, setComment]= useState("");
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
        

    // 카테고리(상품문의, 배송문의, 결제문의, 기타문의)
    const [category, setCategory] = useState('all');
    const onClickCategoryAll = () => {
        setCategory('all');
    }
    const onClickCategoryProduct = () => {
        setCategory('product');
    }
    const onClickCategoryDeliver = () => {
        setCategory('deliver');
    }
    const onClickCategoryPayment = () => {
        setCategory('payment');
    }
    const onClickCategoryEtc = () => {
        setCategory('etc');
    }
    return (

        <Wrap>
            <Modal open={modalOpen} close={closeModal} onConfirm={handleConfirm} option={modalOption}></Modal>
            <Section id="board" className="section">
                <div className="board_list sub_box">
                    <div className="title">
                    <SiStarship size="50" color="7F8EEF" /><h2>문의하기</h2>
                    </div>
                    <a href="/qna-list">대표문의보러가기</a>
                    <div className="top_sub_menu">
                        <ul>
                            <li>카테고리</li>
                            <li className={category === 'all' ? 'active' : ''} onClick={onClickCategoryAll}>전체</li>
                            <li className={category === 'product' ? 'active' : ''} onClick={onClickCategoryProduct}>제품문의</li>
                            <li className={category === 'deliver' ? 'active' : ''} onClick={onClickCategoryDeliver}>배송문의</li>
                            <li className={category === 'payment' ? 'active' : ''} onClick={onClickCategoryPayment}>결제문의</li>
                            <li className={category === 'etc' ? 'active' : ''} onClick={onClickCategoryEtc}>기타문의</li>    
                        </ul>
                        <button onClick={onClickToWrite}>문의하기</button>
                    </div>
                    <table>
                        <tr>
                            <th>글번호</th>
                            <th>카테고리</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>조회수</th>
                            <th>작성일</th>
                        </tr>
                        {boardList.slice(offset, offset+limitPage).map((e) => {
                            // 목록에 익명출력을 위한 값 설정
                            let writer;
                            if (e.isUnknown === 2) {
                                writer = "익명";
                            } else {
                                writer = e.writerId;
                            }
                            if(category === 'all') {
                                return(
                                    <tr key={e.boardNo}>
                                        <td>{e.boardNo}</td>
                                        <td>{e.category}</td>
                                        <td onChange={setBoardNo} onClick={() => viewsUp(e.boardNo)}>{e.title}</td>
                                        <td>{writer}</td>
                                        <td>{e.views}</td>
                                        <td>{e.writeDate}</td>
                                    </tr>
                                )} else if(category === 'product' && e.category === '제품문의'){
                                    return(
                                        <tr key={e.boardNo}>
                                            <td>{e.boardNo}</td>
                                            <td>{e.category}</td>
                                            <td onChange={setBoardNo} onClick={() => viewsUp(e.boardNo)}>{e.title}</td>
                                            <td>{writer}</td>
                                            <td>{e.views}</td>
                                            <td>{e.writeDate}</td>
                                        </tr>
                                )} else if(category === 'deliver' && e.category === '배송문의'){
                                    return(
                                        <tr key={e.boardNo}>
                                            <td>{e.boardNo}</td>
                                            <td>{e.category}</td>
                                            <td onChange={setBoardNo} onClick={() => viewsUp(e.boardNo)}>{e.title}</td>
                                            <td>{writer}</td>
                                            <td>{e.views}</td>
                                            <td>{e.writeDate}</td>
                                        </tr>
                                 )} else if(category === 'payment' && e.category === '결제문의'){
                                    return(
                                        <tr key={e.boardNo}>
                                            <td>{e.boardNo}</td>
                                            <td>{e.category}</td>
                                            <td onChange={setBoardNo} onClick={() => viewsUp(e.boardNo)}>{e.title}</td>
                                            <td>{writer}</td>
                                            <td>{e.views}</td>
                                            <td>{e.writeDate}</td>
                                        </tr>
                                     )} else if(category === 'etc' && e.category === '기타문의'){
                                            return(
                                                <tr key={e.boardNo}>
                                                    <td>{e.boardNo}</td>
                                                    <td>{e.category}</td>
                                                    <td onChange={setBoardNo} onClick={() => viewsUp(e.boardNo)}>{e.title}</td>
                                                    <td>{writer}</td>
                                                    <td>{e.views}</td>
                                                    <td>{e.writeDate}</td>
                                                </tr>
                                    )} 
                        })}
                    </table>
                </div>
                <div className="number-container">
                    <ul className="page-list">
                        <li><span onClick = {()=> {setPage(page - 1); setCurrPage(page-2);}} disabled = {page === 1}>«</span></li>
                        <li><span onClick = {() => setPage(firstNum)} aria-current={page === firstNum ? "page" : null}>{firstNum}</span></li>
                        {/*Array(numPages) :  페이지 수만큼의 size를 가지고 있는 배열을 생성하고 
                        .fill() : undefine으로 모든 칸 할당
                        .map(arr, i) : arr은 현재값, i는 인덱스로 각 자리 인덱스에 해당하는 값 할당 
                        Array(numPages).fill()의 값을 map()을 통해 하나씩 불러와 i로 return*/}
                        {Array(4).fill().map((_, i) => {
                            if(i <= 2) {
                                return (<li><span key={i + 1} onClick={() => {setPage(firstNum + i + 1)}} aria-current={page === firstNum + i + 1 ? "page" : null}>{firstNum + i + 1}</span></li>)
                            } else if(i >= 3) {
                                return (<li><span key={i + 1} onClick={() => setPage(lastNum)} aria-current={page === lastNum ? "page" : null}>{lastNum}</span></li>)
                            } 
                        })}
                        <li><span onClick = {()=> {setPage(page + 1); setCurrPage(page);}} disabled = {page === numPages}>»</span></li>
                    </ul> 
                </div>
            </Section>
        </Wrap>
    );

}

export default Board;