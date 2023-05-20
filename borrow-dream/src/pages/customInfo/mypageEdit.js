import styled from "styled-components"
import { TextField } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userInfo";
import AxiosApi from "../../api/axiosapi";
import { useNavigate } from "react-router-dom";
import Modal from "../../utils/Modal";
import { Link } from "react-router-dom";
import PostCode from "../../api/popupaddr";



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
        width: 800px;
        height: 900px;
        /* padding: 50px 40px; */
        border-radius: 50px;
    }

    .deletebtn {
        font-size: 15px;
        font-weight: bold;
        width: 120px; /* 원하는 너비 설정 */
        height: 36px;
        color: white;
        background-color: #5ba8ea; // 버튼 색깔 체크
        border-radius: 10px;
        border: #5ba8ea; // 버튼 색깔 체크
        margin-left: 580px;
        margin-top: -42px;
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
    margin: 0 auto;
    

    .area {
        display: flex;
        padding-left: 100px;
        margin-top: 20px;
        margin-bottom: 1px;
        justify-content: space-evenly;
        width: 350px; /* 각 영역의 고정 너비 지정 */ 
        margin-top : 25px;
        flex-direction: column;
    }
    .chBtn {
        display: flex;
        
    }

    .addrBtn {
        margin-left: 480px;
        margin-top: -40px;
    }

    .enable-btn {
        /* font-family: 'Noto Sans KR', sans-serif; */
        font-size: 15px;
        font-weight: bold;
        width: 120px; /* 원하는 너비 설정 */
        height: 36px;
        color: white;
        background-color: #5ba8ea; // 버튼 색깔 체크
        border-radius: 10px;
        border: #5ba8ea; // 버튼 색깔 체크
        margin-left: 480px;
        margin-top: -42px;
    }

    .addrUpdate {
        /* font-family: 'Noto Sans KR', sans-serif; */
        font-size: 15px;
        font-weight: bold;
        width: 120px; /* 원하는 너비 설정 */
        height: 36px;
        color: white;
        background-color: #5ba8ea; // 버튼 색깔 체크
        border-radius: 10px;
        border: #5ba8ea; // 버튼 색깔 체크
        margin-left: 580px;
        margin-top: -42px;
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

const Button1 = styled.button`
    border: none;
    width: 200px;
    height: 50px;
    border-radius: 5px;
    background-color: rgba(108, 169, 245);
    font-size: 20px;
    align-items: center;

    
    &:hover{
    background-color: rgba(108, 169, 245);
    color: white;
    }
    
`;

const Input = styled.input`
    margin-left: 30px;
    margin-right: 30px;
    width: 100%; /* 원하는 너비 설정 */
    height: auto; /* 높이값 초기화 */
    line-height : normal; /* line-height 초기화 */
    padding: .8em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
    font-family: inherit; /* 폰트 상속 */
    border: 1px solid #999;
    border-radius: 18px; /* iSO 둥근모서리 제거 */
    outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
`;

const EditImg = styled.img`
    box-sizing: border-box;
    width: 16px;
    height: 16px; 
    margin-left: 4px;
    margin-top: 1px;   
`;


const MypageEdit = () => {

    const navigate = useNavigate()

    // 변경할 정보 입력 값

    const [userPwd, setUserPwd] = useState(""); // 새 비밀번호
    const [userRePwd, setUserRePwd] = useState(""); // 새 비밀번호 재확인
    const [userTel, setUserTel] = useState(""); // 휴대폰 번호
    const [userAddr, setUserAddr] = useState({address:""}); // 주소

    // 오류 메시지
    const [pwdError, setPwdError] = useState("");
    const [repwdError, setRepwdError] = useState("");
    const [telError, setTelError] = useState();

    // 유효성 검사
    const [isPwd, setIsPwd] = useState(false);
    const [isRePwd, setIsRePwd] = useState(false);
    const [isTel, setIsTel] = useState(false);


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
                  setUserTel(rsp.data.tel); // myinfo에서 전송받은 값이 아닌 새로운 입력값에 지정한 변수에 axios 받음
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

    /* 비밀번호 정규식 체크 모음 */

    // 새 패스워드 변경
    const onChangeUserPw = (e) => {
        //const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const pwdRegex =  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/; // 비밀번호 정규표현식
        const pwdNow = e.target.value ;
        setUserPwd(pwdNow);

        if (!pwdRegex.test(pwdNow)) {
            setPwdError('숫자+영문자 및 특수문자 조합으로 8자리 이상 입력')
            setIsPwd(false)
        } else {
            setPwdError('알맞은 형식이에요 : )')
            setIsPwd(true);
        }        
    }

    // 새 패스워드 확인
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
        //setUserTel(telNow);
        setUserTel(e.target.value);

        if(!telRegEx.test(telNow)) {
            setTelError('전화번호 형식이 맞지 않아요 다시 입력해주세요ㅠㅠ')
            setIsTel(false)
        } else {
            setTelError('사용 가능한 전화번호 형식이에요 : )')
            setIsTel(true);

        }
    }




    // 검색한 주소
    const handleInput = (e) => {
        setUserAddr({
            // ... => setUserAddr에 다 담겠다는 의미
            // ...userAddr,
            ...myInfo.addr,
            [e.target.name]:e.target.value,
        })
        console.log(e.target.name);
    }

    


    // 취소하기 버튼 누를 시 현재 페이지 새로고침
    const handleButtonClick = () => {
        window.location.reload();
      };


    // 변경하기 함수
    const customUpdate = async () => {
            try {
            const rsp = await AxiosApi.customUpdateInfo(
                myInfo.name, 
                myInfo.id, 
                userPwd, 
                userTel, // 전화번호값만 새로 입력한 셋팅값으로 지정함
                myInfo.email, 
                myInfo.addr
            );
                console.log(rsp.data);
             } catch(e) {
                console.log(e);
                }
            };

        console.log(userPwd);


    return(
        <>
            <MainContainer> 
                <Titlebox>
                <MypageEdTitle><h1>회원정보수정</h1></MypageEdTitle>
                <br /><br />
                </Titlebox>
            <div className="coverpage">
                <CustomInfo>
                <div className="area">
                <label htmlFor="name">이름</label>
                <TextField 
                    style={{ width: '350px' }}
                    label="이름"  
                    variant="filled"
                    value={myInfo.name}
                    size= "small"
                    InputLabelProps={{ 
                        shrink: true,
                    }}
                    disabled={true}
                    />       
                </div>

                 <div className="area">
                    <label htmlFor="id">아이디</label>
                    <TextField 
                    style={{ width: '350px' }}
                    label="아이디"  
                    variant="filled"
                    value={myInfo.id}
                    size= "small"
                    InputLabelProps={{ 
                        shrink: true,
                    }}
                    disabled={true}
                    />      
                </div>

                <div className="area">
                    <label htmlFor="password">새 비밀번호</label>
                    <TextField 
                    style={{ width: '350px' }}
                    label="새 비밀번호" 
                    type="password" 
                    variant="filled"
                    value={userPwd}
                    onChange={onChangeUserPw}
                    error={userPwd.length > 0 && !isPwd}
                    helperText={userPwd.length > 0 && !isPwd ? pwdError : "" }
                    size= "small"
                     />       
                    <button className="enable-btn" onClick={customUpdate} >변경하기</button>
                </div>

                <div className="area">
                    <label htmlFor="password">새 비밀번호 확인</label>
                    <TextField 
                    style={{ width: '350px' }}
                    label="새 비밀번호 확인" 
                    type="password" 
                    variant="filled"
                    value={userRePwd}
                    onChange={onChangeReUserPw}
                    error={userRePwd.length > 0 && !isRePwd}
                    helperText={userRePwd.length > 0 && !isPwd ? repwdError : "" }
                    size= "small"
                     />       

                </div>
                {/* <Input type="email" placeholder="이메일" value ={myInfo.tel} onChange={onChangeMail}/> */}



            
                <div className="area"> 
                    <label htmlFor="password">휴대폰번호</label>

                    <TextField 
                    style={{ width: '350px' }}
                    label="휴대폰번호" 
                    variant="filled"
                    value={userTel}
                    size= "small"
                    InputLabelProps={{ 
                        shrink: true,
                    }}
                    onChange={onChangeUserTel}
                    disabled={false}
                    />
                    <button className="enable-btn" onClick={customUpdate} disabled={false}>변경하기</button>
                </div> 
                

                    <div className="area">
                    <label htmlFor="password">이메일주소</label>
                    <TextField 
                    style={{ width: '350px' }}
                    label="이메일주소"
                    variant="filled"
                    value={myInfo.email}
                    size= "small"
                    InputLabelProps={{ 
                        shrink: true,
                    }}
                    disabled={true}
                    />

                    <button className="enable-btn" onClick={customUpdate}>변경하기</button>
                    </div>

                <div className="area">
                    <label htmlFor="password">우편주소</label>
                    <TextField 
                    style={{ width: '350px' }}
                    label="우편주소" 
                    variant="filled"
                    value={myInfo.addr}
                    size= "small"
                    onChange={handleInput}
                    InputLabelProps={{ 
                        shrink: true,
                    }}
                    disabled={false}
                    />    
                </div> 
                        <StyledButton className="addrBtn" onClick={handleComplete}>주소찾기</StyledButton>
                        {/* {popup && <PostCode addr={userAddr} setAddr={myInfo.setAddr} />}   */}
                        {popup && <PostCode addr={myInfo.addr} setAddr={myInfo.setUserAddr} />}  
                        <button className="addrUpdate" onClick={customUpdate} >변경하기</button>
                
               <Modal open={modalOpen} close={closeModal} header="고객정보수정">수정이 완료되었습니다</Modal>
             </CustomInfo>
             <div className="btnarea">
                <Link to = "/CustomDelete"><Button1 className="deletebtn">탈퇴하기</Button1></Link> 
            </div>
            </div>
            </MainContainer>
        </>
    );
}
export default MypageEdit;
