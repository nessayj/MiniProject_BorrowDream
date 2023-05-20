import React, { useEffect, useState } from 'react';
import DaumPostcode from "react-daum-postcode";
// import { useContext, UserContext } from "../context/userInfo";
import { css } from 'styled-components';


const PostCode = (props) => {

	// 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  // const context = useContext(UserContext);
  // const {setAddr} = context; 

  console.log("PostCode Call");

    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') { // 도로명주소
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data);
        console.log(fullAddress);
        console.log(data.zonecode);

        props.setAddr({
          ...props.addr,
          address:fullAddress,
          // address: JSON.stringify(fullAddress),
          // address: Object.keys(fullAddress).map((key) => fullAddress[key]),
        })
    
    }
  
    return(
            // <DaumPostcode onComplete={handlePostCode} />
            <DaumPostcode className='postmodal'
            autoClose 
            onComplete={handlePostCode} />
    );
}
 
export default PostCode;

//R , data, zonecode 는 api고유 명령어.


