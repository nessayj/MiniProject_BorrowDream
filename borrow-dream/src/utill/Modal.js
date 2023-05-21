import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../App';
import styled from "styled-components";
import BaroApi from "../api/BaRoApi";


const ModalStyle = styled.div`
    font-family: 'bitbit';
    .modal {
        display: none;  // 숨겨진 상태로 시작
        position: fixed;
        top: 0;  // 화면 전체를 덮도록 위치
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99; // 다른 모달 보다 위에 위치하도록 함
        background-color: rgba(0, 0, 0, 0.6); // 배경색을 검정으로 하고 투명도 조절
    }
    .openModal {
        display: flex; // 모달이 보이도록 함
        align-items: center;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-bg-show 0.8s;
    }
    button {
        outline: none;
        cursor: pointer;
        margin-right: 10px;
        border: 0;
    }

    section {
        width: 90%;
        max-width: 450px;
        margin: 0 auto;
        border-radius: 0.3rem;
        background-color: #fff;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-show 0.3s;
        overflow: hidden;
    }
    section > header {
        position: relative;
        padding: 16px 64px 16px 16px;
        background-color: #f1f1f1;
        font-weight: 700;
    }
    section > header button {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 30px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #999;
        background-color: transparent;
    }

    section > main {
        padding: 16px;
        border-bottom: 1px solid #dee2e6;
        border-top: 1px solid #dee2e6;
    }

    section > footer {
        padding: 12px 16px;
        text-align: right;
    }

    section > footer button {
        padding: 6px 12px;
        color: #fff;
        background-color: #6c757d;
        border-radius: 5px;
        font-size: 13px;
    }
    // 애니메이션
    @keyframes modal-show {
        from {
            opacity: 0;
            margin-top: -50px;
        }
        to {
            opacity: 1;
            margin-top: 0;
        }
    }
    @keyframes modal-bg-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }


`;


const Modal = (props) => {
    const navigate = useNavigate();
    const {open, confirm, close, boardNo, reviewNo, onConfirm, option, type, header} = props;


    // 로그아웃
    const onClickLogout = () => {
        window.localStorage.setItem("userId", '');
        window.localStorage.setItem("userPwd",'');
        window.localStorage.setItem("isLogin", "false")
        window.location.replace("/");
        navigate("/");
    }

    // 문의하기 게시물 비밀번호
    const [boardPwd, setBoardPwd] = useState("");
      
    const handleConfirm = () => {
          onConfirm(boardPwd);
          setBoardPwd(''); // 비밀번호 작성 창 초기화
          close();
    };
   

    // 작성글보기에서 삭제
    const onClikcToDelete = async() => {
        await BaroApi.inquiryDelete(boardNo);
        navigate("/board-list");
    }
    // 작성글 보기에서 수정
    const onClickEdit = () => {
        const link = "/board-list/inquiry-edit/" + boardNo;
        navigate(link);
    }
    // 수정 후 다시 작성글 보기
    const onClickEditOk = () => {
        navigate(-1);
    }

    // 글 작성 후 저장
    const onClickSave = () => {
        navigate("/board-list");
    }

    // 리뷰 수정
    const onClickToEditReview = () => {
        const link = "/review-edit/" + reviewNo;
        navigate(link);
    }

    // 리뷰 삭제
    const onClickToDeleteReview = async() => {
        await BaroApi.deleteReview(reviewNo);
        navigate("/review-list");
    }

    //리뷰 작성 후 저장
    const onClickToReviewSave = () =>{
        navigate("/review-list");
    }

    // 리뷰 수정 후 저장
    const onClickToEditSave = () => {
        const link = "/reveiw-list/review/" +reviewNo;
        navigate(link);
    }

    // 내빌드 작성
    const onClikcToSaveMyItem =() => {
        navigate("/myLentItem");
    }

    // 쪽지보내기
    const onClickToSend = () => {
        navigate("/Login");
    }

    return (
         <ModalStyle>
            <div className={open ? "openModal modal" : "modal"}>
                {open && 
                    <section>
                        <header>
                            {header}
                            <button onClick={close}>
                                    &times;
                                    {/* &times X표 문자를 의미 */}
                            </button>
                        </header>
                        <main>{props.children}
                        {(option === '비밀번호체크') && 
                            <div>
                                <label>비밀번호 입력 : </label>
                                <input type="password" value={boardPwd} onChange={(e) => setBoardPwd(e.target.value)} />
                                
                            </div>
                        }
                       
                        </main>
                        <footer>
                            {type && <button onClick={confirm}>확인</button>}
                            <button onClick={close}>취소</button>
                            {(option === '로그아웃') ? <button className="yes btn-m" onClick={onClickLogout}>확인</button>: ''}
                            {(option === '작성글저장') ? <button className="yes btn-m" onClick={onClickSave}>확인</button>: ''}
                            {(option === '수정') ? <button className="yes btn-m" onClick={onClickEdit}>확인</button>: ''}
                            {(option === '수정완료') ? <button className="yes btn-m" onClick={onClickEditOk}>확인</button>: ''}
                            {(option === '삭제') ? <button className="yes btn-m" onClick={onClikcToDelete}>확인</button>: ''}
                            {(option === '비밀번호체크') ? <button className="yes btn-m" onClick={handleConfirm}>확인</button>:''}
                            {(option === '리뷰수정') ? <button className="yes btn-m" onClick={onClickToEditReview}>확인</button>:''}
                            {(option === '리뷰삭제') ? <button className="yes btn-m" onClick={onClickToDeleteReview}>확인</button>:''}
                            {(option === '리뷰저장') ? <button className="yes btn-m" onClick={onClickToReviewSave}>확인</button>: ''}
                            {(option === '리뷰수정후저장') ? <button className="yes btn-m" onClick={onClickToEditSave}>확인</button>: ''}
                            {(option === '내빌드저장') ? <button className="yes btn-m" onClick={onClikcToSaveMyItem}>확인</button>: ''}
                            {(option === '쪽지로그인') ? <button className="yes btn-m" onClick={onClickToSend}>확인</button>: ''}
                        </footer>
                    </section>
                
                }
            </div>
         </ModalStyle>
    );
}

export default Modal;