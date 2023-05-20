import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BaroApi from "../../api/BaRoApi";

const QnaCotainer = styled.div`
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
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    align-items: center;
    cursor: pointer;
  }
  
  .qna-card-answer {
    position: relative;
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