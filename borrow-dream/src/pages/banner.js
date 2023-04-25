import React from "react";
import styled from "styled-components";
import {Text} from "./style.js";


const BannerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 500px;
    margin: 0;
    background-color: #a1f7d9;
`;




const Foot = () => {
    return (
        <BannerContainer>
            <Text>여기는 배너</Text>
        </BannerContainer>
    );
}
export default Foot;