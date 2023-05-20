import { useLocation } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import CalendarComponent from './Calendar';


const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

const Description = styled.p`
  font-size: 1.5rem;
  font-weight: 900;
  color: #555;
  text-align: justify;
  text-align: left;
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
  border: none;
  color: #fff;
  width: 230px;
  cursor: pointer;
  &.buy {
    background-color: #fca311;
    margin-right: 1rem;
  }
  &.cart {
    background-color: #14213d;
  }
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
            <fieldset>
              <Description>{product.pdescription}</Description>
            </fieldset>
     
            <CalendarContainer>
          <CalendarComponent />
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
    </>
  );
};

export default ProductDetail;
