import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../../api/axiosapi";
import { UserContext } from "../../context/userInfo";
import Modal from "../../utils/Modal";
import {SiStarship} from "react-icons/si"



const LoginContatiner = styled.div`
    display: flex;
    align-items: center;
    /* flex-wrap: wrap; */
    justify-content: center;
    margin: 0 auto;
    flex-direction: column;
    position: relative;
  
    .coverpaper {
        display: flex;
        position: relative;
        align-items: center;
        flex-direction: column;
        margin-bottom: 60px;
        margin-left: 18px;
        position: relative;
        height: 65vh;
        width: 480px;
        /*background: rgba(255, 255, 255, 0.15);*/
        background-color: #c4dbf9;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(8.5px);
        -webkit-backdrop-filter: blur(8.5px);
    }

    .logintitle {
        font-size: 2.5em;
        margin-top: 65px;
        margin-right: .3em;
        position: relative;
        text-align: center;
        font-family: 'bitbit';
        color: #135CD2;
        display: flex;
        h2 {margin-left: 18px; font-size: 35px; margin-top: 8px; font-weight: 500; color: #135CD2; }
    }

    .idpwdarea {
        margin: 1em;
        display: flex;
        align-items: center;
        flex-direction: column; 
    }
    
    .success { // 입력 성공 시
        color: #5ba8ea;
    }

    .error { // 입력 에러 시
        color: red;
    }
    
    .enable-btn{
        width: 120px; /* 원하는 너비 설정 */
        height: 36px;
        margin-left: 30px;
        margin-right: 30px;
        font-family: 'bitbit';
        color: white;
        font-size: 1.1em;
        /* font-weight: bold; */
        background-color: #135CD2; // 로그인 버튼 색상
        border-radius: 13px;
        border: #5ba8ea; // 버튼 색깔 체크
    }

    .enable-btn:active {
        width: 120x; 
        height: 36px;
        margin-left: 30px;
        margin-right: 30px;
        font-family: 'bitbit';
        color: white;
        font-size: 1.1em;
        background-color: #999; // 로그인 버튼 색상
        border-radius: 13px;
        border: #5ba8ea; 
    }

    .disable-btn {
        width: 120px;
        height: 36px;
        margin-left: 30px;
        margin-right: 30px;
        font-family: 'bitbit';
        color: white;
        font-size: 1.1em;
        background-color: #999; // disabled 상태의 버튼 색상
        border-radius: 13px;
        border: #5ba8ea;
    }

    .btnarea {
        margin: 5px;
        display: flex;
        align-items: center;
        flex-direction: column; 
        background-color: #5ba8ea;
    }
    
    .loginwith {
        position: relative;
        font-weight: bold;
        text-align: center;
        font-family: 'TAEBAEKmilkyway';
        cursor: pointer;
        margin-top: 16px;
    }
    .logininfo {
        margin-top: .5em;
        text-align: center;
        font-size: 1.2em;
        font-family: 'bitbit';
   
    }
    .infoarea {
        display: inline-block;
        text-decoration: none;
        margin-top: 0.5em;
    }

    .infoarea +.infoarea :before {
    content: "";
    display: inline-block;
    position: relative;
    margin: 12px 4px;
    top: 12px; // 구분선 높이
    width: 2px;
    height: 10px;
    background: #e0e0e0;
    text-decoration: none;
    }


`;

// const StyledButton = styled.button`
//     width: 300px;
//     height: 40px; 
//     color: white;
//     background-color: #5ba8ea;
//     margin-top: 20px;
//     margin-left: 30px;
//     margin-right: 30px; 
//     padding: .7em 2em;
//     border-radius: 20px;
//     outline-style: none;
//     border: none;
//     box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
//     backdrop-filter: blur(8.5px);
//     -webkit-backdrop-filter: blur(8.5px);
//   `;


const LoginInput = styled.input`
    width: 280px;
    height: 40px; 
    background-color: white;
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 30px; 
    padding: .7em 2em;
    border-radius: 1em;
    outline-style: none;
    border: none;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    
    &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 20px;
  }
    
    &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }
`;
    

const Login = () => {
    const navigate = useNavigate()
    window.localStorage.setItem("isLogin","FALSE"); // 디폴트값 설정

    // Context API에 값을 저장
    const context = useContext(UserContext);
    const {setId, setPassword} = context;

    // 키보드 입력 받기
    const [userId, setUserId] = useState(""); // 아이디
    const [userPwd, setUserPwd] = useState(""); // 비밀번호

    // 유효성 검사
    const [isId, setIsId] = useState(false);
    const [isPwd, setIsPwd] = useState(false);
    
    // 로그인 실패 시 팝업처리(모달)
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
        setModalOpen(false);
    }

    const confirmBtn = () => {
        console.log("확인 버튼이 눌러졌습니다.")
    }
    
    const onChangeUserId = (e) => {
        const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,10}$/ // 아이디 정규표현식(8자리이상 10자리이내)
        const idNow = e.target.value; 
        setUserId(idNow);

        if(!idRegex.test(idNow)) {
            setIsId(false)
        } else {
            setIsId(true);
        }
    }

    const onChangeUserPw = (e) => {
        const pwdRegex =  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/; // 비밀번호 정규표현식(숫자+영문자 및 특수문자 조합으로 8자리 이상)
        const pwdNow = e.target.value ;
        setUserPwd(pwdNow);

        if (!pwdRegex.test(pwdNow)) {
            setIsPwd(false)
        } else {
            setIsPwd(true);
        }        
    }

    const onClickLogin = async() => {
        // 로그인 위해 axios 호출
        const response = await AxiosApi.customLogin(userId, userPwd);
        console.log(response.data);
        if(response.data === true) {
            window.localStorage.setItem("Id", userId); // setItem(키, 값)
            window.localStorage.setItem("password", userPwd);
            window.localStorage.setItem("isLogin", "TRUE");
            setId(userId);
            setPassword(userPwd);

            navigate("/Mypage");
        } else {
            console.log("로그인 에러입니다.");
            setModalOpen(true);
        }
    }

    return(
        <div class="loginpage">
        <LoginContatiner>
            <div className="coverpaper">
                <div className="logintitle">
                <SiStarship size="50" color="7F8EEF" /><h2>환영합니다 : D</h2>
                </div>
                <div className="idpwdarea">
                    <LoginInput type="text" placeholder="아이디" value={userId} onChange={onChangeUserId}/>
                    <LoginInput type="password" placeholder="패스워드" value={userPwd} onChange={onChangeUserPw}/>
                </div>
                <div className="idpwdarea">
                    {(isId && isPwd) ?
                    <button className="enable-btn" onClick={onClickLogin}>로그인</button>  :
                    <button className="disable-btn">로그인</button>} 
                </div>
                <Modal open={modalOpen} type={true} confirm={confirmBtn} close={closeModal} header="오류">아이디 및 패스워드를 재확인 해주세요</Modal> 
                
                <div className="logininfo">
                    <div className="infoarea">
                        <Link to = "/Find" className="findIdPwd">아이디찾기</Link>
                   
                    </div>
                    <div className="infoarea">
                    <Link to = "/FindPwd" className="findIdPwd">비밀번호찾기</Link>

                    </div>
                    <div className="infoarea">
                    <Link to = "/Join" className="linkstyle">회원가입</Link>
                    </div>
                </div>
            </div>
        </LoginContatiner>
        </div>
    );
}; 

export default Login;