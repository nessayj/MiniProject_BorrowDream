import React, { useState } from 'react';
import { storage } from '../data/firebase';
import styled from 'styled-components';

const UploadButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const ImageUploader = ({ onChange }) => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      console.log('File uploaded successfully!');
      fileRef.getDownloadURL().then((url) => {
        console.log("저장경로 확인 : " + url);
        setUrl(url);
        onChange(url); // 선택한 이미지 URL을 상위 컴포넌트로 전달
      });
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <UploadButton onClick={handleUploadClick}>Upload</UploadButton>
      {url && <img src={url} alt="uploaded" />}
    </div>
  );
}

export default ImageUploader;
