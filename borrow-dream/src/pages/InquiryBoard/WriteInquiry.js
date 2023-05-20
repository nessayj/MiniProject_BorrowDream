import React, { useState} from "react";
import { Link  } from "react-router-dom";
import BaroApi from "../../api/BaRoApi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
import Modal from "../../utill/Modal";
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
    font-family: 'bitbit';

    .title {
        display: flex;
        align-items: center;
        font-size: 30px;
        font-weight: 600;
        h2 {margin-left: 10px; font-size: 35px; margin-top: 35px; font-weight: 500; color: #135CD2; }
    }   
`;

const StyleInput = styled.input `
    appearance: none;
        border: 2px solid #bbb;
        border-radius: 0.2rem;
        width: 20px;
        height: 20px;
        margin-right: 8px;
        transition: all .03s ease-in;
        vertical-align: middle;
    &:checked {
        border-color: transparent;
        background-size: 150% 150%;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: #4555AE;
    }
`;

const Section = styled.div`
    width: 1280px;
    height: calc(100vh - 40px);
    float: center;
    position: relative;
    div {
        width: 100%;
        padding: 10px 30px;
    }
    .sub_box {
        button {
            float:right;
            font-weight: 600;
            display: block;
            font-size: 16px;
            padding: 8px 35px;
            border-radius: 25px;
            background-color: #4555AE;
            color: white;
            border: none;
            &:hover{background-color: #666;}
        }
    }
    button {
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
        &:hover, &:hover i {background-color:  #a1f7d9; color: #135CD2;}
        i {
            font-size: 16px; 
            line-height: 48px; 
            color: #bbb;
            transition: all .1s ease-in;
        }
    }
    table {
        border-collapse: collapse; 
        width: 100%;
        background-color: #4555AE;
        border-bottom: solid 1px #4555AE;
        text-align: center;
        tr:first-child th {color: white; border-top: solid 1px #4555AE; border-bottom: 1px solid #bbb; background-color: #7F8EEF;}
        tr:nth-child(2n) td {background-color: #f9f9f9;}
        th {padding: 10px; color: white;}
        td {padding: 10px; background-color: white; border-left: solid 1px #bbb; border-top: solid 1px #ddd;}
        td:first-child {border-left: none; width: 115px;
            select{
                text-align:center;
                background: none;
                border: none;
                outline: none;
                font-size: 16px;
                font-weight: 400;
            }
        }
        td:nth-child(3) {width: 100px; text-align: left; padding-left: 20px;}  
        tr:hover td, tr:hover a {color: #4555AE;}
    }
    .util_box {
        .page_list {
            width: 500px; float:left;
            li {list-style-type: none; display: inline; padding: 0px 5px;
                a {
                    display: inline-block; text-decoration: none; padding: 5px 10px; color:#000;
                    border-radius: 5px;
                    -webkit-transition: background-color 0.3s;
                    transition: background-color 0.3s;
                    &:active {background-color: #4caf50; color: #fff;}
                    &:hover {color:#0d3c01; font-weight: bold;}
                    &:hover:not(.active) {background-color: #4555AE; color:white;}
                }
            } 
        }
        .search {
            float: right;
            width: 200px; height: 35px; padding: 0 10px; border: solid 2px #ddd; 
            background-color: white;
            input {width: 150px; height: 31px; border: 0px; outline: none; margin-right: 10px;}
        }
    }
    .form-wrapper {
        width: 100%;
        margin: 0 auto;
    }
    .title-input {
        font-size: 20px;
        width: 100%;
        height: 30px;
        outline: none;
        display: block;
        margin-bottom: 30px;
        padding-left: 15px;
        margin: 0 auto;
        border: none;
        background: none;
        &:focus {border: none; background:none;}
    }
    .text-area {
        width: 100%;
        min-height: 500px;
    }
    .button-area {
        text-align: right;
        button {
            display :inline-block;
            right: 30px;
            cursor: pointer;
            padding: 8px 35px;
            border-radius: 25px;
            border: none;
            color: white;
            background-color: #333;
            transition: all .1s ease-in;
            font-weight: 600;
            font-size: 16px;
            &:hover {background-color: #666;
                color: #888;}
        }
        button:nth-child(1) {
            margin-right: 10px;
        }
    }
    .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
        width: 1220px;
        height: 500px; 
    }
    .ck-editor__main {padding:0;  width: 1200px;}
`;


const WriteInquiry = () => {
    const getId = window.localStorage.getItem("Id");

    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [category, setCategory] = useState("");
    const [boardPwd, setBoardPwd] = useState("");

      // 작성 후 확인 모달
    const [modalOption, setModalOption] = useState("");

     
    // 작성 후 저장
    const onClickToSave = async() => {
        if(contents.length === 0 || title.length === 0) {
            setComment("제목과 내용을 입력해주세요");
            setModalOpen(true);
        } else {
            const resultNo = await BaroApi.writeInquiry(getId, category, title, contents, boardPwd, isUnknown);
            const linkNo = resultNo.data;
            if(linkNo) {
                setModalOpen(true);
                setModalOption('작성글저장');
                setComment("문의글 작성이 완료되었습니다.");
            }
        }
    }
        
        const onChangeTitle = (e) => {
            setTitle(e.target.value);
            
        }
       
        // 게시글 비밀번호 잠금
        const onChangePwd = (e) => {
            setBoardPwd(e.target.value);
        }

        
        //익명
        const [isUnknown, setIsUnknown] = useState(false);
        const unknownChecked = (e) => {
            setIsUnknown(e.target.checked);
        };
        


        // 제목, 내용 null 방지모달
        const [comment, setComment] = useState("");
        const [modalOpen, setModalOpen] = useState(false);
        const closeModal = () => {
            setModalOpen(false);
        };

        // 카테고리변경
        const onChangeCategory = (e) => {
            setCategory(e.target.value);
        }

    return(
        <Wrap>
            <Modal open={modalOpen} close={closeModal} option={modalOption} header="확인">{comment}</Modal>
            <Section id="create" className="section">
                <div className="title">
                    <SiStarship size="50" color="7F8EEF" /><h2>문의작성</h2>
                </div>
                <div className="board_list sub_box">
                    <p>문의하고자 하는 카테고리 선택 후 작성해주세요.</p>
                    <table>
                        <tr>
                        <th colSpan={5}>문의 작성</th>
                        </tr>
                        <tr>
                            <td>
                                <select name="category" onChange={onChangeCategory}>
                                    <option value="" selected>카테고리선택</option>
                                    <option value="제품문의">제품문의</option>
                                    <option value="배송문의">배송문의</option>
                                    <option value="결제문의">결제문의</option>
                                    <option value="기타문의">기타문의</option>
                                </select>
                            </td>
                            <td><input className="title-input" type="text" placeholder="제목을 입력해주세요." value={title} onChange={onChangeTitle} name="title" maxLength={33} /></td>
                            <td><input classNam="title-input" type="text" placeholder="숫자4자리" value={boardPwd} onChange={onChangePwd} /></td>
                            <td><StyleInput type="checkbox" checked={isUnknown} onChange={unknownChecked}/>익명</td>
                        </tr>
                    </table>
                </div>
                <div className="text-area">
                    <CKEditor editor={ClassicEditor} data={contents} onChange={(event, editor) => {
                        const data = editor.getData();
                        setContents(data);
                    }}/>
                </div>
                <div className="button-container">
                    <button onClick={onClickToSave}>문의하기</button>
                    <Link to='/board-list'><button>취소하기</button></Link>
                </div>
            </Section>
        </Wrap>
    );
}

export default WriteInquiry;