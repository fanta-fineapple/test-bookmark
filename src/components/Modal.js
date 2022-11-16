import React from "react";
// import { CSSTransition } from "react-transition-group";
import Modal from "react-modal";
import styled from "styled-components";

Modal.setAppElement("#root");

const MyModal = ({ modalOption }) => {
  console.log("모달?");
  return (
    <>
      <Modal
        isOpen={modalOption.show}
        onRequestClose={() => modalOption.onClose()}
        overlayClassName={{
          base: "overlay-base",
          afterOpen: "overlay-after",
          beforeClose: "overlay-before",
        }}
        className={{
          base: "modal-base",
          afterOpen: "modal-after",
          beforeClose: "modal-before",
        }}
        closeTimeoutMS={300}
      >
        <ModalBox>
          <ModalContent>
            <Title>{modalOption.title}</Title>
            <Description>{modalOption.desc}</Description>
            <ButtonContainer>
              <div onClick={() => modalOption.onClose()}>취소</div>
              <div onClick={() => modalOption.onSubmit()}>
                {modalOption.text}
              </div>
            </ButtonContainer>
          </ModalContent>
        </ModalBox>
      </Modal>
    </>
  );
};

export default MyModal;

const ModalBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 240px;
  padding: 15px 0 15px 0;
  background-color: #fff;
  border-radius: 8px;
`;

const Title = styled.div`
  text-align: center;
  line-height: 20px;
  font-weight: 500;
  font-size: 0.85rem;
  white-space: pre-wrap;
`;

const Description = styled.div`
  margin-top: 11px;
  text-align: center;
  font-size: 0.85rem;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  margin: 25px auto 0 auto;

  div {
    width: 85px;
    padding: 8px 0;
    border-radius: 6px;
    text-align: center;
    font-size: 0.9rem;
    color: #fff;

    &:first-child {
      background-color: #b5b5b5;
    }

    &:last-child {
      background-color: #666bdb;
    }
  }
`;
