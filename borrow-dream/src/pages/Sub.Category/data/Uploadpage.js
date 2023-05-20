import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ImageUploader from './ImageUploader';
import ProductApi from '../../../api/ProductApi';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Heading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;  
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const UploadPage = () => {
  const [regData, setRegData] = useState({
    CATEGORY_NO: '5000',
    P_NO: '',
    P_NAME: '',
    P_PRICE: '',
    P_img: '',
    P_DESCRIPTION: '',
    P_QUANTITY: '',
  });

  useEffect(() => {
    const lastProductNo = parseInt(localStorage.getItem('lastProductNo') || '5000');
    const newProductNo = lastProductNo + 1;
    setRegData((prevData) => ({
      ...prevData,
      P_NO: String(newProductNo),
    }));
    localStorage.setItem('lastProductNo', String(newProductNo));
  }, []);

  const handleImageChange = (image) => {
    setRegData((prevData) => ({
      ...prevData,
      P_img: image,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpload = async () => {
    try {
      const isRegistered = await ProductApi.registerProduct(
        regData.CATEGORY_NO,
        regData.P_NO,
        regData.P_NAME,
        regData.P_PRICE,
        regData.P_img,
        regData.P_DESCRIPTION,
        regData.P_QUANTITY
      );
      if (isRegistered) {
        console.log('상품 등록 성공');
      } else {
        console.log('상품 등록 실패');
      }
    } catch (error) {
      console.error('상품 등록 에러:', error);
    }
  };

  return (
    <Container>
      <Heading>빌려드림 등록</Heading>
      <div>
        <Input
          type="hidden"
          name="CATEGORY_NO"
          value="5000"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label>
          상품 번호:
          <Input
            type="text"
            name="P_NO"
            value={regData.P_NO}
            disabled
            onChange={handleInputChange}
          />
        </Label>
      </div>
      <div>
        <Label>
          상품 이름:
          <Input
            type="text"
            name="P_NAME"
            value={regData.P_NAME}
            onChange={handleInputChange}
          />
        </Label>
      </div>
      <div>
        <Label>
          상품 가격:
          <Input
            type="text"
            name="P_PRICE"
            value={regData.P_PRICE}
            onChange={handleInputChange}
          />
        </Label>
      </div>
      <div>
        <Label>
          상품 사진:
          <ImageUploader onChange={handleImageChange} />
        </Label>
      </div>
      <div>
        <Label>
          상품 상세 설명:
          <TextArea
            name="P_DESCRIPTION"
            value={regData.P_DESCRIPTION}
            onChange={handleInputChange}
          ></TextArea>
        </Label>
      </div>
      <div>
        <Label>
          수량:
          <Input
            type="text"
            name="P_QUANTITY"
            value={regData.P_QUANTITY}
            onChange={handleInputChange}
          />
        </Label>
      </div>
      <Button onClick={handleUpload}>등록하기</Button>
    </Container>
  );
};

export default UploadPage;
