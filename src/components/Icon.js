import React from "react";
import { AiOutlineCheck, AiFillEdit, AiFillDelete } from "react-icons/ai";
import styled from "styled-components";

const Icon = ({ save, edit, del }) => {
  const icon = () => {
    if (save) {
      return <AiOutlineCheck className="icon" />;
    }
    if (edit) {
      return <AiFillEdit className="icon" />;
    }
    if (del) {
      return <AiFillDelete className="icon" />;
    }
  };
  return <HeaderRightContainer>{icon()}</HeaderRightContainer>;
};

export default Icon;

const HeaderRightContainer = styled.div`
  // position: absolute;
  // top: 15px;
  // right: 18px;
  // z-index: 9999;
  margin-left: 10px;
  font-size: 20px;

  .icon {
    font-size: 22px;
    color: #555;
  }
`;
