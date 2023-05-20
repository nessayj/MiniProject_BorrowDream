import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BaroApi from "../../api/BaRoApi";
import {SiStarship} from "react-icons/si"

const QnaCotainer = styled.div`
  font-family: 'bitbit';
  .title {
    margin-left: 10rem;
    margin-bottom: 1rem;
      display: flex;
      align-items: center;
      font-size: 30px;
      font-weight: 600;
      color: #1a5d98;
      h2 {margin-left: 10px; font-size: 35px; margin-top: 35px; font-weight: 500; color: #135CD2; }
    }   

.qna-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .qna-card {
    display: flex;
    margin-top: 10px;
    width: 80%;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    border: 1px solid black;
    border-radius: 20px;
    flex-direction: column;
  }
  
  .qna-card-title {
    display: flex;
    color: #7F8EEF;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    align-items: center;
    cursor: pointer;
  }
  
  .qna-card-answer {
    position: relative;
    font-size: 1.2rem;
    padding-top: 1rem;
    padding-bottom: 1.5rem;
    padding-right: 2rem;
    border: 0px solid rgba(225,228,230,.5);
  }
  
  .question-mark {
    color: rgb(12, 77, 162);
    font-size: 20px;
    margin-right: 10px;
  }
  
  .answer-mark {
    color: skyblue;
    font-size: 20px;
    margin-right: 10px;
  }
`;


const FAQ = () => {

    // 목록보기
    const [qnaList, setQnaList] = useState([]);

    // 클릭시 답을 보이기 위한 함수
    const onClickToShowTheAnswer = (qnaNo) => {
        const updatedQnaList = qnaList.map(e => {
          if (e.qnaNo === qnaNo) {
            return { ...e, displayQContents: !e.displayQContents };
          }
          return e;
        });
        setQnaList(updatedQnaList);
      };

    // QnA 불러오기
    useEffect(() => {
        const qnaData = async() => {
         try{
                const qnaListData = await BaroApi.showQna();
                setQnaList(qnaListData.data);
            } catch(e) {
            console.log(e);
        }
    };
        qnaData();
    }, []);
  
    return (
        <>
        <QnaCotainer> 
            <div className="title">
            <SiStarship size="50" color="7F8EEF" /><h2>Q&A</h2>
            </div>
            <div className="qna-container">
            {qnaList.map((e) => {
                return (
                  <div className="qna-card" key={e.qnaNo}>
                  <div className="qna-card-title" onClick={() => onClickToShowTheAnswer(e.qnaNo)}  >
                    <span className="question-mark">Q.</span>
                    <span>{e.qtitle}</span>
                  </div>
                 <div className="qna-card-answer" style={{ display: e.displayQContents ? "block" : "none" }}>
                    <span className="answer-mark">A.</span>
                    <span className="qna-card-answer">{e.qcontents}</span>
                    </div>
                </div>
             )})}
             </div>
        </QnaCotainer>
          </>
    );  
  };
  


export default FAQ;