import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import TextField from '@material-ui/core/TextField';
import { UserContext } from "../../context/userInfo";
import AxiosApi from "../../api/axiosapi";
import { useNavigate } from "react-router-dom";
import Modal from "../../utils/Modal";
import { Link } from "react-router-dom";


const MainContainer = styled.div`
    min-height: 1000px; // 
    background-color: #f6f6f6;
    width: 100%;
    height: 150px;// 중간 컨텐츠 전체 높이(회색부분)
    padding-bottom: 60px;
    /* border: 1px solid black; */
    position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .coverpage {
        margin-top: 50px;
        background-color: white;
        position: center;
        justify-content: center;
        width: 700px;
        height: 700px;
        /* padding: 50px 40px; */
        border-radius: 50px;
    }

`;

const Titlebox = styled.div`
    background: linear-gradient( to bottom, #f2dfe4, #e3daf5);
    width: 100%;
    height: 250px;
    position: relative;
`;


const MypageEdTitle = styled.div`
    padding-top: 20px;
    margin-left: 3px;
    font-size: 20px;
    text-align: center;
    font-weight: 400px;
    font-family: 'TAEBAEKmilkyway';
`;

const CustomInfo = styled.div`
    display: flex;
    justify-content: center;
    position: center;
    flex-direction: column;
    

    .area {
        display: flex;
        margin-left: 120px;
        padding-left: 100px;
        margin-top: 20px;
        margin-bottom: 1px;
        justify-content: space-evenly;
        width: 350px; /* 각 영역의 고정 너비 지정 */ 
        margin-top : 25px;
    }

    .addrBtn {
        margin-left: 480px;
        margin-top: -40px;
    }

    .enable-btn{
        margin-top: 10px; 
        margin-left: 30px;
        margin-right: 30px;
        /* font-family: 'Noto Sans KR', sans-serif; */
        font-size: 15px;
        font-weight: bold;
        width: 100px; /* 원하는 너비 설정 */
        height: 36px;
        color: white;
        background-color: #5ba8ea; // 버튼 색깔 체크
        border-radius: 10px;
        border: #5ba8ea; // 버튼 색깔 체크
    }

    .enable-btn:active {
        margin-top: 10px; 
        margin-left: 30px;
        margin-right: 30px;
        width: 120x; /* 원하는 너비 설정 */
        height: 36px;
        font-weight: bold;
        font-size: 15px;
        border-radius: 13px;
        color: white;
        background-color: #999; // 버튼 색깔 체크
        border: #5ba8ea; 
    }

    .disable-btn {
        margin-top: 10px; 
        margin-left: 30px;
        margin-right: 30px;
        /* font-family: 'Noto Sans KR', sans-serif; */
        font-size: 15px;
        font-weight: bold;
        width: 120px; /* 원하는 너비 설정 */
        height: 36px;
        color: white;
        background-color: #999; // 버튼 색깔 체크
        border-radius: 10px;
        border: #5ba8ea; // 버튼 색깔 체크
    }
    
    
`;

const StyledButton = styled.button`
     /* margin-top: 1px; */
     width: 90px;
     height: 38px;
     background-color: rgba(108, 169, 245);
     border-radius: 5px;
     font-weight: bold;
     color: white;
     font-size: 14px;
     border: none;
     box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;


const MypageInfo = () => {

    const navigate = useNavigate()

    // 변경할 정보 입력 값

    const [userTel, setUserTel] = useState(""); // 휴대폰 번호
    const [userEmail, setUserEmail] = useState(""); // 이메일
    const [userAddr, setUserAddr] = useState({address:""}); // 주소


    // 주소찾기 영역
    const [popup, setPopup] = useState(false);

    // 팝업창 열기
    const handleComplete = () => {
        setPopup(!popup);
    }

    // 모달 열기 & 닫기
    const [modalOpen, setModalOpen] = useState(false);
    
    const closeModal = () => {
        setModalOpen(false);
    };
   


    // 본인 정보만 담을 변수
    const [myInfo, setmyInfo] = useState("");
    const isLogin = window.localStorage.getItem("isLogin"); // 로그인 들어오면 마이페이지 후 수정화면 접속
    console.log(isLogin);

    if(isLogin !== "TRUE") navigate("/MainBody");
    console.log(isLogin);


    const context = useContext(UserContext);
    const {Id} = context;


    // userEffect를 통해 회원정보만 가져옴
    useEffect(() => {
        const myInfo = async () => {
            try {
            const rsp = await AxiosApi.customEdit(Id); // 아이디를 기준으로 조회
                console.log(rsp.data);
                setmyInfo(rsp.data);
                } catch(e) {
                console.log(e);
                }
            };
            myInfo();
        }, []);
        

    const [value, setValue] = useState('');
    const onChange = (e)=> {
        setValue(e.target.value)
    }    






    // 검색한 주소
    const handleInput = (e) => {
        setUserAddr({
            // ... => enroll_company에 다 담겠다는 의미
            ...userAddr,
            [e.target.name]:e.target.value,
        })
        console.log(e.target.name);
    }

    
    
    return(
        <>
            <MainContainer> 
                <Titlebox>
                <MypageEdTitle><h1>회원정보조회</h1></MypageEdTitle>
                </Titlebox>
                <div className="mypageditInfo">
                <div className="coverpage">
                    <CustomInfo>
        
                <div className="area">
                    <TextField 
                    style={{ backgroundColor: 'lightgray', width: '350px' }}
                    label="이름"  
                    variant="filled"
                    value={myInfo.name}
                    onChange={onChange}
                    size= "small"
                    InputLabelProps={{ 
                        shrink: true,
                    }}
                    disabled
                    />      
                </div>

                <div className="area">
                    <TextField 
                    style={{ backgroundColor: 'lightgray', width: '350px' }}
                    label="아이디"  
                    variant="filled"
                    value={myInfo.id}
                    onChange={onChange}
                    size= "small"
                    InputLabelProps={{ 
                        shrink: true,
                    }}
                    disabled
                    />      
                </div>
    
                    <div className="area"> 
                    <TextField 
                    style={{ width: '350px' }}
                    label="휴대폰번호" 
                    variant="filled"
                    value={myInfo.tel}
                    size= "small"
                    InputLabelProps={{ 
                        shrink: true,
                    }}
                    />      
                </div>

                    <div className="area">
                    <TextField 
                    style={{ width: '350px' }}
                    label="이메일주소"
                    variant="filled"
                    value={myInfo.email}
                    size= "small"
                    InputLabelProps={{ 
                        shrink: true,
                    }}
                    />     
                </div>

                    <div className="area">
                    <TextField 
                    style={{ width: '350px' }}
                    label="우편주소" 
                    variant="filled"
                    value={myInfo.addr}
                    size= "small"
                    InputLabelProps={{ 
                        shrink: true,
                    }}
                    />    
                </div>

                <div className="area">
                    <TextField 
                    style={{ width: '350px' }}
                    label="포인트" 
                    variant="filled"
                    value = "5000point"
                    onChange={onChange}
                    size= "small"
                    InputLabelProps={{ // 라벨 hover 적용하지 않고 고정시키기
                        shrink: true,
                    }}
                    disabled
                    />      
                </div>
                
                <div className="area">
                <Link to = "/MypageEdit"><button className="enable-btn" >수정하기</button></Link> 
                </div>
                </CustomInfo>
                </div>
                </div>

            </MainContainer>
        </>
    );
}
export default MypageInfo;
