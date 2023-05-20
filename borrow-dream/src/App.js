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

function App() {
  
  return (
      <UserStore>
      <Router>
      <Head/>
        <Routes>
    
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


        </Routes>
        <Footer/>
      </Router>
      </UserStore>
  );
}

export default App;
