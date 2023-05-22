import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import TextField from '@material-ui/core/TextField';
import { UserContext } from "../../context/userInfo";
import AxiosApi from "../../api/axiosapi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from 'react-icons/io5';


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
        width: 600px;
        height: 680px;
        /* padding: 50px 40px; */
        border-radius: 50px;
    }
`;

const Titlebox = styled.div`
    background: linear-gradient( to bottom, #f2dfe4, #e3daf5);
    width: 100%;
    height: 240px;
    position: relative;

    .linkarea {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'bitbit';
        margin-top: 3em;
    }
    .setting {
        width: 87px;
        height: 29px;
        background-color: #135CD2;
        color: white;
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-right: 10px;
        padding-left: 1.3em;
        text-align : center;
        border-radius: 5px;
        text-decoration: none;
        box-shadow: 0 6px 20px 0 rgba(150, 150, 160, 0.45);
        border: 1px solid #dbdbdb;
    }
`;


const MypageEdTitle = styled.div`
    padding-top: 20px;
    margin-left: 3px;
    font-size: 2.3em;
    text-align: center;
    font-weight: 400px;
    font-family: 'bitbit';
`;

const CustomInfo = styled.div`
    display: flex;
    justify-content: center;
    position: center;
    flex-direction: column;
    text-align: center;
     
    h2 {
            font-family: 'bitbit';
            font-size: 1.9em;
            margin-top: 2em;
    }
    

    .area {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* padding-left: 100px; */
        margin-top: 20px;
        margin-top : 25px;
    
        label {
            font-family: 'bitbit';
        }
    }

    .addrBtn {
        margin-left: 480px;
        margin-top: -40px;
    }

    .chbtn {
        font-family: 'bitbit';
        font-size: 1.2em;
        width: 120px; /* 원하는 너비 설정 */
        height: 36px;
        background-color: #135CD2;
        color: white;
        border: #5ba8ea; // 버튼 색깔 체크
        border-radius: 0.8em;
        align-items: center;
        justify-content: center;
        display: flex;
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


const MypageInfo = () => {

    // let params = useParams();
    // let getId = params.no


    const navigate = useNavigate()
    const isLogin = window.localStorage.getItem("isLogin");
    const getId = window.localStorage.getItem("Id")
    if(isLogin !== "TRUE") navigate("/");
    console.log(isLogin);

    // 내정보를 조회하기위한 변수설정
    const [myInfo, setMyInfo] = useState("");

    // userEffect를 통해 회원정보만 가져옴
    useEffect(() => {
        const MyInfoLoading = async () => {
            try {
            const rsp = await AxiosApi.customEdit(getId); // 아이디를 기준으로 조회
                console.log(rsp.data); // axios data 값 확인 위해 출력
                setMyInfo(rsp.data);  
                } catch (e) {
                console.log(e); // 에러 출력
                }
            };
            MyInfoLoading();
        }, [getId]);

 
    
    return(
        <>
            <MainContainer> 
                <Titlebox>
                <MypageEdTitle><h1>회원정보조회</h1></MypageEdTitle>
                <div className="linkarea">
                    <Link to="/Mypage" className="setting">이전단계</Link>
                    <Link to="/MypageEdit" className="setting" >정보수정</Link>
                </div>
                <br /><br />    
                </Titlebox>
                <div className="mypageditInfo">
                <div className="coverpage">
                <CustomInfo>
                    <h2>나의프로필</h2>

                <div className="area">
                    <TextField 
                    style={{ backgroundColor: 'lightgray', width: '350px' }}
                    label="이름"  
                    variant="filled"
                    value={myInfo.name}
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
                    value = "5000 point"
                    size= "small"
                    InputLabelProps={{ // 라벨 hover 적용하지 않고 고정시키기
                        shrink: true,
                    }}
                    disabled
                    />      
                </div>
                
                <div className="area">
                <Link to = "/MypageEdit"><button className="chbtn" >수정하기</button></Link> </div>
                </CustomInfo>
                </div>
                </div>

            </MainContainer>
        </>
    );
}
export default MypageInfo;