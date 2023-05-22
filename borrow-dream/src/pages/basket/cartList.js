import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/userInfo';
import CartApi from '../../api/cartApi';
import {SiStarship } from "react-icons/si";

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

`;


const Table = styled.table`
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
        td:first-child {border-left: none; width: 70px;}
        td:nth-child(2) {width: 15rem;}  
        td:nth-child(3) {width: 10rem;}  
        td:nth-child(4) {width: 5rem;
          
          align-items: center;
          input {
            text-align: center;
            width: 3rem;
          }
        }
        
`;


const CartInfo = ({ cart, setCart, handleQuantity, handleRemove, convertPrice, checkedAll, setCheckedAll, checkedItems, setCheckedItems}) => {
  // const context = useContext(UserContext);
  // const { Id } = context;
  
  const getId = window.localStorage.getItem("Id");
  
  const handleCheckAll = (e) => {
    const { checked } = e.target;
    setCheckedAll(checked);
    if (checked) {
      // 장바구니에 있는 모든 상품을 선택
      setCheckedItems([...cart]);
    } else {
      // 모든 상품 선택 해제
      setCheckedItems([]);
    }
    
  };
  
  const handleCheckItem = (e, item) => {
    const { checked } = e.target;
    if (checked) {
      // 선택한 상품 추가
      setCheckedItems((prevItems) => [...prevItems, item]);
    } else {
      // 선택한 상품 제거
      setCheckedItems((prevItems) => prevItems.filter((prevItem) => prevItem.bk_pname !== item.bk_pname));
    }
    // 개별 체크 해제 시 전체 체크도 해제
  
  };
  const handleDeleteSelected = async () => {
    // 체크된 상품들의 정보를 배열로 만듦
    const selectedItems = cart.filter(item => checkedItems.includes(item));
    // 선택된 상품들을 장바구니에서 삭제
    for (const item of selectedItems) {
      await CartApi.deleteCartItem(getId, item.bk_pname);
    }
    // 선택 해제 및 삭제된 항목 제외한 장바구니 업데이트
    setCheckedAll(false);
    setCheckedItems([]);
    setCart(prevCart => prevCart.filter(item => !selectedItems.includes(item)));
    console.log(cart);
  };
  console.log("체크 항목 리스트");
  console.log(checkedItems);

  
  return (
    <Wrap>
    <div className="title">
      <SiStarship size="50" color="7F8EEF" /><h2>장바구니</h2>
    </div>
    <hr />
    <Table>
        {/* <colgroup>
        <col width="5%" />
        <col width="25%" />
        <col width="9%" />
        <col width="9%" />
        <col width="15%" />
        </colgroup> */}
        <thead> 
        <tr>
          <th scope='col'>
          <input type="checkbox" checked={checkedAll} onChange={handleCheckAll}/>
          </th>
          <th scope='col'>상품정보</th>
          <th scope='col'>상품금액</th>
          <th scope='col'>수량</th>
          <th scope='col'>주문금액</th>
          <th scope='col'>주문관리</th>
        </tr>
        </thead>
        <tbody>
        {cart && cart.map((list, index) => (
          <tr key={list.pname}>
            <td><input
                type="checkbox"
                checked={checkedItems.includes(list)}
                onChange={(e) => handleCheckItem(e, list)}
              /></td>
            <td ><div><div><img src={list.img} alt={list.bk_pname} /></div><div><strong>{list.bk_pname}</strong></div><div>{list.borrow1} ~ {list.borrow2} / {list.dayCnt}일</div></div></td>
            <td >{convertPrice(list.bk_price)}원</td>
            <td ><span style={{ display: 'flex', alignItems: 'center' }}><button className="minus_btn" onClick={()=> handleQuantity("minus", list.bk_pname)}>-</button><input type="text" value={list.quantity}/><button className="plus_btn" onClick={() => handleQuantity("plus", list.bk_pname)}>+</button></span></td>
            <td>{convertPrice(list.tprice)}원</td>
            <td> <button onClick={() => handleRemove(list.bk_pname)}>삭제하기</button> </td>
          </tr>
        ))}
        </tbody>
        </Table>
        <div className='mainbutton-container'>
        <button className="btn" onClick={handleDeleteSelected}>선택 삭제</button>
          <Link to='/payment' ><button className='btn'>결제하기</button></Link>
        </div>
      </Wrap>
  );
};
export default CartInfo;
