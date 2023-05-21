import { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";
import Modal from '../../utils/Modal';
import AxiosApi from "../../api/axiosapi";
import { SiStarship } from "react-icons/si";

const PwdContainer = styled.div`
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

    } 

    .findBtn{
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

const FindPwd = () => {
    
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalHeader, setModalHeader] = useState(false);
    const [modalText, setModalText] = useState(false);
    const [submit, setSubmit] = useState(true);

    
    const onChangeUserId=(e)=>{
        const idNow = e.target.value; 
        setUserId(idNow);
    }

    const onChangeUserEmail=(e)=>{
        const emailNow = e.target.value;
        setUserEmail(emailNow);
    }

    const closeModal = () => {
        setModalOpen(false);
    };

    const onClickFindPwd = async()=>{
        try {
            console.log("onClickFind Call"); // 

            const findPassword = await AxiosApi.customFindPwd(userId, userEmail);
            console.log(findPassword);
            
            if(findPassword.status === 200) {
                const userPwd = findPassword.data;
                setModalOpen(true);
                setModalHeader(userId + " 님의 비밀번호는");
                setModalText(userPwd + " 입니다.");
            }

        } catch (e) {
        setModalOpen(true);
        setModalHeader("오류");
        setModalText("아이디와 이메일이 일치하지 않습니다.");
        }
    }

    useEffect(() => {
        if(userId && userEmail){
            setSubmit(false);
            return;

        } setSubmit(true);
    }, [userId, userEmail]);


    return(
        <PwdContainer>
            <div className="coverpaper">
                <div className='findtitle'>
                    <SiStarship size="50" color="7F8EEF" /><h2>비밀번호 찾기</h2>
                    </div>
                    <div className="findarea">
                        <FindInput placeholder="아이디 입력" value={userId} onChange={onChangeUserId}/>
                        <FindInput placeholder="이메일 입력" value={userEmail} onChange={onChangeUserEmail}/>
                    </div>
                    <div className="findarea">
                        <button type="submit" className="findBtn" onClick={onClickFindPwd} disabled={submit}>비밀번호 찾기</button>
                    </div>

                    <Horizontal />
                    
                    <div className="findarea">
                        <button className="loginBtn" onClick={()=>{navigate('/Login')}}>로그인하러 가기</button>
                    </div>
                <Modal open={modalOpen} close={closeModal} header={modalHeader}>{modalText}</Modal>
                </div>
        </PwdContainer>
    );
}
export default FindPwd;