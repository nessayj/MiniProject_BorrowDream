import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BaroApi from "../../api/BaRoApi";
import Modal from "../../utill/Modal";
import styled from "styled-components";
import InquiryComment from "./InquiryComment";
import {SiStarship} from "react-icons/si";


const Wrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1280px;
    height: 100vh;
    background-color: white;
    margin: 0 auto;
    border-radius: 10px;
    font-family:'bitbit';
    margin-bottom: 1200px;

    .title {
        display: flex;
        align-items: center;
        font-size: 30px;
        font-weight: 600;
        h2 {margin-left: 10px; font-size: 35px; margin-top: 35px; font-weight: 500; color: #135CD2; }
    }   
`;
const Section = styled.div`
    width: 1200px;
    height: calc(100vh - 40px);
    float: center;
    position: relative;

    /* 게시판 타이틀 밑 설명 */
    .title-com{
        font-weight: 200; 
        color: #7FC2EF; 
        font-size: 19px;
    }
    .postInfo {
        border-collapse: collapse; 
        width:100%;
        background-color: #4555AE;
        border-bottom: solid 1px #bbb;
        text-align: center;
        tr:first-child td {color: white; border-top: solid 1px #4555AE; border-bottom: 1px solid #bbb; background-color: #7F8EEF;}
        tr:nth-child(2) td {border-bottom: 1px solie #bbb; padding: 5px; color: white; background-color:#7F8EEF;   }
        tr:nth-child(3) td {color: #135CD2;}
        th {padding: 10px; color: white;}
        td {padding: 10px; background-color: white; border-left: solid 1px #bbb;  color: #135CD2; }
        td:first-child {border-left: none; width: 70px;}
        td:nth-child(2) {width: 85px;}  
        td:nth-child(3) {
            width: 135px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }  
        td:nth-child(4) {width: 100px;} 
        td:last-child {width: 100px;}

    }
    .detail{
        font-size: 20px;
        font-weight: lighter;
        width: 100%;
        min-height: 450px;
        padding: 30px;
        border-bottom: 1px solid #4555AE;
        table {width: 100%; margin: 10px 0;}
        table, tr, td {
            border-collapse: collapse;
            padding: 5px;
            border: 1px solid #ddd;
            background: none;
        }
    }
    .mainbutton-container {
        margin-top: 20px;
        height: 55px;
        text-align: right;
        .btn {
            margin-left: 10px;
            cursor: pointer;
            font-weight: 600;
            float: right;
            font-size: 16px;
            font-weight: lighter;
            padding: 8px 35px;
            border-radius: 25px;
            background-color: #135CD2;
            color: white;
            border: none;
            transition: all .1s ease-in;
            &:hover {background-color:  #a1f7d9; color: #135CD2;}
        }
    }
    .util_box{
        .search {
            float: right;
            width: 200px; height: 35px; padding: 0 10px; border: solid 2px #ddd; 
            background-color: white;
            input {width: 150px; height: 31px; border: 0px; outline: none; margin-right: 10px;}
        }
    }
    h3 {
        color: #135CD2;
        font-size: 28px;
        font-weight: 500;
        width: 100%;
        padding: 10px 30px 0;
    }
`;


const InquiryView = ()=> {
    // url에서 boardNo를 가져오기위해 params사용
    let params = useParams();
    let getNum = params.no;

    // 수정, 삭제는 본인만가능
    const isLogin = window.localStorage.getItem("isLogin");
    const getId = window.localStorage.getItem("Id");
   
 
    //해당 게시물 번호의 내용을로드하기위해 변수설정
    const [postViewData, setPostViewData] = useState("");
  
   

    // 게시물 삭제, 수정 모달
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOption, setModalOption] = useState("");
    const [comment, setComment] = useState(""); // 모달창 안내 문구

    // 댓글
    const [commentList, setCommentList] = useState([]);

    const closeModal = () => {
        setModalOpen(false);
    };


    const onClickToEdit = () => {
        setModalOpen(true);
        setModalOption('수정');
        setComment("수정하시겠습니까?");
    }

    const onClickToDelete = () => {
        setModalOpen(true);
        setModalOption('삭제');
        setComment("삭제하시겠습니까?");
    }


    // 본문을 불러오기위해 useEffect사용
    useEffect(() => {
        const InquiryViewLoad = async () => {
            try {
                const InquiryView = await BaroApi.inquiryView(getNum);
                setPostViewData(InquiryView.data);

                // 댓글불러오기
                const response = await BaroApi.commentLoad(getNum);
                setCommentList(response.data);
                
            } catch (e) {
                console.log(e);
           
            }
        };
        InquiryViewLoad();
    }, [getNum]);

    return(
        <>
        <Wrap>
            <Section id="postview" className="section">
                <Modal open={modalOpen} close={closeModal} boardNo={getNum} option={modalOption}>{comment}</Modal>
                <div className="board_list sub_box">
                <div className="title">
                <SiStarship size="50" color="7F8EEF" /><h2>문의하기</h2>
                </div>
                <p className="title-com">작성한 문의를 확인하시고 답변은 댓글에서 확인해주세요</p>
                <table className="postInfo">
                    <tr>
                    <td className="title-input" colSpan={5}>{postViewData.title}</td>
                    </tr>
                    <thead>
                    <tr className="table-title">
                        <td>카테고리</td>
                        <td>글번호</td>
                        <td>아이디</td>
                        <td>조회수</td>
                        <td>작성날짜</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td>{postViewData.category}</td>
                    <td>{postViewData.boardNo}</td>
                    <td>{postViewData.writerId}</td>
                    <td><i class="bi bi-eye"></i>{postViewData.views}</td>
                    <td>{postViewData.writeDate}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="detail" dangerouslySetInnerHTML={{__html: postViewData.contents}}></div>
                </div>
                    <div className="mainbutton-container">
                        <Link to="/board-list"><button className="btn">돌아가기</button></Link>
                        <><button className="btn" onClick={onClickToEdit}>수정하기</button><button className="btn" onClick={onClickToDelete}>삭제하기</button></>
                    </div>
                    <h3>댓글</h3>
            <InquiryComment getNum={getNum} setCommentList={setCommentList} commentList={commentList}></InquiryComment>
            </Section>
        </Wrap>
        </>
    );
}

export default InquiryView;