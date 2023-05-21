import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userInfo";
import AxiosApi from "../../api/axiosapi";
import { useNavigate } from "react-router-dom";
import { id } from "date-fns/locale";


const MainContainer = styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;

    .coverpage {
        background-color: #f6f6f6;
        position: center;
        justify-content: center;
        width: 700px;
        height: 300px;
        /* padding: 50px 40px; */
        border-radius: 50px;
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
    height: 250px;
    display: flex;
    flex-direction: column;
`;

const DeleteTitle = styled.div`
    padding-top: 20px;
    margin-left: 3px;
    font-size: 40px;
    text-align: center;
    font-family: 'bitbit';
`;

const Button = styled.button`
    border: none;
    margin-top: 30px;
    margin-bottom: 50px;
    width: 200px;
    height: 50px;
    border-radius: 5px;
    font-size: 20px;
    
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

    // // 회원탈퇴 수정 모달
    // const [modalOpen, setModalOpen] = useState(false);
    // const [modalOption, setModalOption] = useState("");
    // const [comment, setComment] = useState(""); // 모달창 안내 문구
   

    // const closeModal = () => { // 아니오 눌렀을 때
    //     setModalOpen(false);
    // };

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


    // 탈퇴버튼 누를 시 
    const onClickToDelete = () => { 
        
        if(userPwd === inputPwd){
            CustomDelLoading();
            alert("탈퇴되었습니다.");
        } else {
            alert('패스워드가 일치하지 않습니다.'); // 패스워드가 일치하지 않을 때 알림 창 표시
          }
        };
    
    



    // 취소하기 버튼 누를 시 현재 페이지 새로고침
    const cancleBtnClick = () => {
        window.location.reload();

    if(isLogin !== "TRUE") navigate("/MainBody");

    };


    return(
        <>
        <MainContainer>
            <Titlebox>
                <DeleteTitle>회원탈퇴</DeleteTitle>
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
            <div className="mainbutton-container">
                <button className="btn" onClick={CustomDelLoading}>회원 탈퇴</button>
                <Button  onClick={cancleBtnClick}>취소하기</Button>
            </div>
        </div>
        </MainContainer>
        </>
    );
}
export default CustomDelete;

