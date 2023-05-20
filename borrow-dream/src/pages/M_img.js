import styled from "styled-components";
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


import "bootstrap"
import friday from "../images/배너/블랙프라이데이.png";
import summer from "../images/배너/미리여름.png";
import summer2 from "../images/배너/여름옷.png";





/**
 *  ------------------- 스타일드 컴포넌트 -----------------
 */

const ImageContainer = styled.div`
    position: relative;
    height: 441px;
    z-index: -1;

`;



/**
 *  ------------------------- 컴포넌트 -----------------------
 */

const OnClickCategory = (cmd) => {

    if(cmd ==="move_ct") window.localStorage.setItem("category","move_ct");
    else if(cmd === "move_ct1") window.localStorage.setItem("category","move_ct1");
    else window.localStorage.setItem("category","move_ct3");


    window.location.replace('/ItemList');

}





const M_img = () => {

    window.localStorage.setItem('category','ALL');
    return(
        <>

        <Carousel fade>
        <Carousel.Item>
     
            <ImageContainer>
                <img
                style={{ height: "500px" }}
                className="d-block w-100"
                src={friday}
                alt="First slide"
                />

              

            </ImageContainer>
      
        </Carousel.Item>
        <Carousel.Item>
            <ImageContainer>
                <img
                style={{ height: "500px" }}
                className="d-block w-100"
                src={summer}
                alt="Second slide"
                />

              

            </ImageContainer>
        </Carousel.Item>
        <Carousel.Item>
        <ImageContainer>
                <img
                style={{ height: "500px" }}
                className="d-block w-100"
                src={summer2}
                alt="Second slide"
                />

                {/* <ImageText3
                    onClick={()=>OnClickCategory("move_ct3")}
                >
                    <BrandName>바다</BrandName>
                    <Caption>click here to Category</Caption>
                </ImageText3> */}

            </ImageContainer>
        </Carousel.Item>
        </Carousel>

        &nbsp;

     

        &nbsp;

        </>
    )
}
export default M_img;