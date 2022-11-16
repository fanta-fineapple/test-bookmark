import styled from "styled-components";
import Icon from "./Icon";

const HeaderRight = ({
  save,
  edit,
  del,
  onsubmitHandler,
  onEdit,
  onDelete,
}) => {
  return (
    <HeaderRightContainer>
      {save && (
        <div onClick={onsubmitHandler}>
          <Icon save />
        </div>
      )}
      {edit && (
        <div onClick={onEdit}>
          <Icon edit />
        </div>
      )}
      {del && (
        <div onClick={onDelete}>
          <Icon del />
        </div>
      )}
    </HeaderRightContainer>
  );
};

export default HeaderRight;

const HeaderRightContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  top: 15px;
  right: 18px;
  z-index: 9;
  margin-left: 10px;
  font-size: 20px;

  .icon {
    font-size: 22px;
    color: #555;
  }
`;
