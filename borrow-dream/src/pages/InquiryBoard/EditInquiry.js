import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BaroApi from "../../api/BaRoApi";
import Modal from "../../utill/Modal";
import { SiStarship } from "react-icons/si"


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
const StyledInput = styled.input`
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
    width: 1200px;
    height: calc(100vh - 40px);
    float: left;
    position: relative;
    div {
        width: 100%;
        padding: 10px 30px;
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
                font-weight: 600;
            }
        }
        td:nth-child(3) {width: 100px; text-align: left; padding-left: 20px;}  
        tr:hover td, tr:hover a {color: #4555AE;}
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
        width: 80%;
        min-height: 500px;
    }
    .button-area {
        text-align: right;
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
        }
        button:nth-child(1) {
            margin-right: 10px;
        }
    
    .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
        height: 500px; 
    }
    .ck-editor__main {padding: 0;
        .table {width: 100%;}
        table, tr, td {
            border-collapse: collapse;
            padding: 5px;
            border: 1px solid #ddd;
            background: none;
        }
    }
`;

const EditInquiry = () => {
    const getId = window.localStorage.getItem("Id");
    let params = useParams();
    let boardNo = params.no; 

    const [inquiryLoad, setInquiryLoad ] = useState("");
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [isUnknown, setIsUnknown] = useState(false);
    const [category, setCategory] = useState('');

    // 모달
    const [comment, setComment] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOption, setModalOption] = useState("");
    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        const inquiryData = async () => {
            try {
                // 지금은 로그인 및 회원정보를 가지고올 수 없어서 boardNo로 대체함(id비교해서 본인이 쓴 글만 삭제할 수 있도록 바꿔야함)
                const response = await BaroApi.inquiryView(boardNo);
                setInquiryLoad(response.data);
                setTitle(response.data.title);
                setContents(response.data.contents);
                setCategory(response.data.category);
            } catch (e) {
                console.log(e);
            }
        };
        inquiryData();
    },[boardNo]);

    // 해당 게시물 번호에 해당하는 페이지에 수정되어 저장
    const onClickToEditSave = async() => {
        if (contents.length === 0 || title.length === 0) {
            setComment("제목과 내용을 입력해 주세요");
            setModalOpen(true);
        } else {
           const result = await BaroApi.inquiryEdit(boardNo, getId, category, title, contents, isUnknown);
            if(result) {
                setModalOpen(true);
                setComment("수정이완료되었습니다.");
                setModalOption("수정완료");
            }
           
           
        }
    };
    
    // 정보 가지고오기
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const checkIsUnknown = (e) => {
        setIsUnknown(e.target.checked);
    };

    const onChangeCategory = (e) => {
        setCategory(e.target.value);
    }


    return (

        <Wrap>
            <Modal open={modalOpen} close={closeModal} option={modalOption}>{comment}</Modal>
            <Section id="edit" className="section">
                        <div className="board_list" sub_box>
                        <div className="title">
                            <SiStarship size="50" color="7F8EEF" /><h2>게시물수정</h2>
                        </div>
                        <table className="postInfo">
                            <tr>
                                <th colSpan={3}>게시물 수정</th>
                            </tr>
                            <tr>
                                <td>
                                    <select name="category" onChange={onChangeCategory} value={category}>
                                    <option value="" selected>카테고리선택</option>
                                    <option value="제품문의">제품문의</option>
                                    <option value="배송문의">배송문의</option>
                                    <option value="결제문의">결제문의</option>
                                    <option value="기타문의">기타문의</option>
                                    </select>
                                </td>
                                <td><input className="title-input" type="text" placeholder="제목을 입력하세요." defaultValue={title} value={title} onChange={onChangeTitle} name="title"/></td>
                                <td><StyledInput type="checkbox" checked={isUnknown} onChange={checkIsUnknown}/>익명</td>
                            </tr>
                        </table>
                        </div>
                        <div className="form-wrappter">
                            <CKEditor editor={ClassicEditor} data={contents} onChange={(event, editor) => {
                                const data = editor.getData();
                                setContents(data);
                            }}/>
                        </div>
                        <div className="button-area">
                            <button onClick={onClickToEditSave}>저장</button>
                            <Link to={`/board-list/inquiry-view/${boardNo}`}><button>취소</button></Link>
                        </div>

            </Section>

        </Wrap>
    );

}

export default EditInquiry;