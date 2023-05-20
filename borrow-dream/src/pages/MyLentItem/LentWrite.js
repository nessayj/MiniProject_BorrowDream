import React, {useState} from "react";
import styled from "styled-components";
import { storage } from "../../firebase/firebase";
import Modal from "../../utill/Modal";
import {SiStarship} from "react-icons/si";
import { useNavigate } from "react-router-dom";
import BaroApi from "../../api/BaRoApi";


const Wrap = styled.div`
font-family: 'bitbit';
.title-box {
        margin-left: 20rem;
        display: flex;
        align-items: center;
        font-size: 30px;
        font-weight: 600;
        h2 {margin-left: 10px; font-size: 35px; margin-top: 35px; font-weight: 500; color: #135CD2; }
    } 
p{
    font-size: 1.2rem;
    margin-left: 20rem;
    color: #7F8EEF;
}
span{
    font-size: 1.2rem;
    margin: 0.3rem;
    color: gray;
}  
.addBoard-wrapper{
    margin-top: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    .uploader-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 15px;
    .img-wrapper {
        img {
        width: 400px;
        height: 400px;
        object-fit: cover;
        }
    }
    .upload-button {
        button {
        margin: 10px 5px;
        font-size: 1.1rem;
        margin: 0.3rem;
        right: 30px;
        cursor: pointer;
        padding: 8px 35px;
        border-radius: 25px;
        border: none;
        color: white;
        background-color: #135CD2;
        transition: all .1s ease-in;
        font-weight: 600;
        font-size: 16px;
        &:hover {background-color:  #a1f7d9; color: #135CD2;}
        }
    }
    }

    .textArea-wrapper {
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    .quantity-container {
        display: flex;
        .quantityInput {
            font-size: 0.7rem;
            width: 20%;
            height: 3rem;
        }
        .priceInput {
            font-size: 0.7rem;
            width: 80%;
            height: 3rem;
        }

    }
    .title {
        margin-bottom: 0.7rem;
    }
    .text {
        width: 600px;
        height: 400px;
    }

    input, textarea {
        &::-webkit-scrollbar {
        display: none;
        }
        resize: none;
        font-size: 18px;
        font-weight: 500;
        font-family: 'bitbit';
        border: 1px solid whitesmoke;
        border-radius: 5px;
        transition: border 1s;
        padding: 5px;
        box-sizing: border-box;

        &:focus {
        outline: none;
        border: 3px solid skyblue;
        }
    }
    }
}
    .button-container{
        float: right;
        margin-right: 13rem;
        margin-top: 1rem;
        button {
            display :inline-block;
            right: 30px;
            cursor: pointer;
            padding: 8px 35px;
            border-radius: 25px;
            border: none;
            color: white;
            background-color: #135CD2;
            transition: all .1s ease-in;
            font-weight: 600;
            font-size: 16px;
            &:hover {background-color:  #a1f7d9; color: #135CD2;}
        }
    }
`;



const LentWrite = () => {
    const getId = window.localStorage.getItem("Id");
    const navigate = useNavigate();

    // 모달창
    const [comment, setComment] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOption, setModalOption] = useState("");
    const closeModal = () => {
        setModalOpen(false);
    };

    // 이미지 미리보기
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    // 작성할 부분들 입력
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [howMany, setHowMany] = useState("");
    const [howMuch, setHowMuch] = useState("");

    // 올린 이미지 미리보기
    const previewImage = (e) => {
        e.preventDefault();
        const fileReader = new FileReader();
        if (e.target.files[0]) {
            fileReader.readAsDataURL(e.target.files[0]);
        }
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
            setImage({
                image_file: e.target.files[0],
                previewUrl: fileReader.result,
            });
        };
    };

    // 작성글 올리기
    const handleUploadAndSaveClick = async () => {
        if (content.length === 0 || title.length === 0) {
          setComment("제목과 내용을 입력해주세요");
          setModalOpen(true);
        } else {
          const storageRef = storage.ref();
          const fileRef = storageRef.child(image.image_file.name);
      
          try {
            await fileRef.put(image.image_file);
            const url = await fileRef.getDownloadURL();
      
            const resultNo = await BaroApi.writeLentItem(getId, url, title, content, howMany, howMuch);
            const linkNo = resultNo.data;
            if (linkNo) {
              setModalOpen(true);
              setModalOption('내빌드저장');
              setComment("상품이 성공적으로 올라갔습니다.");
            }
          } catch (error) {
            console.log(error);
          }
        }
      };    

    // 작성취소(목록으로 돌아가기)
    const onClickToList = () => {
        navigate(-1);
    }

    // 값 입력설정
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const onChangeQuantity = (e) => {
        setHowMany(e.target.value);
    }

    const onChangePrice = (e) => {
        setHowMuch(e.target.value);
    }
    



    return(
        <Wrap>
        <Modal open={modalOpen} close={closeModal} option={modalOption}>{comment}</Modal>
    <div className="title-box">
        <SiStarship size="50" color="7F8EEF" /><h2>내가 빌려 DREAM</h2>
    </div>
    <p>가격책정은 하루 기준으로 부탁드려요!</p>
    <div className="addBoard-wrapper">
    <div className="uploader-wrapper">
        <div className="img-wrapper">
            {previewUrl && <img src={previewUrl}/>}
        </div>
        <div className="upload-button">
            <button>
                <input type="file" id="file-input" onChange={previewImage} style={{display: "none"}}/>
                <label htmlFor="file-input">사진 고르기</label>
            </button>
         </div>
     </div>
        <div className="textArea-wrapper">
            <input onChange={onChangeTitle}
                className="title"
                placeholder="빌려주고자하는 제품명을 입력하세요(제품명만 입력)"
                value={title}
            />
            <div className="quantity-container">
            <input onChange={onChangeQuantity} 
            className="quantityInput"
            type="text"
            placeholder="수량 
            (최소 수량은 1)"
            value={howMany}
            />
            <input onChange={onChangePrice} 
            className="priceInput"
            type="text"
            placeholder="가격을 기입하세요. 하루단위로 가격을 책정해주세요."
            value={howMuch} 
            />
            </div>
            <textarea
                onChange={onChangeContent}
                className="text"
                placeholder="제품의 상태를 자세히 기입해주세요!"
                value={content}/>
            
        </div>
    </div>
    <div className="button-container">
    <button onClick={handleUploadAndSaveClick}>올리기</button>
    <button onClick={onClickToList}>돌아가기</button>
    </div>
    </Wrap>
    );

}

export default LentWrite;