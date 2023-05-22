import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';

const ModalStyle = styled.div`
    .modal {
        display: none;  // 숨겨진 상태로 시작
        position: fixed;
        top: 0;  // 화면 전체를 덮도록 위치
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99; // 다른 모달 보다 위에 위치하도록 함
        background-color: rgba(0, 0, 0, 0.6); // 배경색을 검정으로 하고 투명도 조절
    }

    .openModal {
        display: flex; // 모달이 보이도록 함
        align-items: center;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-bg-show 0.8s;
    }
    button {
        outline: none;
        cursor: pointer;
        margin-right: 10px;
        border: 0;
    }

    section {
        width: 90%;
        max-width: 450px;
        margin: 0 auto;
        border-radius: 0.3rem;
        background-color: #fff;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-show 0.3s;
        overflow: hidden;
    }
    
    section {
        position: relative;
        padding: 16px 64px 16px 16px;
        background-color: #f1f1f1;
        font-weight: 700;
    }

    section > header button {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 30px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #999;
        background-color: transparent;
    }

    section > main {
        padding: 16px;
        border-bottom: 1px solid #dee2e6;
        border-top: 1px solid #dee2e6;
    }

    section > footer {
        padding: 12px 16px;
        text-align: right;
    }

    section > footer button {
        padding: 6px 12px;
        color: #fff;
        background-color: #6c757d;
        border-radius: 5px;
        font-size: 13px;
    }

    @keyframes modal-show {
        from {
            opacity: 0;
            margin-top: -50px;
        }
        to {
            opacity: 1;
            margin-top: 0;
        }
    }
    @keyframes modal-bg-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

`;
const PaymentModal = (props) => {
    const { open, confirm, close, type, children, modalOpen } = props;
    const getId = window.localStorage.getItem("Id");
    console.log("Modal Component: " + type);
    const navigate = useNavigate();
    const onClickToOrder = () => {
      navigate("/order/"+ getId)
    }
    return (
      <ModalStyle>
        <div className={modalOpen ? 'openModal modal' : 'modal'}>
          {modalOpen && (
            <section>
              <main>{children}</main>
              <footer>
                {type && (
                    <button onClick={onClickToOrder}>주문내역으로 이동</button>
                )}
                <Link to="/">
                  <button onClick={close}>메인 페이지로 이동</button>
                </Link>
              </footer>
            </section>
          )}
        </div>
      </ModalStyle>
    );
  };
export default PaymentModal;