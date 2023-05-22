import Card from "./data/Card";
import React from "react";
import styled from "styled-components";
import { SiStarship } from "react-icons/si";

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
  font-family: 'bitbit';
  font-weight: 600;
  font-size: 2rem;
  color: #135CD2;
  margin-bottom: 2rem;
  margin-left: 11rem;
  display: flex;
  align-items: center;
`;

const Devices = () => {

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Heading1><SiStarship size="30" color="7F8EEF" />전자기기</Heading1>
      <Card categoryNo={1003} />
      <div className="goTop">
        <Button onClick={goToTop}>맨위로</Button>
      </div>
    </>
  );
};


export default Devices;
