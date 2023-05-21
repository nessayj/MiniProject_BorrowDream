import styled from "styled-components";
import { useState } from "react";
import AxiosApi from "../../api/axiosapi";
import { Link, useNavigate } from "react-router-dom";
import Edit from '../../images/로그인이미지/setting.png';


const MainContainer = styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;

    p {
        margin-bottom: 2em;
    }
    

    .coverpage {
        background-color: #f6f6f6;
        position: center;
        justify-content: center;
        width: 50em;
        height: 16em;
        /* height: 20em */
        /* padding: 50px 40px; */
        border-radius: 50px;

        .labelField {
            padding-left: 6em;
            margin-top: 4em;
        }
    }

    .delbutton-container {
        margin-top: 20px;
        height: 55px;
        text-align: right;
        display: flex;
        justify-content: center;

        .btn {
            margin-left: 10px;
            cursor: pointer;
            font-family: 'bitbit';
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
`;



const Input = styled.input`
    width: 50%; /* 원하는 너비 설정 */
    height: auto; /* 높이값 초기화 */
    line-height : normal; /* line-height 초기화 */
    margin: 30px;
    position: center;
    padding: .7em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
    font-family: inherit; /* 폰트 상속 */
    border: 1px solid #999;
    border-radius: 20px;
    outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
`;


const Titlebox = styled.div`
    background: linear-gradient( to bottom, #f2dfe4, #e3daf5);
    margin-bottom: 50px;
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;

    .setting {
        width: 85px;
        height: 29px;
        background-color: #135CD2;
        color: white;
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-right: 10px;
        padding-left: 1.5em;
        text-align : center;
        border-radius: 5px;
        text-decoration: none;
        box-shadow: 0 6px 20px 0 rgba(150, 150, 160, 0.45);
        border: 1px solid #dbdbdb;
    }
    .linkarea {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'bitbit';
        margin-top: 3em;
    }
`;

const DeleteTitle = styled.div`
    padding-top: 20px;
    margin-left: 3px;
    font-size: 40px;
    text-align: center;
    font-family: 'bitbit';
`;



const CustomDelete = () => {


    const navigate = useNavigate()

    // 탈퇴는 본인만 가능
    const isLogin = window.localStorage.getItem("isLogin");
    const userPwd = window.localStorage.getItem("password");
    const userId = window.localStorage.getItem("Id"); 
    
    if(isLogin !== "TRUE") navigate("/MainBody"); // 로그인 실패 시 메인 이동
    console.log(isLogin);

    const [delmyInfo, setdelMyInfo] = useState("");
    const [inputPwd, setInputPwd] = useState("");

    const CustomDelLoading = async () => {
        if (inputPwd === userPwd) {
            await AxiosApi.customDel(userId); // 아이디를 기준으로 조회
            alert("탈퇴가 처리되었습니다")
            window.localStorage.setItem("userId", '');
            window.localStorage.setItem("userPwd",'');
            window.localStorage.setItem("isLogin", "false")
            window.location.replace("/");
        
            navigate("/");

        }
        else {
            alert("비밀번호를 확인해주세요")
        }
    };

    const onChangeUserPw = (e) => {
        setInputPwd(e.target.value);
    }

    // 취소하기 버튼 누를 시 현재 페이지 새로고침
    const cancleBtnClick = () => {
        window.location.reload();

    if(isLogin !== "TRUE") navigate("/");

    };


    return(
        <>
        <MainContainer>
            <Titlebox>
                <DeleteTitle>회원탈퇴</DeleteTitle>
                <div className="linkarea">
                    <Link to="/MypageEdit" className="setting">이전단계</Link>
                    <Link to="/" className="setting">메인홈</Link>
                        </div>
                <br /><br />
            </Titlebox>
            <p>고객님의 소중한 정보 보호를 위해, 바로드림 계정의 현재 비밀번호를 입력해주세요</p>
            
            <div className="coverpage">
                <label htmlFor="password" className="labelField" >현재 비밀번호</label>
                <Input 
                type="password" 
                placeholder="현재 비밀번호 입력 *" 
                value={inputPwd}
                onChange={onChangeUserPw}
                />
            <div className="delbutton-container">
                <button className="btn" onClick={CustomDelLoading}>회원 탈퇴</button>
                <button className="btn" onClick={cancleBtnClick}>취소하기</button>
            </div>
        </div>
        </MainContainer>
        </>
    );
}
export default CustomDelete;