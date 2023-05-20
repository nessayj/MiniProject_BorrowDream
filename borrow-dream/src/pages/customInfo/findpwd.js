import { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";
import Modal from '../../utils/Modal';
import AxiosApi from "../../api/axiosapi";

const ContatinerPwd = styled.div`
    position: absolute;
    top: 60px;
    bottom: 60px;
    width : 100%;
    padding: 0 20px;
    max-width: 500px;
    left: 50%;
    height: 80vh;
    transform: translate(-50%, 0);
    background-color: #c4dbf9; // 아이디찾기 배경색
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    color: black;
    /* color: #EEEEEE; */
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .inputWrap{
        display: flex;
        border-radius: 50px;
        background-color: white;
        padding: 16px;
        margin-top: 8px;
        border: 2px solid #EEEEEE;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(8.5px);
        -webkit-backdrop-filter: blur(8.5px);
        
    }
    
    .inputWrap:focus-within{
        border : 3px solid #b9abe099;
    }

    .input{
        width: 100%;
        outline: none;
        border: none;
        height: 17px;
        font-size: 14px;
        font-weight: 400px;
        background-color: inherit;
        color: black;
    }

    .input::placeholder{
        color: #999;
    
    }
    .loginBtn {
        width: 50%;
        height: 48px;
        border: none;
        font-weight: 18px;
        cursor: pointer;
        margin-top: 25px;
        margin-left: 110px;
        border-radius: 60px;
        background-color: #5ba8ea; // 버튼색 블루
        color: white;
        font-weight: bold;
    } 

    .findBtn{
        width: 50%;
        height: 48px;
        border: none;
        font-weight: 18px;
        cursor: pointer;
        margin-top: 25px;
        margin-left: 110px;
        border-radius: 60px;
        background-color: #73d3fa; // 버튼색 블루
        color: white;
        font-weight: bold;
    }

    .findBtn:disabled{
        background-color: #999;
        /* background-color: #222831; */
        color: #EEEEEE;
    }

    hr{
        border: 1px solid white;
        height: 4px;
        margin: 35px 0;
    }

    h2{
        margin-top: 80px;
        font-size: 35px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 30px;
        font-family: 'TAEBAEKmilkyway';
    }

    .findDesc{
        text-align: center;
        font-size: 14px;
    }
    div{
        margin-bottom: 20px;
    }
    `;

    const Horizontal = styled.hr`
        width: 100%;
        height: 2px;
        border: none;
        background: #5ba8ea;
        margin: 2px;
        /*backdrop-filter: blur(25px);*/
        position: relative;
    `;

const FindPwd = () => {
    
    let navigate = useNavigate();

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
        <ContatinerPwd>
            <div className='find-container'>
                <h2>비밀번호 찾기</h2>
                <div className="inputWrap">
                    <input className="input" placeholder="아이디 입력" type="text" value={userId} onChange={onChangeUserId}/>
                </div>
                <div className="inputWrap">
                    <input className="input" placeholder="이메일 입력" type="email" value={userEmail} onChange={onChangeUserEmail}/>
                </div>
                <div className="item">
                    <button type="submit" className="findBtn" onClick={onClickFindPwd} disabled={submit}>비밀번호 찾기</button>
                </div>
            <Horizontal />
                <div className="item">
                    <button type="button" className="loginBtn" onClick={()=>{navigate('/Login')}}>로그인하러 가기</button>
                </div>
            <Modal open={modalOpen} close={closeModal} header={modalHeader}>{modalText}</Modal>
            </div>
        </ContatinerPwd>
    );
}
export default FindPwd;