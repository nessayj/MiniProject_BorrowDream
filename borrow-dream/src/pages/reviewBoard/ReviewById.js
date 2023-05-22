import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BaroApi from "../../api/BaRoApi";



const Wrap = styled.div`
    background-color: white;
    margin: 0 auto;
    border-radius: 10px;
    font-family:'bitbit';



`;


const Section = styled.div`
    table {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: lighter;
        border-collapse: collapse; 
        width:calc(30% - 16px);
        background-color: #4555AE;
        border-top: solid 1px #4555AE;
        border-bottom: solid 1px #4555AE;
        text-align: center;
        table-layout: fixed;
        th{padding: 10px 6px; color: white; background-color: #7F8EEF;}
        tr{
            background-color: white;
            &:nth-child(2n) td, &:nth-child(2n){
                background-color: #fbfbfb;
            }
        }
        th:first-child, td:first-child {border-left: none; width: 10rem;}
        th:nth-child(2), td:nth-child(2) {width: 10rem; letter-spacing: -.4px;}
        th:last-child, td:last-child{width: 100px;}
        tr:hover, tr:hover td, tr:hover a {
            color: #4555AE; 
            background-color: #efefef; 
            cursor: pointer;
        }
    }

`;



const ReviewById = () => {
    const navigate = useNavigate();
    const getId = window.localStorage.getItem("Id");
    // 게시물 목록불러오기
    const[reviewById, setReviewById] = useState([]);
    

    // 아이디 별 리스트 불러오기
    useEffect(() => {
        const reviewByIdLoad = async() => {
            try {
                const reviewByIdData = await BaroApi.reviewById(getId);
                setReviewById(reviewByIdData.data);
            } catch(e) {
                console.log(e);
            }
        };
        reviewByIdLoad();
    }, []);
    const onClikckToReview =(e) => {
        navigate(`/review-list/review/${e}`);
    }


    return(
        <Wrap>
        <Section id="board" className="section">
            <div className="board_list sub_box">
                <table>
                    <tr>
                        <th>제목</th>
                        <th>작성일</th>
                    </tr>
                    {reviewById.map((e) => {
                            return(
                                <tr key={e.reviewNo}>
                                    <td onClick={() => onClikckToReview (e.reviewNo)}>{e.rtitle}</td>
                                    <td>{e.rdate}</td>
                                </tr>
                            )
                    })}
                </table>
            </div>
        </Section>
    </Wrap>


    );
}

export default ReviewById;