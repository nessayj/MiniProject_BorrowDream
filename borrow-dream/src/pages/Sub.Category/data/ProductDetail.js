import { useLocation } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import CalendarComponent from './Calendar';


const Image2 = styled.img`
  width: 900px;
  margin: auto;
  margin-top: 10px;
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
  margin-bottom: 1rem;
  text-align: center;
`;


const Price = styled.p`
  display: flex;
  align-items: center;
   font-weight: 900;
   font-size: 20px;
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

const ProductDetail = () => {
  const calender = new CalendarComponent();
  const location = useLocation();
  const product = location.state;
  console.log(location);

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
            <CalendarComponent productPrice={product.pprice} />
        </CalendarContainer>


            <Price>
              <PriceLabel>가격:</PriceLabel>
              {product.pprice}원
            </Price>

            
            <ButtonContainer>
              <Button className='buy' onClick={calender.onRangeChange}>구매하기</Button>
              <Button className='cart'>장바구니</Button>
            </ButtonContainer>
          </ContentContainer>
        </ProductContainer>

      </Main>
          <Image2 src={product.pdescription} />

    </>
  );
};

export default ProductDetail;