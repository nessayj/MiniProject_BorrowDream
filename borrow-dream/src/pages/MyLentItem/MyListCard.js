import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrap = styled.div`

@media all and (min-width: 1024px) {
  .card-wrapper {
    width: 300px;
    height: 400px;

  }
}

@media all and (max-width: 1024px) {
  .card-wrapper {
    width: 270px;
    height: 540px;
    }
  }

@media all and (max-width: 768px) {
  .card-wrapper {
    width: 240px;
    height: 480px;

    }
  }


.card-wrapper {
  flex-shrink: 0;
  margin: 15px;
  font-family: 'bitbit';
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 1px 2px 1px 1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 1s, height 1s, box-shadow 1s;
  cursor: pointer;

  .card-body-img {
    width: 100%;
    height: 60%;

    img {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card-body-text {
    font-family:'bitbit';
    flex-grow: 1;
    word-break: break-all;
    overflow: auto;
    padding: 0.6rem;
    color: #1a5d98;

    &::-webkit-scrollbar {
      display: none;
    }

    .card-body-text-title {
      font-family:'bitbit';
      font-size: 1.7rem;
      color: #1a5d98;
      font-weight: bold;
    }

    .card-body-borrow-status {
      float: right;
      font-family:'bitbit';
      font-size: 1.2rem;
      color: #B96BC6;
    }

  }

  .card-footer {
    font-family:'bitbit';
    border-top: 0.5px solid black;
    padding: 0.6rem;
    font-weight: 200;
    display: flex;
    color: #1a5d98;
    font-size: 1.1rem;
    justify-content: space-between;
  }
}


`;




export const Card = ({boardId, title, price, quantity, borrowStatus, content, img_url, username, date}) => {
  const navigate = useNavigate();

    return (
    <Wrap>
      <div className="card-wrapper" onClick={() => {
            navigate(`/myLentItem/${boardId}`)
    }}>
        <div className="card-body-img">
          <img src={img_url}/>
        </div>
        <div className="card-body-text">
          <div className="card-body-text-title">{title}</div>
          <div className="card-body-text-content">{content}</div>
          <div className="card-body-text-content">{price}원/하루</div>
          <div className="card-body-text-content">{quantity}</div>
          <div className="card-body-borrow-status">
          {/* 빌린상태 값이 0이면 빌릴 수 있음을 표시, 1이면 이미 다른사람이 빌렸다는걸 표시 */}
            {borrowStatus === 0 ? "빌릴 수 있어요😘" : "빌려갔어요😥"}</div>
        </div>
  
        <div className="card-footer">
          <div className="username">{username}</div>
          <div className="date">{date}</div>
        </div>
      </div>
      </Wrap>
    );
  };
  