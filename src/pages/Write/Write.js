import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import WriteForm from "./WriteForm";

const Write = () => {
  const location = useLocation();
  const bookInfo = location.state.bookInfo;
  const editMode = location.state?.edit;

  const isEditing = !!editMode;

  console.log(isEditing);

  return (
    <WriteContainer>
      <WriteForm isEditing={isEditing} bookInfo={bookInfo} />

      {/* <HeaderRight icon="write" /> */}
    </WriteContainer>
  );
};

export default Write;

const WriteContainer = styled.div``;
