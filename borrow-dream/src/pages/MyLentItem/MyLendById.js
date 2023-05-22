import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BaroApi from "../../api/BaRoApi";
import { useNavigate } from "react-router-dom";



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



const MyLendById = () => {
    const getId = window.localStorage.getItem("Id");
    const navigate = useNavigate();

    const [myLendById, setMyLendById] = useState([]);

    // 리스트 불러오기
    useEffect(() => {
        const myLendByIdData = async() => {
            try{
                const myLendListData = await BaroApi.myLendListById(getId);
                setMyLendById(myLendListData.data);
                console.log(myLendById);
            } catch(e) {
                console.log(e);
            }
        };
        myLendByIdData();
    }, []);




    // 타이틀 클릭시 글번호 이동
    const onClickToView =(e) =>{
        navigate(`/myLentItem/${e}`)
    }

    return (
        <Wrap>
        <Section id="board" className="section">
            <div className="board_list sub_box">
                <table>
                    <tr>
                        <th>품목이름</th>
                        <th>빌려준여부</th>
                    </tr>
                    {myLendById.map((e) => {
                            return(
                                <tr key={e.borrowId}>
                                    <td onClick={() => onClickToView(e.myNo)}>{e.myItem}</td>
                                    <td>{e.isBorrowed === 0 ? "X" : "O"}</td>
                                </tr>
                            )
                    })}
                </table>
            </div>
        </Section>
    </Wrap>

    );

}

export default MyLendById;