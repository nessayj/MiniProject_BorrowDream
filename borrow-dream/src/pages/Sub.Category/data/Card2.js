import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Main = styled.div`
  
  .card {
    border: none;
    height: 80%;
    width: 250px;
    margin-top: 80px;
    font-family:'bitbit';
  }

  .cardImg {
    
    object-fit: cover;
    transition: all 0.1s ease-in-out;
    cursor: pointer;
  }

  .cardImg:hover {
    transform: scale(0.9);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }

  .card-body {
    padding: 1.25rem;
  }

  .card-title {
    margin-bottom: 0.75rem;
    font-weight: bold;
    font-size: 1.3rem;
  }

  .price-text {
    font-size: 1.25rem;
    color: #f57224;
    font-weight: bold;
    margin-top: 1rem;
  }
  
`;

const Card2 = ({ categoryNo }) => {
  const [sortBy, setSortBy] = useState('pno');

  
  return (
    
    <Main>
      <main>
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            <Products categoryNo={categoryNo} sortBy={sortBy} />
          </div>
        </div>
      </main>
    </Main>
  );
};

const Products = ({ categoryNo, sortBy }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8111/api/product/category/${categoryNo}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [categoryNo]);






  // 가격순, 상품번호순 정렬 기능 구현
    const sortedProducts = products.sort((a, b) => {
      if (sortBy === 'pprice') {
        return a.pprice - b.pprice;
      } else if (sortBy === 'pno') {
        return a.pno - b.pno;
      } else {
        return 0;
      }
    });

  if (!sortedProducts) return null;

  const onClickPd = (pno) => {
    const data = sortedProducts.filter(function(e){
      return e.pno === pno;
    });
    navigate(`/product/${pno}`, {state: data[0]});
  }





  return (
    <>
      {sortedProducts?.map(product => (
        <div className="col" key={product.pno} onClick={()=>onClickPd(product.pno)}>
          <div className="card shadow-sm">
            <img  className="cardImg" src={product.pimg} alt={product.pname} />
            <div className="card-body">
              <h5 className="card-title">{product.pname}</h5>
              <p className="price-text">{product.pprice}원/일</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default Card2;
