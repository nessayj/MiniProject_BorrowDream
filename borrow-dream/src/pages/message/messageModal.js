import React from "react";
import styled from "styled-components";


const ModalStyle = styled.div`
    .Modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
 
/* modal창 */
.modalBody {
  position: absolute;
  width: 30rem;
  height: 40rem;
  padding: 40px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
}
 
#modalCloseBtn {
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  color: rgba(0, 0, 0, 0.7);
  background-color: transparent;
  font-size: 20px;
}
 
#modalCloseBtn:hover {
  cursor: pointer;
}


`;

const MessageModal = (props) => {
      
    const closeModal = () => {
        props.closeModal();
      }




    return(
        <ModalStyle>
           
        <div className="Modal" onClick={closeModal}>
            <div className="modalBody" onClick={(e) => e.stopPropagation()}>
            <button id="modalCloseBtn" onClick={closeModal}>
                    ✖
            </button>
            {props.children}
            </div>
        </div>
        </ModalStyle>

    );
}

export default MessageModal;