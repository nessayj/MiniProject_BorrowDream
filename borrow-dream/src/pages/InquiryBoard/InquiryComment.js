import React, { useState } from "react";
import styled from "styled-components";
import BaroApi from "../../api/BaRoApi";
import { useNavigate, useLocation } from "react-router-dom";


const Comment = styled.div`
    padding: 0 !important;
     .comment_box {
        width: 100%;
        text-align: left;
        padding-top: 0;
        table {width: 100%;}
        table, tr, td {
            border-collapse: collapse;
            background: none;
            border-bottom: 1px solid #ddd;
        }
        tr:nth-child(2n-1) {font-size: 20px; color: #7F8EEF;}
        tr:nth-child(2n) {font-size: 20px; font-weight: 100;}
        tr:last-child {border-bottom: 2px solid #ddd;}
        tr td {
            padding: 8px 10px;
            word-break: break-all;
            &:first-child {
                width: 200px;
                overflow: hidden; 
                text-overflow: ellipsis; 
                white-space: nowrap;
            }
            td:nth-child(2) {width:700px;}
            &:last-child {width: 200px;}
        } 
        .deleteBtn {
            margin-left: 10px;
            width: 140px;
            cursor: pointer;
            font-weight: 400;
            float: right;
            font-size: 16px;
            padding: 8px 35px;
            border:none;
            transition: all .1s ease-in;
            &:hover {background-color:  #a1f7d9; color: #135CD2;}
        } 
    }
    .button-area2 {
        margin-top: 10px;
        text-align: right;
        display: flex;
        justify-content: space-between;
        .comment_btn {
            margin-left: 10px;
            width: 140px;
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
            &:hover {background-color:  #a1f7d9; color: #135CD2;}
        }
        .comment_text {
            width: calc(100% - 125px);
            margin-right: 7px;
            font-weight: 400;
            font-size: 16px;
            right: 10px;
            padding: 8px 35px;
            border-radius: 25px;
            background-color: #7F8EEF;
            color: white;
            border: none;
            outline: none;
        }
        .comment_text::placeholder {
            color: white;
        }
    }
`;

const InquiryComment = ({getId, getNum, getDate, setCommentList, commentList}) => {
    const navigate = useNavigate();
    const commentId = window.localStorage.getItem("Id");

    // 댓글내용입력
    const [contents, setContents] = useState('');


    // 댓글 입력
    const onChangeContents = (e) => {
        setContents(e.target.value);
    }


    // 댓글 저장
    const onClickToSaveContents = async() => {
        let commentData = await BaroApi.writeComment(getNum, commentId, contents);
        commentData = await BaroApi.commentLoad(getNum);
        setCommentList(commentData.data);
        setContents(''); 
    }

    // 글자 입력시 엔터마다 줄바꿈 넣어주는 함수
    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            setContents(contents+'\n');
        }
    }

    // 댓글 삭제
    const onClickToDeleteComment = async(commentNo) => {
        await BaroApi.commentDelete(commentNo);
        navigate(0);
    }
    return (
        <Comment>
           
             <div className="comment_box">
                <table>
                    {commentList.map(({commentNo, getNum, commentId, contents, commentTime}) =>
                    <>
                        <tr key={getNum}>
                            <td>{commentId}</td>
                            <td>{commentTime}</td>
                            {commentId === "admin" && (
                            <td><div><button className="deleteBtn" onClick={() => onClickToDeleteComment(commentNo)}>댓글삭제</button></div></td>
                            )}
                        </tr>
                        <tr>
                            <td><div>{contents.split('\n').map((line, index) => {return <p key={index}>{line}</p>})}</div></td>
                        </tr> 
                        </>
                    )}
                </table>
            </div>
            {commentId === "admin" && (
            <div className="button-area2">
                <textarea type="text" className="comment_text" placeholder="답변달기" value={contents} onChange={onChangeContents} onKeyDown={handleKeyPress} name="contents"/>
                <button className="comment_btn" onClick={onClickToSaveContents}>댓글저장</button>
            </div>
            )}
        </Comment>
    );
}
export default InquiryComment;