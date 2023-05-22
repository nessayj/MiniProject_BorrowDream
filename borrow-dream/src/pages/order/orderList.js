import styled from "styled-components";
import {SiStarship} from "react-icons/si"
import { Link } from "react-router-dom";

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





const OrderInfo = ({orderList, convertPrice}) => {
  console.log(orderList);
  return (
    <Wrap>
      <div className="title">
      <SiStarship size="50" color="7F8EEF" /><h2>주문내역</h2>
    </div>
      <table>
        <thead>
        <tr>
          <th scope='col'>상품정보</th>
          <th scope='col'>주문일자</th>
          <th scope='col'>주문번호</th>
          <th scope='col'>주문금액</th>
        </tr>
        </thead>
        <tbody>
        {orderList && orderList.map((list) => (
          <tr key={list.od_num}>
            <td><img src={list.img} alt={list.od_pname} /><br/>{list.od_pname}<br/>{list.borrow1} - {list.borrow2}</td>
            <td>{list.od_date}</td>
            <td>{list.od_num}</td>
            <td>{convertPrice(list.od_tPrice)}원<br/>수량{list.od_quantity}개</td>
          </tr>
        ))}
        </tbody>
      </table>
      <div className='mainbutton-container'>
      <Link to="/Mypage"><button className="btn">마이페이지</button></Link>
      <button className="btn">후기작성</button>
      </div>
      </Wrap>
  );
};

export default OrderInfo;
