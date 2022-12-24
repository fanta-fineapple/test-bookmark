import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import html2canvas from "html2canvas";
import imageCompression from "browser-image-compression";
import { MdClose, MdOutlineSaveAlt } from "react-icons/md";
import styled from "styled-components";
import BookmarkSaveTab from "./BookmarkSaveTab";
// import Loading from "../../components/Loading";
import { authorSlice } from "../../util/util";

const tabMenu = ["크기", "배경", "텍스트색상"];

const BookmarkSave = ({ bookmarkSaveClose, bookmark, title, author }) => {
  const [loading, setLoading] = useState(false);
  const [ratio, setRatio] = useState("square");
  const [tab, setTab] = useState(tabMenu[0]);
  const [bgImg, setBgImg] = useState("/assets/background1.jpg");
  const [textColor, setTextColor] = useState("black");
  const [isDefault, setIsDefault] = useState(true);
  const printRef = useRef();
  const textRef = useRef();
  const viewRef = useRef();
  const isIphone = /iPhone/i.test(navigator.userAgent);

  const handleDownloadImage = async () => {
    const element = printRef.current;
    setLoading(true);
    if (isDefault) {
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/png");
      const link = document.createElement("a");

      link.href = data;
      link.download = "image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    if (!isDefault) {
      if (isIphone) {
        await toPng(element);
      }
      await toPng(element);
      await toPng(element)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "my-image-name.png";
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setLoading(false);
  };
  const selectBackgroundImg = (img) => {
    setBgImg(img);
    setIsDefault(true);
  };
  const selectRatio = (ratio) => {
    setRatio(ratio);
  };
  const selectTextColor = (color) => {
    setTextColor(color);
  };
  const onChangeBgImgHandler = async (e) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const file = e.target.files[0];
    if (!file) return null;
    const compressedFile = await imageCompression(file, options);
    setIsDefault(false);
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);
    reader.onloadend = () => {
      setBgImg(reader.result);
    };
  };

  console.log(loading);

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
      {loading && <div style={{ color: "white" }}>다운로드중</div>}
      <ViewContainer ratio={ratio} textColor={textColor} ref={viewRef}>
        <Box>
          {!isDefault && (
            <ScreenShotBox ref={printRef} ratio={ratio} bgImg={bgImg}>
              <div className="contentBox">
                <div className="content" ref={textRef}>
                  <p>{bookmark.text}</p>
                  <div className="titleBox">
                    <div className="title">{title}</div>
                    <div className="author">{authorSlice(author)}</div>
                  </div>
                </div>
              </div>
            </ScreenShotBox>
          )}
          {isDefault && (
            <ScreenShotBox2 ref={printRef} ratio={ratio}>
              <img src={bgImg} alt="이미지" className="imageSize" />
              <div className="contentBox">
                <div className="content" ref={textRef}>
                  <p>{bookmark.text}</p>
                  <div className="titleBox">
                    <div className="title">{title}</div>
                    <div className="author">{authorSlice(author)}</div>
                  </div>
                </div>
              </div>
            </ScreenShotBox2>
          )}
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
        {/* {loading && <div className="loadingBox"></div>} */}
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

  .loading {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 9;
    background: rgba(0, 0, 0, 0.4);
  }
`;

const ViewContainer = styled.div`
  width: 100%;
  position: relative;
  background-color: #666;
  color: ${(props) => (props.textColor === "black" ? "black" : "white")};
  font-family: ${(props) => props.font};
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
`;

const ScreenShotBox = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url(${props.bgImg})`};
  background-position: center;
  background-size: cover;
  .contentBox {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 5% 10%;
    font-size: 0.9rem;
    .content {
      line-height: 21px;
      p {
        display: -webkit-box;
        -webkit-line-clamp: ${(props) =>
          props.ratio === "square" ? "13" : "18"};
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: clip;
      }
    }
    .titleBox {
      margin-top: 30px;
      font-size: 0.9rem;
      .title {
        font-weight: 500;
      }
      .author {
        font-size: 0.8rem;
      }
    }
  }
`;

const ScreenShotBox2 = styled.div`
  width: 100%;
  height: 100%;
  .imageSize {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .contentBox {
    position: absolute;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 5% 10%;
    font-size: 0.9rem;
    .content {
      line-height: 21px;
      p {
        display: -webkit-box;
        -webkit-line-clamp: ${(props) =>
          props.ratio === "square" ? "13" : "18"};
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: clip;
      }
    }
    .titleBox {
      margin-top: 30px;
      font-size: 0.9rem;
      .title {
        font-weight: 500;
      }
      .author {
        font-size: 0.8rem;
      }
    }
  }
`;

const EditContainer = styled.div`
  position: relative;
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

  .loadingBox {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  color: white;
  font-size: 1.7rem;
`;
