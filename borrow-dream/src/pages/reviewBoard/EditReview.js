import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import BaroApi from "../../api/BaRoApi";
import {GiRoundStar} from "react-icons/gi";
import {FaRegStar} from "react-icons/fa";
import Modal from "../../utill/Modal";
import { storage } from "../../firebase/firebase";
import {SiStarship} from "react-icons/si";


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
            margin: 0.2rem;
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

const YellowStar = styled(GiRoundStar)`
  color: #7F8EEF;
  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: #7F8EEF;
  }
`;

const InactiveStar = styled(FaRegStar)`
    color: black;
`;

const StarContainer = styled.div`
  font-size: 3rem;
  display: flex;
  align-items: center;
`;

const EditReview = () => {
    const navigate = useNavigate();
    //리뷰넘버 받기위해 params
    let params = useParams();
    let reviewNo = params.no;

    // 수정할 수 있는 부분 받아오기위해 설정
    const [reviewLoad, setReviewLoad] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [youLike, setYouLike] = useState("");
    const [previewUrl, setPreviewUrl] =useState("");

    // 모달
    const [comment, setComment] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOption, setModalOption] = useState("");
    const closeModal = () => {
        setModalOpen(false);
    };

    // 작성 한 리뷰 받아오기
    useEffect(() => {
        const reviewData = async () => {
            try {
                const response = await BaroApi.viewReview(reviewNo);
                setReviewLoad(response.data);
                setTitle(response.data.rtitle);
                setContent(response.data.rcontents);
                setYouLike(response.data.youLike);
                setPreviewUrl(response.data.rurl);
                setClicked(response.data.youLike);

                // 값들어오는지 확인
                console.log("이전에 작성한 데이터 중 받아온 데이터:", response.data);
            } catch(e) {
                console.log(e);
            }
        };
        reviewData();
    }, [reviewNo]);

      // 이미지 미리보기
      const [image, setImage] = useState(null);

       // 이미지 미리보기
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


    // 해당 게시물 번호에 해당하는 페이지 수정 후 저장
    const onClickToEditSave = async () => {
        if (content.length === 0 || title.length === 0) {
          setComment("제목과 내용을 입력해주세요");
          setModalOpen(true);
        } else {
          const storageRef = storage.ref();
          const fileRef = storageRef.child(image.image_file.name);
        console.log("이전이미지 " + fileRef)
          try {
            await fileRef.put(image.image_file.name);
            let url = await fileRef.getDownloadURL();
            console.log("파일경로확인" + url);
            if(!url) {
                url = previewUrl;
                console.log("프리뷰사진그대로 들어오는지 " + url);
            }
            
            const resultNo = await BaroApi.editReview(title, content, url, youLike, reviewNo);
            const linkNo = resultNo.data;
            console.log(linkNo);
            if (linkNo) {
              setModalOpen(true);
              setModalOption('리뷰저장');
              setComment("후기작성이 완료되었습니다.");
            }
          } catch (e) {
            console.log(e);
          }
        }
      };

    // 수정 취소
    const onClickToCancle = () => {
        navigate(-1);
    }

    // 수정된 정보가지고오기
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }
    const onChangeContent = (e) => {
        setContent(e.target.value);
    }
    const onChangeUrl = (e) => {
        setPreviewUrl(e.target.value);
    }

    // 별점수정
        // 별점 클릭시
        const [clicked, setClicked] = useState();
    
        // 별점 드래그시
        const [hovered, setHovered] = useState();
        const handleStarMouseEnter = (index) => {
            setHovered(index);
          };
          
        const handleStarMouseLeave = () => {
            setHovered(null);
        };
        
        const handleStarClick = (index) => {
            setClicked(index);
            setYouLike(index);
        };




    return (
        <Wrap>
        <Modal open={modalOpen} close={closeModal} option={modalOption}>{comment}</Modal>
    <div className="title-box">
        <SiStarship size="50" color="7F8EEF" /><h2>후기 수정</h2>
    </div>
    <p>제목과 내용은 필수입력입니다.</p>
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
            <span>별을 클릭해주세요</span>
             <StarContainer>
            {[1, 2, 3, 4, 5].map((index) => {
                const isActive = clicked >= index;
                const StarComponent = isActive ? YellowStar : InactiveStar;

                return (
                 <StarComponent
                    key={index}
                    isActive={isActive}
                    onMouseEnter={() => handleStarMouseEnter(index)}
                    onMouseLeave={handleStarMouseLeave}
                    onClick={() => handleStarClick(index)}
                  />
                );
            })}       
            </StarContainer>

            <input
                defaultValue={title} 
                onChange={onChangeTitle}
                className="title"
                placeholder="제목을 입력하세요"
                value={title}
            />
            <textarea
                defaultValue={content}
                onChange={onChangeContent}
                className="text"
                placeholder="내용을 입력하세요"
                value={content}/>
            
        </div>
    </div>
    <div className="button-container">
    <button onClick={onClickToEditSave}>올리기</button>
    <button onClick={onClickToCancle}>돌아가기</button>
    </div>
    </Wrap>


    );

}

export default EditReview;