
import Card from "./data/Card";

import React from "react";
import styled from "styled-components";

const Button = styled.button`
font-family:'bitbit';
margin-left: 160px;
  width: 7rem;
  background-color: #135CD2;
  color: white;
  height: 3rem;
  border: none;
  transition: all .1s ease-in;
  border-radius: 0.7rem;
  &:hover {
    background-color: #a1f7d9;
    color: #135CD2;
  }
  font-size: 1.2rem;
`;
const Heading1 = styled.h1`
  font-size: 2rem;
  color: #135CD2;
  margin-bottom: 1rem;
  font-family:'bitbit';
  margin-left: 50px;
`;


const Carrier = () => {

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Heading1>카메라</Heading1>
      <Card categoryNo={1002} />
      <div className="goTop">
        <Button onClick={goToTop}>맨위로</Button>
      </div>
    </>
  );
};

export default Carrier;