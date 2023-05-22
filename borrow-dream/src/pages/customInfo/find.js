import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import styled from "styled-components";
import AxiosApi from "../../api/axiosapi";
import Modal from "../../utils/Modal";
import { SiStarship } from "react-icons/si";


const FindContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
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
        background-color: #c4dbf9;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(8.5px);
        -webkit-backdrop-filter: blur(8.5px);
    }

    .findtitle {
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

    .findarea {
        margin: 1em;
        display: flex;
        align-items: center;
        flex-direction: column; 
    } 


.loginBtn {
    width: 7.3rem; 
    height: 36px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'bitbit';
    color: white;
    font-size: 1em;
    background-color: #135CD2; // 로그인 버튼 색상
    border-radius: 13px;
    border: #5ba8ea; 

} .findBtn{
    width: 7.3rem;
    height: 36px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'bitbit';
    color: white;
    font-size: 1em;
    background-color: #135CD2; // 로그인 버튼 색상
    border-radius: 13px;
    border: #5ba8ea; 

    /* width: 50%;
    height: 48px;
    border: none;
    margin-top: 25px;
    margin-left: 110px;
    border-radius: 60px;
    background-color: #73d3fa; 
    color: white; */
}

.findBtn:disabled{
    width: 7.3rem;
    height: 36px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'bitbit';
    color: white; 
    font-size: 1em;
    background-color: #999; // disabled 상태의 버튼 색상
    border-radius: 13px;
    border: #5ba8ea;
}
`;



const FindInput = styled.input`
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

const Horizontal = styled.hr`
    width: 70%;
    height: .3rem;
    border: none;
    background: #135CD2;
    margin: 2px;
    position: relative;
`;

const Find = () =>{

    const navigate = useNavigate();

    const [userName, setUserName] = useState(""); // 이름
    const [userEmail, setUserEmail] = useState(""); // 이메일
    const [modalOpen, setModalOpen] = useState(false);
    const [modalHeader, setModalHeader] = useState(false);
    const [modalText, setModalText] = useState(false);
    const [submit, setSubmit] = useState(true);

     
     const onChangeName = (e) => {
        const nameNow = e.target.value;
        setUserName(nameNow);
     }
 
     const onChangeUserEmail = (e) => {
        const emailNow = e.target.value;
        setUserEmail(emailNow);
     }

     const closeModal = (e) => {
        setModalOpen(false);
     }
 
     const onClickFind = async()=>{
        try {
            console.log("onClickFind Call"); // 맞게 호출되는지 체크
            
            const findUser = await AxiosApi.customFind(userName, userEmail);
            console.log(findUser);

            if(findUser.status === 200) {
                const userId = findUser.data;
                setModalOpen(true);
                setModalHeader(userName + " 님의 아이디는");
                setModalText(userId +" 입니다.");    
            }

        } catch (e) {
            setModalOpen(true);
            setModalHeader("오류");
            setModalText("이름과 이메일이 일치하지 않습니다.");
        }
    }
    
    useEffect (()=> {
        if(userName && userEmail){
            setSubmit(false);
            return;
        } setSubmit(true);
    }, [userName, userEmail]);



    return (
        <FindContainer>
            <div className="coverpaper">
                <div className="findtitle">
                    <SiStarship size="50" color="7F8EEF" /><h2>아이디 찾기</h2>
                </div>
                <div className="findarea">
                <FindInput placeholder="이름 입력" value={userName} onChange={onChangeName}/>
                <FindInput placeholder="이메일 입력" value={userEmail} onChange={onChangeUserEmail}/>
                </div>
                <div className="findarea">
                    <button type="submit" className="findBtn" onClick={onClickFind} disabled={submit}>아이디 찾기</button>
                </div>
                <Horizontal />
                <div className="findarea">
                    <button className="loginBtn" onClick={()=>{navigate('/Login')}}>로그인하러 가기</button>
                </div>
                <Modal open={modalOpen} close={closeModal} header={modalHeader}>{modalText}</Modal>
            </div>
        </FindContainer>
    );
}

export default Find;
