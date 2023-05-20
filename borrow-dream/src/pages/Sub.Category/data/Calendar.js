import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import React, { Component } from 'react';
import axios from 'axios';
import ko from 'date-fns/locale/ko';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 37px;
`;

const DateLabel = styled.div`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  margin-left: 200px;
`;

const productPrice = 10000; // 예시: 상품 가격 정보

const priceByDate = (startDate, endDate) => {
  const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  return productPrice * days;
};

class CalendarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
      totalDays: 1,
      totalPrice: productPrice,
    };
  }

  onRangeChange = async (ranges) => {
    const startDate = ranges['selection'].startDate;
    const endDate = ranges['selection'].endDate;
    const totalDays = parseInt(Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)));
    const totalPrice = priceByDate(startDate, endDate);

    this.setState({
      startDate,
      endDate,
      key: ranges['selection'].key,
      totalDays,
      totalPrice,
    });

    try {
      const response = await axios.post('http://localhost:8111/api/save-date-range', {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        totalDays,
        totalPrice,
      });
      console.log('날짜 범위 저장 성공:', response.data);
      window.alert('날짜 범위 저장 성공');
    } catch (error) {
      console.error('날짜 범위 저장 실패:', error);
      window.alert('날짜 범위 저장 실패');
    }
  };

  render() {
    return (
      <CalendarContainer>
        <DateRange
          editableDateInputs={true}
          onChange={this.onRangeChange}
          moveRangeOnFirstSelection={false}
          ranges={[this.state]}
          locale={ko}
        />
        <DateLabel>물건 대여: {this.state.startDate.toLocaleDateString()}</DateLabel>
        <DateLabel>물건 반납: {this.state.endDate.toLocaleDateString()}</DateLabel>
        <DateLabel>총 일 수: {this.state.totalDays}일</DateLabel>
        <DateLabel>총 가격: {this.state.totalPrice}원</DateLabel>
      </CalendarContainer>
    );
  }
}

export default CalendarComponent;
