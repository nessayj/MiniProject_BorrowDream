import './App.css';
import Head from './pages/header';
import Footer from './pages/footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from './pages/InquiryBoard/Board';
import WriteInquiry from './pages/InquiryBoard/WriteInquiry';
import InquiryView from './pages/InquiryBoard/ViewInquiry';
import EditInquiry from './pages/InquiryBoard/EditInquiry';
import FAQ from './pages/QnABoard/qna';
import IntroCompany from './pages/service/IntroCom';
import ReviewList from './pages/reviewBoard/ReviewBoard';
import ViewReview from './pages/reviewBoard/ViewReview';
import UserStore from './context/userInfo';
import WriteReview from './pages/reviewBoard/WriteReview';
import EditReview from './pages/reviewBoard/EditReview';
import MyLentItemList from './pages/MyLentItem/MyList';
import LentWrite from './pages/MyLentItem/LentWrite';
import ViewLentItem from './pages/MyLentItem/ViewLentItem';
import Login from './pages/customInfo/login';
import Join from './pages/customInfo/join';
import Find from './pages/customInfo/find';
import FindPwd from './pages/customInfo/findpwd';
import Mypage from './pages/customInfo/mypage';
import MypageInfo from './pages/customInfo/mypageInfo';
import MypageEdit from './pages/customInfo/mypageEdit';
import CustomDelete from './pages/customInfo/customdelete';
import Carrier from './pages/Sub.Category/Carrier';
import Camera from './pages/Sub.Category/Camera';
function App() {
  
  return (
      <UserStore>
      <Router>
      <Head/>
        <Routes>
          {/* 로그인 */}
        <Route path="/Login" element={<Login/>}/>
          <Route path="/Join" element={<Join/>}/>
          <Route path="/Find" element={<Find/>}/>
          <Route path="/FindPwd" element={<FindPwd/>}/>
          <Route path="/Mypage" element={<Mypage/>}/>
          <Route path="/MypageInfo" element={<MypageInfo/>}/>
          <Route path="/MypageEdit" element={<MypageEdit/>}/>
          <Route path="/CustomDelete" element={<CustomDelete/>}/> 
          
    
          {/* 문의게시판 */}
          <Route path='/board-list' element={<Board/>}/>
          <Route path='/board-list/write' element={<WriteInquiry/>}/>
          <Route path="/board-list/write" element={<WriteInquiry/>}/>   
          <Route path="/board-list/inquiry-view/:no" element={<InquiryView/>}/>
          <Route path='/board-list/inquiry-edit/:no' element={<EditInquiry/>}/>
          {/* QnA게시판 */}
          <Route path="/qna-list" element={<FAQ/>}/>
          {/* 회사소개 */}
          <Route path="/service" element={<IntroCompany/>}/>
          {/* 리뷰게시판 */}
          <Route path="/review-list" element={<ReviewList/>}/>
          <Route path="/review-list/review/:no" element={<ViewReview/>}/>
          <Route path="/review-write" element={<WriteReview/>}/>
          <Route path="/review-edit/:no" element={<EditReview/>}/>
          
          {/* 내빌드 */}
          <Route path="/myLentItem" element={<MyLentItemList/>}/>
          <Route path="/myLentItem/write" element={<LentWrite/>}/>
          <Route path="/myLentItem/:no" element={<ViewLentItem/>}/>


          {/* 상품페이지 */}
          <Route path='/product/:pno' element={<ProductDetail />} />
            <Route path='/carrier' element={<Carrier/>}/>
          <Route path='/camera' element={<Camera/>}/>
          <Route path='/devices' element={<Devices/>}/>
          <Route path='/Travel' element={<Travel/>}/>
          {/* ----------- */}
          <Route path='/hiking_bag' element={<Hiking_bag/>}/>
          <Route path='/hiking_boots' element={<Hiking_boots/>}/>
          <Route path='/hiking_clothes' element={<Hiking_clothes/>}/>
          <Route path='/hiking_other' element={<Hiking_other/>}/>
          {/*  */}
          <Route path='/swimsuit' element={<Swimsuit/>}/>
          <Route path='/snorkel' element={<Snorkel/>}/>
          <Route path='/fillper' element={<Fillper/>}/>
          <Route path='/water_other' element={<Water_other/>}/>
          {/*  */}
          <Route path='/Tent' element={<Tent/>}/>
          <Route path='/Sleep' element={<Sleep/>}/>
          <Route path='/Cooking' element={<Cooking/>}/>
          <Route path='/camping_other' element={<Camping_other/>}/>

        </Routes>
        <Footer/>
      </Router>
      </UserStore>
  );
}

export default App;
