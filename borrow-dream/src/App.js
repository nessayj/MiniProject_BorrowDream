  import React,{useState} from 'react';
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
  import Basket from './pages/basket/basket';
  import Order from './pages/order/order';
  import { Payment } from './pages/payment/payment';
  import { Deliver } from './pages/deliver/deliver';
  import ProductDetail from './pages/Sub.Category/data/ProductDetail';
  import Devices from './pages/Sub.Category/Devices';
  import Travel from './pages/Sub.Category/Travel';
  import Hiking_bag from './pages/Sub.Category/Hiking_bag'
  import Hiking_boots from './pages/Sub.Category/Hiking_boots';
  import Hiking_clothes from './pages/Sub.Category/Hiking_clothes';
  import Hiking_other from './pages/Sub.Category/Hiking_other';
  import Swimsuit from './pages/Sub.Category/Swimsuit';
  import Snorkel from './pages/Sub.Category/Snorkel';
  import Fillper from './pages/Sub.Category/Fillper';
  import Water_other from './pages/Sub.Category/Water_other';
  import Tent from './pages/Sub.Category/Tent';
  import Sleep from './pages/Sub.Category/Sleep';
  import Cooking from './pages/Sub.Category/Cooking';
  import Camping_other from './pages/Sub.Category/Camping_other';
  import Ct_pages from './pages/Sub.Category/data/Ct_pages';
  import MainBody from './pages/main_body';
  import ViewMsgList from './pages/message/ReceiveMsgView';
import SendMsgList from './pages/message/SendmsgView';
// 주소추가


  function App() {
    const [cart, setCart] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [checkedAll, setCheckedAll] = useState(false); // 전체 선택 체크박스 상태
    const [checkedItems, setCheckedItems] = useState([]); // 개별 선택 체크박스 상태
    const convertPrice = (price) => {
      if (price === undefined || isNaN(price)) return '';
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      
    };
    
    
    return (
        <UserStore>
        <Router>
        <Head/>
          <Routes>
            {/* 메인 */}
            <Route path='/' element={<MainBody/>}></Route>
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

            {/* 쪽지 */}
            <Route path="/sendList/:no" element={<SendMsgList/>}/>           
            <Route path="/receiverList/:no" element={<ViewMsgList/>}/>


            {/* 상품페이지 */}
            <Route path='/Ct_pages' element={<Ct_pages/>} />
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

            {/* 장바구니 */}
            <Route path='/cart' element= {<Basket cart={cart} setCart={setCart} checkedAll={checkedAll} setCheckedAll={setCheckedAll} checkedItems={checkedItems} setCheckedItems={setCheckedItems} convertPrice={convertPrice}/>} />
            {/* 주문내역 */}
            <Route path='/order' element={<Order orderList={orderList} setOrderList={setOrderList} convertPrice={convertPrice}/>} />
            {/* 결제정보 */}
            <Route path='/payment' element={<Payment cart={cart} setCart={setCart} orderList={orderList} setOrderList={setOrderList} checkedItems={checkedItems} setCheckedItems={setCheckedItems} convertPrice={convertPrice} />} />
            {/* 배송조회 */}
            <Route path='/deliver' element={<Deliver orderList={orderList}/>} />
          </Routes>
          <Footer/>
        </Router>
        </UserStore>
    );
  }

  export default App;
