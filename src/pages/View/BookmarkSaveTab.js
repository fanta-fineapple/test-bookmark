import { AiFillCamera } from "react-icons/ai";
import { MdFormatColorText } from "react-icons/md";

import styled from "styled-components";

// const bgImgList = Array.from({ length: 12 }, (v, i) => i + 1);

const ratioList = [
  { type: "square", menu: "1 : 1" },
  { type: "rectangle", menu: "3 : 4" },
];

const textColorList = ["black", "white"];

const BookmarkSaveTab = ({
  tab,
  selectBackgroundImg,
  selectRatio,
  selectTextColor,
  ratio,
  bgImg,
  textColor,
  onChangeBgImgHandler,
}) => {
  const RatioTab = () => {
    return (
      <ul>
        {ratioList.map((rat) => (
          <li
            key={rat.type}
            onClick={() => selectRatio(rat.type)}
            className={rat.type === ratio ? "on" : ""}
          >
            {rat.menu}
          </li>
        ))}
      </ul>
    );
  };

  console.log(bgImg);

  const BgImgTab = () => {
    return (
      <ul>
        <li>
          <label htmlFor={`ex_file1`}>
            <AiFillCamera />
          </label>
          <input
            type="file"
            id={`ex_file1`}
            accept="image/*"
            onChange={onChangeBgImgHandler}
          />
        </li>
        <li
          onClick={() =>
            selectBackgroundImg(
              `https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80`
            )
          }
        >
          <img
            src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80"
            alt=""
          />
        </li>
        <li
          onClick={() =>
            selectBackgroundImg(
              `https://images.unsplash.com/photo-1560790671-b76ca4de55ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=868&q=80`
            )
          }
        >
          <img
            src="https://images.unsplash.com/photo-1560790671-b76ca4de55ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=868&q=80"
            alt=""
          />
        </li>
        <li
          onClick={() =>
            selectBackgroundImg(
              `https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80`
            )
          }
        >
          <img
            src="https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
            alt=""
          />
        </li>
        {/* {bgImgList.map((img) => (
          <li
            onClick={() => selectBackgroundImg(`/assets/background${img}.jpg`)}
            className={`/assets/background${img}.jpg` === bgImg ? "on" : ""}
          >
            <img src={`/assets/background${img}.jpg`} alt="이미지" />
          </li>
        ))} */}
      </ul>
    );
  };

  const TextColorTab = () => {
    return (
      <ul>
        {textColorList.map((color) => (
          <li
            key={color}
            onClick={() => selectTextColor(color)}
            className={color === textColor ? "on" : ""}
          >
            <MdFormatColorText />
          </li>
        ))}
      </ul>
    );
  };

  const tabMenu = {
    크기: <RatioTab />,
    배경: <BgImgTab />,
    텍스트색상: <TextColorTab />,
  };

  return <Container>{tabMenu[tab]}</Container>;
};

export default BookmarkSaveTab;

const Container = styled.div`
  ul {
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 15px;
  }
  li {
    width: 40px;
    height: 40px;
    background-color: #ddd;
    border-radius: 8px;
    margin-right: 10px;

    img {
      width: 100%;
    }

    input[type="file"] {
      display: none;
    }
  }

  .on {
    // outline: 4px solid ${(props) => props.theme.mainColor};
    box-shadow: 0 0 0 2px ${(props) => props.theme.mainColor} inset;
  }
`;
