import React from "react";
import { MdClose, MdOutlineSaveAlt } from "react-icons/md";
import styled from "styled-components";

const BookmarkSave = ({ bookmarkSaveClose }) => {
  return (
    <Container>
      <ButtonContainer>
        <div onClick={bookmarkSaveClose}>
          <MdClose />
        </div>
        <div>
          <MdOutlineSaveAlt />
        </div>
      </ButtonContainer>

      <ViewContainer>
        <div>
          <div>text</div>
        </div>
      </ViewContainer>

      {/* <EditContainer>

      </EditContainer> */}
    </Container>
  );
};

export default BookmarkSave;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background-color: ${(props) => props.theme.black};
`;

const ViewContainer = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  color: white;
  font-size: 1.7rem;
`;
