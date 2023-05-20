import React, { useState } from "react";
import BaroApi from "../../api/BaRoApi";
import { useNavigate } from "react-router-dom";

const WriteMessage = ({writerId}) => {
   const getId = window.localStorage.getItem("Id");
    const navigate = useNavigate();
 

    const [inputs, setInputs] = useState ({
        title: "",
        contents: "",
        
    })

    const {title, contents} = inputs;

    // 정보넣기
    const onChangeMessageData = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    }
    
 

    // 메세지보내기(저장)
    const onClickToMessage = async() => {
        const result = await BaroApi.writeMessage(title, contents, writerId, getId);
        const success = result.data;
        console.log(success);
        if(success) {
            alert("쪽지가 성공적으로 보내졌습니다.");
        }
    }


    return(
        <>
         
        <form onSubmit={onClickToMessage}>
        <div className="modalFormDiv">
          <label htmlFor="displayName">보내는사람: {getId} </label>
        </div>
        <div className="modalFormDiv">
          <label htmlFor="email">받는사람: {writerId}</label>
        </div>
        <div className="modalFormDiv">
          <label htmlFor="email">제목</label>
          <input
            type="text" 
            id="title" 
            name="title" 
            value={title}
            onChange={onChangeMessageData}
            required
          />
        </div>
        <div className="modalFormDiv">
          <label htmlFor="password">내용</label>
          <input
            type="contents"
            id="contents"
            name="contents"
            value={contents}
            onChange={onChangeMessageData}
            required
          />
        </div>
        

        <div className="modalBtnDiv">
          <input
            type="submit"
            value="쪽지보내기"
          />

        </div>
      </form>
  </>
    );
}

export default WriteMessage;