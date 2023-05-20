
import styled from "styled-components";
import {BsStars} from "react-icons/bs";
import Card from "./data/Card";






const PopularItems = styled.div`
font-family: 'TAEBAEKmilkyway';
font-size: 30px;
font-weight: bolder;

button{
background-color: orange;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 18px;
  padding: 10px;
  margin-top: 50px;
  cursor: pointer;
}
`;


const Borrow_Dream = () =>{
   
    return(
    <PopularItems>
    <span><BsStars size="50" color="pink"/>내빌드</span>
    <Card categoryNo={5000} />     
    <button>등록하기</button>
    </PopularItems>
    );
  }
  export default Borrow_Dream;