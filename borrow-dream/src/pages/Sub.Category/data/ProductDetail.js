import { useLocation } from 'react-router-dom';
import React, {useState} from 'react';
import styled from 'styled-components';
import CalendarComponent from './Calendar';
import CartApi from '../../../api/cartApi';


const Image2 = styled.img`
  width: 900px;
  margin: auto;
  margin-top: 100px;
`

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family:'bitbit';
`;

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  margin-right: 2rem;
`;

const Image = styled.img`
  width: 480px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 30px;
  text-align: center;
`;


const Price = styled.p`
  display: flex;
  align-items: center;
   font-weight: 900;
   font-size: 20px;
   position: relative;
   bottom: 460px;
   left: 80px;
`;

const PriceLabel = styled.span`
  margin-right: 0.5rem;
   font-weight: 900;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`

  margin-top: 2em;
  padding: 0.5rem 1rem;
  border-radius: 0.7rem;
  height: 3rem;
  border: none;
  color: white;
  background-color: #135CD2;
  width: 15rem;
  margin-right: 12px;
  transition: all .1s ease-in;
  &:hover{background-color:  #a1f7d9; color: #135CD2;}
        font-size: 1.2rem;
  cursor: pointer;
 

`;


const CalendarContainer = styled.div`
  margin-left: 2rem;
  position: relative;
  margin-top: 10px;
`;

const ProductDetail = ( { cart, setCart, convertPrice }) => {
  const calender = new CalendarComponent();
  const location = useLocation();
  const product = location.state;
  const [pdStartDate, setPdStartDate] = useState('');
  const [pdEndDate, setPdEndDate] = useState('');
  const [dayCnt, setDayCnt] = useState('');
  const wlId = window.localStorage.getItem("Id");
  console.log(location);
  console.log(pdStartDate);
  console.log(pdEndDate);
  console.log(dayCnt);

  const detailInfo = async(id) => {
    try {
      // 장바구니 저장 요청
      console.log("detailInfo 진입");
      console.log(id);
      console.log(product.pname);
      console.log(pdStartDate);
      console.log(pdEndDate);
      const basketInsert = await CartApi.cartInsert(id, product.pname, pdStartDate, pdEndDate, dayCnt)
      setCart(basketInsert.data);
      console.log(basketInsert.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (!product) return null;

  return (
    <>
      <Main>
        <ProductContainer>
          <ImageContainer>
            <Image src={product.pimg} alt={product.pname} />
          </ImageContainer>   
          <ContentContainer>
            <Title>{product.pname}</Title>

     
            <CalendarContainer>
            <CalendarComponent productPrice={convertPrice(product.pprice)}  pdStartDate={pdStartDate} setPdStartDate={setPdStartDate} pdEndDate={pdEndDate} setPdEndDate={setPdEndDate} dayCnt={dayCnt} setDayCnt={setDayCnt}/>
            </CalendarContainer>


            <Price>
              <PriceLabel>가격:</PriceLabel>
              {convertPrice(product.pprice)}원
            </Price>

            
            <ButtonContainer>
              <Button className='buy' onClick={calender.onRangeChange}>구매하기</Button>
              <Button className='cart'onClick={() => detailInfo(wlId)}>장바구니</Button>
            </ButtonContainer>
          </ContentContainer>
        </ProductContainer>

      </Main>
          <Image2 src={product.pdescription} />

    </>
  );
};

export default ProductDetail;