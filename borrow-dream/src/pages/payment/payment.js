import { useState, useContext, useEffect } from "react";
import AxiosApi from "../../api/axiosapi";
import PaymentModal from "./paymentModal";
import OrderApi from "../../api/orderApi";
import CartApi from "../../api/cartApi";
import styled from "styled-components";
import {SiStarship} from "react-icons/si"
import { Link, Navigate, useNavigate } from "react-router-dom";


const Wrap = styled.div`
    width: 1000px;
    height: 100vh;
    background-color: white;
    margin: 0 auto;
    border-radius: 10px;
    font-family:'bitbit';


    .title {
        display: flex;
        align-items: center;
        font-size: 30px;
        font-weight: 600;
        color: #1a5d98;
        h2 {margin-left: 10px; font-size: 35px; margin-top: 35px; font-weight: 500; color: #135CD2; }
    }   

    .info-container{
        > h3{
            font-size: 2rem;
            color: #7F8EEF;
        }
        >h4{
            color: #7F8EEF;
            font-size: 1.5rem;
        }
        > ul > li > span {
            font-size: 1.2rem;
            color: #135CD2;
        }

    }

    .mainbutton-container {
        margin-top: 20px;
        height: 55px;
        text-align: right;
        .btn {
            margin-left: 10px;
            cursor: pointer;
            font-weight: 600;
            float: right;
            font-size: 16px;
            font-weight: lighter;
            padding: 8px 35px;
            border-radius: 25px;
            background-color: #135CD2;
            color: white;
            border: none;
            transition: all .1s ease-in;
            &:hover {background-color:  #a1f7d9; color: #135CD2;}
        }
    }

    table{
      font-family: 'bitbit';
    clear: both;
    min-width: 920px;
    width: 100%;
    text-align: center;
    background: #fff;
    border-collapse: collapse; 
        width:100%;
        background-color: #4555AE;
        border-bottom: solid 1px #bbb;
        text-align: center;
        th {color: white; border-top: solid 1px #4555AE; border-bottom: 1px solid #bbb; background-color: #7F8EEF;}
      
        td {padding: 10px; background-color: white; border-left: solid 1px #bbb;  color: #135CD2;}
        td:first-child {border-left: none; width: 200px;}
        td:nth-child(2) {width: 10rem;}  
        td:nth-child(3) {width: 10rem;}  
        td:nth-child(4) {width: 10rem;
        
          
          align-items: center;
          input {
            text-align: center;
            width: 3rem;
          }
        }
        td:nth-child(5) {width: 10rem}
    }

`;





export const Payment = ( { cart, setCart, orderList, setOrderList, checkedItems, setCheckedItems, convertPrice, movedItemCnt, setMovedItemCount }) => {
    const navigate = useNavigate();
    const Id = window.localStorage.getItem("Id");
    const [userInfo, setuserInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    console.log(userInfo);
    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    const sumPrice = checkedItems.reduce((acc, item) => acc + item.tprice, 0);
    useEffect(() => {
        const cusData = async () => {
            setLoading(true);
            try {
                const response = await AxiosApi.customEdit(Id);
                setuserInfo(response.data);
                console.log(userInfo);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        cusData();
    }, [Id]);
    const payInfo = async (id) => {
        try {
            // 주문 내역으로 저장할 장바구니 아이템 가져오기
            const selectedItem = checkedItems.find(item => item.id === id);
            if (!selectedItem) {
              console.log('장바구니에서 선택된 아이템을 찾을 수 없습니다.');
              return;
            }
            // 주문 내역 저장 요청
            const info = await OrderApi.orderInsert(Id);
            console.log(orderList); // 업데이트된 주문 내역 확인

            // 모달 열기
            setModalOpen(true);
            selectListDelete(checkedItems.bk_pname);
            setCheckedItems([]);
            } catch (e) {
            console.log(e);
            }
    };
    // 결제한 상품 장바구니에서 삭제
    const selectListDelete = async (id) => {
        for (const item of checkedItems) {
            await CartApi.deleteCartItem(Id, item.bk_pname);
            const newCart = cart.filter((item) => item.bk_pname !== id);
            setCart(newCart);
        }
    }
    // 취소하기
    const onClickToCart = () => {
        navigate("/cart/" + Id);
    }

    if(loading) {
        return <h2>조회중..</h2>
    }
    return (
        <Wrap>
        <div>
            <div className="title">
            <SiStarship size="50" color="7F8EEF" /><h2>결제정보</h2>
             </div>
            
            <div className="info-container">
                <h3>배송 정보</h3>
                <h4>배송정보를 확인하세요.</h4>
                <ul>
                    <li><span>이름 / 연락처</span>
                    <div>
                        <ul>
                            <li>{userInfo.name}</li>
                            <li>{userInfo.tel}</li>
                        </ul>
                    </div>
                    </li>
                    <li><span>주소</span>
                    <div key={userInfo.id}>
                       {userInfo.addr} 
                    </div>
                    </li>
                </ul>
            </div>
            <div>
                
                <table>
                    <thead>
                        <tr>
                            <th scope="col">상품 정보</th>
                            <th scope="col">수량</th>
                            <th scope="col">렌트 기간</th>
                            <th scope="col">배송비</th>
                            <th scope="col">주문 금액</th>
                        </tr>
                    </thead>
                    <tbody>
    {checkedItems && checkedItems.map((list) => (
        <tr key={list.bk_num}>
            <td>
                <div>이미지</div>
                <div><strong>[제조사]</strong> a태그 + {list.bk_pname}</div>
            </td>
            <td>
                <div>{list.quantity}개</div>
            </td>
            <td>
                {list.borrow1} ~ {list.borrow2}
            </td>
            <td>무료</td>
            <td>{convertPrice(list.tprice)}원</td>
        </tr>
    ))}
        </tbody>
                </table>
                <div className="mainbutton-container">
               <button className="btn" onClick={onClickToCart}>취소하기</button>
                <button className="btn" onClick={() => payInfo(Id)}>{convertPrice(sumPrice)}원 결제하기</button>
                    <PaymentModal
                      open={openModal}
                      close={closeModal} 
                      type={true}
                      children="주문이 완료되었습니다."
                      orderList={orderList}
                      setOrderList={setOrderList}
                      cart={cart}
                      modalOpen={modalOpen}
                    >
                      주문이 완료 되었습니다.
                    </PaymentModal>

                </div>
            </div>
        </div>
        </Wrap>
    )
}