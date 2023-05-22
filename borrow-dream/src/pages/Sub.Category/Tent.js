import Card from "./data/Card";
import React from "react";
import styled from "styled-components";
import { SiStarship } from "react-icons/si";




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
const Tent = () => {

    return (
      <>
      <Heading1>
        <SiStarship size="30" color="7F8EEF" />
        텐트
      </Heading1>
      <Card categoryNo={4001} />
      <div className="goTop">
       
      </div>
    </>
  );
};

export default Tent;
