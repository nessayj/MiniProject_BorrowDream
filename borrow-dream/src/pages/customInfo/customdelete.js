import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userInfo";
import AxiosApi from "../../api/axiosapi";
import { useNavigate } from "react-router-dom";
import Modal from "../../utils/Modal";


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
    font-size: 50px;
    text-align: center;
    font-weight: 400px;
    font-family: 'bitbit';
`;

const Btn = styled.div`
    display: flex;
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


    const [myInfo, setmyInfo] = useState("");
    const navigate = useNavigate()
    const isLogin = window.localStorage.getItem("isLogin");

    if(isLogin !== "TRUE") navigate("/MainBody"); // 로그인 실패 시 메인 이동
    console.log(isLogin);

    // 모달 열기 & 닫기
    const [modalOpen, setModalOpen] = useState(false);

    
    const closeModal = () => { // 아니오 눌렀을 때
        setModalOpen(false);
    };

    // 탈퇴 함수 
    const onClickCustomDelete = () => { // 
        setModalOpen(true);
    };


    // 탈퇴하기 모달창에서 확인을 눌렀을 때
    const confirmModal = async() => { 
        setModalOpen(false);
    }

    const context = useContext(UserContext);
    const {Id} = context;


    // userEffect를 통해 회원정보만 가져옴
    useEffect(() => {
        const myInfo = async () => {
            try {
            const rsp = await AxiosApi.customDel(Id); // 아이디를 기준으로 조회
                console.log(rsp.data);
                setmyInfo(rsp.data);
                } catch(e) {
                console.log(e);
                }
            };
            myInfo();
        }, []);



    // 취소하기 버튼 누를 시 현재 페이지 새로고침
    const cancleBtnClick = () => {
        window.location.reload();
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
            <label htmlFor="password" className="labelField">현재 비밀번호</label>
            <Input type="password" placeholder="현재 비밀번호 입력 *"/>
            <Btn>
                <div onClick={onClickCustomDelete}>
                  <Button>회원 탈퇴</Button>
                </div>
                    {modalOpen && <Modal open={modalOpen} confirm={confirmModal} 
                    close={closeModal} type={true} header="확인">정말로 탈퇴하시겠습니까?</Modal>}
                
                <div onClick={cancleBtnClick}>
                    <Button>취소하기</Button>
                </div>

            </Btn>
                </div>
        </MainContainer>
        </>
    );
}

export default CustomDelete;
