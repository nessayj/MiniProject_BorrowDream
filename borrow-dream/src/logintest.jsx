// import React from "react";
// import styled from "styled-components";
// import { createGlobalStyle } from 'styled-components';
// import Header from "../pages/header";
// import Footer from "../pages/footer";

// const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }

//   .body {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 100vw;
//     height: 100vh;
//   }
// `;

// const MainContainer = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   height: 80vh;
//   width: 30vw;
//   background: rgba(255, 255, 255, 0.15);
//   box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
//   backdrop-filter: blur(8.5px);
//   -webkit-backdrop-filter: blur(8.5px);
//   border-radius: 10px;
//   color: #ffffff;
//   text-transform: uppercase;
//   letter-spacing: 0.4rem;

//   * {
//     margin:0px;
//     padding:0px;
//     box-sizing: border-box;
//   }

//   .body {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 100vw;
//     height: 100vh;
//   }

//   /* @media only screen and (max-width: 320px) {
//     width: 80vw;
//     height: 90vh;
//     hr {
//       margin-bottom: 0.3rem;
//     }
//     h4 {
//       font-size: small;
//     }
//   }
//   @media only screen and (min-width: 360px) {
//     width: 80vw;
//     height: 90vh;
//     h4 {
//       font-size: small;
//     }
//   }
//   @media only screen and (min-width: 411px) {
//     width: 80vw;
//     height: 90vh;
//   }

//   @media only screen and (min-width: 768px) {
//     width: 80vw;
//     height: 80vh;
//   }
//   @media only screen and (min-width: 1024px) {
//     width: 70vw;
//     height: 50vh;
//   }
//   @media only screen and (min-width: 1280px) {
//     width: 30vw;
//     height: 80vh;
//   } */
// `;

// /*const WelcomeText = styled.h2`
//   margin: 3rem 0 2rem 0;
// `;

// const InputContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   align-items: center;
//   height: 20%;
//   width: 100%;
// `;

// const ButtonContainer = styled.div`
//   margin: 1rem 0 2rem 0;
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const LoginWith = styled.h5`
//   cursor: pointer;
// `;

// const HorizontalRule = styled.hr`
//   width: 90%;
//   height: 0.3rem;
//   border-radius: 0.8rem;
//   border: none;
//   background: linear-gradient(to right, #14163c 0%, #03217b 79%);
//   background-color: #ebd0d0;
//   margin: 1.5rem 0 1rem 0;
//   backdrop-filter: blur(25px);
// `;

// const IconsContainer = styled.div`
//   display: flex;
//   justify-content: space-evenly;
//   margin: 2rem 0 3rem 0;
//   width: 80%;
// `;

// const ForgotPassword = styled.h4`
//   cursor: pointer;
// `;

// const StyleInput = styled.input`
//   background: rgba(255, 255, 255, 0.15);
//   box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
//   border-radius: 2rem;
//   width: 80%;
//   height: 3rem;
//   padding: 1rem;
//   border: none;
//   outline: none;
//   color: #3c354e;
//   font-size: 1rem;
//   font-weight: bold;
//   &:focus {
//     display: inline-block;
//     box-shadow: 0 0 0 0.2rem #b9abe0;
//     backdrop-filter: blur(12rem);
//     border-radius: 2rem;
//   }
//   &::placeholder {
//     color: #b9abe099;
//     font-weight: 100;
//     font-size: 1rem;
//   }
// `;

// const StyleButton = styled.button`
//   background: linear-gradient(to right, #14163c 0%, #03217b 79%);
//   text-transform: uppercase;
//   letter-spacing: 0.2rem;
//   width: 65%;
//   height: 3rem;
//   border: none;
//   color: white;
//   border-radius: 2rem;
//   cursor: pointer;
// `;

// const StyledIcon = styled.div`
//   height: 3.5rem;
//   width: 3.5rem;
//   background: ${(props) => props.background};
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 4rem;
//   color: white;
//   cursor: pointer;
//   svg {
//     width: 1.5rem;
//     height: 1.5rem;
//   }
// `; */

// const Logintest = () => {

//     return(
//         <div className='No-Nav-Container'>
//         <CustomModal state={state} changeState={onChangeState}/>
//       <div className="Login-Container">
//           <div className="Login-Main-Header">
//               <h1>로그인</h1>
//           </div>
         
//           {/* 아이디 */}
//           <div className='Login-Body'>
//             <div className="Login-Id">
//               <img src={person} />
//               <input className="Login-input" type="text" placeholder="Enter ID" value={id} onKeyDown={EnterPress} onChange={onChangeId} required />
//             </div>
//             {/* 비밀번호 */}
            
//             <div className="Login-PW">
//               <img className="Login-input-img" src={lock} />
//               <input className="Login-input" type="password" placeholder="Enter Password" onKeyDown={EnterPress} value={pwd} onChange={onChangePwd} />
//             </div>
//           <div className='Auto-Login' >
//             <label>
//               <input className='Auto-Login-input' type="checkbox" id='checkbox' onClick={onClickAutologin} />
//               <span className='Auto-Login-text'>자동로그인</span>
//             </label>
//             <span>|</span>
//             <a href="/FindInfo">아이디/비밀번호 찾기</a>
//           </div>
//         </div>
//           <motion.button className="Login-botton" type="submit" onClick={onClickLogin}>로그인</motion.button>
//           <div className='Login-kakao'>
//             <a  className='login-logo'>
//               <a href={kakao_Auth_Url}>
//                 <div className='img-circle'>
//                 <img className='kakao-img'style={{width:"4rem",height:"4rem",objectFit:"cover"}} src={kakao} />
//                 </div>
//               </a>
//             카카오 로그인
//               </a>
//               <a  className='login-logo'>
//             <div className='img-circle'>
//             <img className='google-img' src={google} onClick={signInWithGoogle} style={{width:"2rem",height:"2rem",objectFit:"cover"}} >
//               </img>
//             </div>
//             구글 로그인
//               </a>
//            </div>
//           <div className="Login-footer">
//             가입하고 친구를 만들어봐요! <a href="/signup">  회원가입</a>
//           </div>
//         </div>
//       </div>
//     );
//   }

// export default Logintest;
