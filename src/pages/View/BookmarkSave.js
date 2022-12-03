import { useState, useRef } from "react";
import { toPng } from "html-to-image";
// import html2canvas from "html2canvas";
import { MdClose, MdOutlineSaveAlt } from "react-icons/md";
import styled from "styled-components";
import BookmarkSaveTab from "./BookmarkSaveTab";

const tabMenu = ["크기", "배경", "텍스트색상"];

const BookmarkSave = ({ bookmarkSaveClose, bookmark }) => {
  const [ratio, setRatio] = useState("square");
  const [tab, setTab] = useState(tabMenu[0]);
  const [bgImg, setBgImg] = useState("/assets/background1.jpg");
  const [textColor, setTextColor] = useState("black");
  const printRef = useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;

    // const canvas = await html2canvas(element, { scale: 1 });

    // const data = canvas.toDataURL("image/png");
    // const link = document.createElement("a");

    // link.href = data;
    // link.download = "image.png";

    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    /////////////////////////////////

    await toPng(element);
    await toPng(element).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "my-image-name.png";
      link.href = dataUrl;
      link.click();
    });

    //////////////////////////////////////

    // const url = await toPng(element);

    // let img = document.createElement("img");
    // img.src = url;

    // const image = await new Promise((resolve) => {
    //   img.onload = () => {
    //     toPng(element).then((dataUrl) => {
    //       resolve(dataUrl);
    //     });
    //   };
    // });

    // let link = document.createElement("a");
    // link.download = "my-image-name.png";
    // link.href = image;
    // link.click();

    //////////////////////////////////
    // toPng(element)
    //   .then(function (dataUrl) {
    //     let link = document.createElement("a");
    //     link.download = "my-image-name.png";
    //     link.href = dataUrl;
    //     link.click();
    //   })
    //   .catch(function (error) {
    //     console.error("oops, something went wrong!", error);
    //   });
  };

  const selectBackgroundImg = (img) => {
    setBgImg(img);
  };

  const selectRatio = (ratio) => {
    setRatio(ratio);
  };

  const selectTextColor = (color) => {
    setTextColor(color);
  };

  const onChangeBgImgHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBgImg(reader.result);
    };
  };

  console.log(bgImg);

  return (
    <Container>
      <ButtonContainer>
        <div onClick={bookmarkSaveClose}>
          <MdClose />
        </div>
        <div onClick={handleDownloadImage}>
          <MdOutlineSaveAlt />
        </div>
      </ButtonContainer>

      <ViewContainer ratio={ratio} textColor={textColor}>
        <Box>
          <ScreenShotBox ref={printRef} bgImg={bgImg}>
            <img src={bgImg} alt="이미지" className="imageSize" />
            <p>{bookmark.text}</p>
          </ScreenShotBox>

          {/* <div>
            <img src="/assets/2323.jpeg" alt="이미지" className="imageSize" />
          </div> */}
        </Box>
      </ViewContainer>

      <EditContainer>
        <div className="tabMenuContainer">
          {tabMenu.map((menu) => (
            <div
              key={menu}
              onClick={() => setTab(menu)}
              className={menu === tab ? "tabOn" : ""}
            >
              {menu}
            </div>
          ))}
        </div>
        <BookmarkSaveTab
          tab={tab}
          selectBackgroundImg={selectBackgroundImg}
          selectRatio={selectRatio}
          selectTextColor={selectTextColor}
          ratio={ratio}
          bgImg={bgImg}
          textColor={textColor}
          onChangeBgImgHandler={onChangeBgImgHandler}
        />
      </EditContainer>
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
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  background-color: ${(props) => props.theme.black};
`;

const ViewContainer = styled.div`
  width: 100%;
  position: relative;
  background-color: #666;
  color: ${(props) => (props.textColor === "black" ? "black" : "white")};

  &:after {
    content: "";
    display: block;
    padding-bottom: ${(props) => (props.ratio === "square" ? "100%" : "130%")};
  }
`;

const Box = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  white-space: pre-line;
  // background-color: salmon;
`;

const ScreenShotBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  // background-image: ${(props) => `url(${props.bgImg})`};
  // background-image: url("/assets/background1.jpg");
  // background-position: center;
  // background-size: cover;

  .imageSize {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    top: 0;
  }
`;

const EditContainer = styled.div`
  padding: 0 5px;

  .tabMenuContainer {
    display: flex;
    align-items: center;
    padding-bottom: 10px;

    div {
      padding: 10px;
      color: ${(props) => props.theme.white};
      font-size: 0.9rem;
    }

    .tabOn {
      color: #8f94ff;
      font-weight: 500;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  color: white;
  font-size: 1.7rem;
`;
