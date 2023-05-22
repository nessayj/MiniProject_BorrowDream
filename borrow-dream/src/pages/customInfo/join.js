import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Modal from "../../utils/Modal";
import React from "react";
import AxiosApi from "../../api/axiosapi";
import styled from "styled-components";
import PostCode from "../../api/popupaddr";
 



const Container = styled.div` // 전체 회원가입 컨테이너 스타일
    display: flex;
    align-items: center;
    /* flex-wrap: wrap; */
    justify-content: center;
    height: 100vh;
    margin: 0 auto;
    flex-direction: column;
    position: relative;

    
    .joincoverpaper { 
        display: flex;
        position: relative;
        align-items: center;
        flex-direction: column;
        margin-bottom: 60px;
        /*margin-left: 40px;*/
        position: relative;
        height: 680px;
        width: 480px;
        /*background: rgba(255, 255, 255, 0.15);*/
        background-color: #c4dbf9;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(8.5px);
        -webkit-backdrop-filter: blur(8.5px);
    }

    .jointitle { // 제목 스타일
        font-size: 2.3em;
        width: 500px;
        margin: 30px 0px 0px;
        text-align: center;
        font-family: 'bitbit';
        color: #135CD2; 
        margin-top: 1em;
    }

    .comment { // 입력 시 코멘드
        display: flex;
        margin-top: 2px;
        margin-bottom: 10px;
        justify-content: center;
        align-items:center;
        font-size: 12px;
        color: #999;
    }
    .area {
        margin: 0px;
        display: flex;
        align-items: center;
    }


    .success { // 입력 성공 시
        color: #5ba8ea;
    }

    .error { // 입력 에러 시
        color: red;
    }

    .enable-btn{
        width: 120px;
        height: 36px;
        margin-top: 10px; 
        margin-left: 30px;
        margin-right: 30px;
        font-family: 'bitbit';
        color: white;
        font-size: 1em;
        background-color: #135CD2;  // 가입완료 버튼 색상
        border-radius: 13px;
        border: #5ba8ea;
    }
    .enable-btn:active {
        width: 120x; 
        height: 36px;
        margin-top: 10px; 
        margin-left: 30px;
        margin-right: 30px;
        font-family: 'bitbit';
        color: white;
        font-size: 1.1em;
        background-color: #999;
        border-radius: 13px;
        border: #5ba8ea; 
    }
   
`;

const DataInput = styled.input`
    width: 280px;
    height: 40px;
    background-color: white;
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
    padding: .7em 2em;
    display: flex;
    border-radius: 10px;
    outline-style: none;
    border: none;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    
    &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 10px;
  }
    
    &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }
`;

const PostInput = styled.input`
    width: 280px;
    height: 40px;
    display: flex;
    /* position: inherit; */
    position: center;
    margin-top: 10px;
    margin-left: 85px;
    margin-right: 14px;
    background-color: white;
    padding: .7em 2em;
    border-radius: 10px;
    outline-style: none;
    border: none;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    
    &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 10px;
  }
    
    &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }
`;

const StyledButton = styled.button`
    width: 75px;
    height: 35px;
    margin-left: 2px;
    margin-top: 6px;
    background-color: #135CD2;
    border-radius: 5px;
    font-family: 'bitbit';
    color: white;
    font-size: 1em;
    border: none;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;



const Join = () => {
    const navigate = useNavigate();

     // 입력 초기값
    const [userName, setUserName] = useState(""); // 이름
    const [userId, setUserId] = useState(""); // 아이디
    const [userPwd, setUserPwd] = useState(""); // 비밀번호
    const [userRePwd, setUserRePwd] = useState(""); // 비밀번호 재확인
    const [userTel, setUserTel] = useState(""); // 휴대폰 번호
    const [userEmail, setUserEmail] = useState(""); // 이메일
    const [userAddr, setUserAddr] = useState({address:"",}); // 주소

     // 오류 메시지
    const [nameError, setNameError] = useState("");
    const [idError, setIdError] = useState("");
    const [pwdError, setPwdError] = useState("");
    const [repwdError, setRepwdError] = useState("");
    const [telError, setTelError] = useState();
    const [emailError, setEmailError] = useState("");

     // 유효성 검사
     const [isName, setIsName] = useState(false);
     const [isId, setIsId] = useState(false);
     const [isPwd, setIsPwd] = useState(false);
     const [isRePwd, setIsRePwd] = useState(false);
     const [isTel, setIsTel] = useState(false);
     const [isEmail, setIsEmail] = useState(false);


     // 주소찾기 영역
     const [popup, setPopup] = useState(false);

     // 팝업창 열기
    const handleComplete = () => {
        setPopup(!popup);
    }


     const [modalOpen, setModalOpen] = useState(false);
     const [modalText, setModelText] = useState("중복된 아이디 입니다.");

    const closeModal = () => {
        setModalOpen(false);
    };

    const onChangeUserName = (e) => {
        const nameNow = e.target.value;
        setUserName(nameNow); 

        if(nameNow.length < 2 || nameNow.length > 10) {
            setIsName(false);
        } else {
            setIsName(true);
    }
}



    const onChangeUserId = (e) => {
        const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,10}$/ // 아이디 정규표현식
        const idNow = e.target.value; 
        setUserId(idNow);

        if(!idRegex.test(idNow)) {
            setIdError('8자리 이상 10자리 이내로 입력해주세요');
            setIsId(false)
        } else {
            setIdError("올바른 아이디 형식 입니다.");
            setIsId(true);
        }
    }

    
    const onChangeUserPw = (e) => {
        //const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const pwdRegex =  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/; // 비밀번호 정규표현식
        const pwdNow = e.target.value ;
        setUserPwd(pwdNow);

        if (!pwdRegex.test(pwdNow)) {
            setPwdError('숫자+영문자 및 특수문자 조합으로 8자리 이상 입력해주세요!')
            setIsPwd(false)
        } else {
            setPwdError('안전한 비밀번호에요 : )')
            setIsPwd(true);
        }        
    }
    
    const onChangeReUserPw = (e) => {
        const repwdNow = e.target.value;
        setUserRePwd(repwdNow)
        
        if (repwdNow !== userPwd) {
            setRepwdError('비밀번호가 일치하지 않아요 ㅠㅠ')
            setIsRePwd(false)
        } else {
            setRepwdError('비밀번호가 일치해요 : )')
            setIsRePwd(true);
        }      
    }

    const onChangeUserTel = (e) => {
        const telRegEx = /^\d{2,3}-\d{3,4}-\d{4}$/; // 전화번호 정규표현식
        const telNow = e.target.value;
        setUserTel(telNow);

        if(!telRegEx.test(telNow)) {
            setTelError('전화번호 형식이 맞지 않아요 다시 입력해주세요ㅠㅠ')
            setIsTel(false)
        } else {
            setTelError('사용 가능한 전화번호 형식이에요 : )')
            setIsTel(true);

        }
    }


    const onChangeUserEmail = (e) => {
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/ // 이메일 정규표현식
        const emailNow = e.target.value ;
        setUserEmail(emailNow);

        if (!emailRegex.test(emailNow)) {
            setEmailError('이메일 형식이 맞지 않아요 다시 입력해주세요 ㅠㅠ')
            setIsEmail(false)
        } else {
            setEmailError('올바른 이메일 형식이에요 : )')
            setIsEmail(true);
        }        
    }



    

    const onClickJoin = async() => {
        // 로그인 위해 axios 호출
        const response = await AxiosApi.customRegCheck(userId);
        console.log(response.data);
        if(response.data === true) {
            console.log("가입된 아이디가 없습니다. 다음 단계 진행 합니다.");
            const memberReg = await AxiosApi.customReg(userName, userId, userPwd, userTel, userEmail, userAddr.address);
            console.log(memberReg.data);
            if(memberReg.data === true) {
                navigate('/');
            } else {
                setModalOpen(true);
                setModelText("회원 가입에 실패 했습니다.");
            }

        } else {
            console.log("이미 가입된 회원 입니다.")
            setModalOpen(true);
            setModelText("이미 가입된 회원 입니다.");
        } 
    }

    // 검색한 주소
    const handleInput = (e) => {
        setUserAddr({
            // ... => userAddr에 다 담겠다는 의미
            ...userAddr,
            [e.target.name]:e.target.value,
        })
        console.log(e.target.name);
    }




    return(
        <div class="joinpage">        
        <Container>
            <div class="joincoverpaper">
                <div class="jointitle">
                    <h2>회원정보 입력</h2>
                </div>
                <div className="area">
                    <DataInput type="text" placeholder="이름 입력" value ={userName} onChange={onChangeUserName} />
                </div>
                <div className="comment">
                    {userName.length > 0 && (<span className={`message ${isName ? 'success' : 'error'}`}>{nameError}</span>)} 
                </div>
                <div className="area">
                    <DataInput type="text" placeholder="아이디 입력" value ={userId} onChange={onChangeUserId} />
                </div>
                <div className="comment">
                    {userId.length > 0 && (<span className={`message ${isId ? 'success' : 'error'}`}>{idError}</span>)}
                </div>
                <div className="area">
                    <DataInput type="password" placeholder="비밀번호 입력" value={userPwd} onChange={onChangeUserPw} />
                </div>
                <div className="comment">
                    {userPwd.length > 0 && (<span className={`message ${isPwd ? 'success' : 'error'}`}>{pwdError}</span>)}
                </div>
                <div className="area">
                    <DataInput type="password" placeholder="비밀번호 재입력" value={userRePwd} onChange={onChangeReUserPw} />
                </div>
                <div className="comment">
                    {userRePwd.length > 0 && (<span className={`message ${isRePwd ? 'success' : 'error'}`}>{repwdError}</span>)}
                </div>
                <div className="area">
                    <DataInput type="tel" placeholder="휴대폰 번호 입력( - 포함)" value={userTel} onChange={onChangeUserTel} />
                </div>
                <div className="comment">
                    {userTel.length > 0 && (<span className={`message ${isTel ? 'success' : 'error'}`}>{telError}</span>)}
                </div>
                <div className="area">
                    <DataInput type="text" placeholder="이메일 주소 입력" value={userEmail} onChange={onChangeUserEmail} />
                </div>
                <div className="comment">
                    {userEmail.length > 0 && (<span className={`message ${isEmail ? 'success' : 'error'}`}>{emailError}</span>)}
                </div>
                <div className="area">
                    <PostInput type="text" placeholder="주소 입력" onChange={handleInput} value={userAddr.address} />
                    <br />
                    <StyledButton className="addrBtn" onClick={handleComplete}>주소찾기</StyledButton>
                    {/* <div className="popupaddr"> */}
                        {popup && <PostCode addr={userAddr} setAddr={setUserAddr} />}
                    {/* </div> */}
                </div>
                <div className="area">
                    <button className="enable-btn" onClick={onClickJoin}>가입완료</button> 
                    <Modal open={modalOpen} close={closeModal} header="오류">{modalText}</Modal>
            </div>
            </div>
        </Container>
        </div>
    );
}
export default Join;