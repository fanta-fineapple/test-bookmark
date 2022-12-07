import { useState, useRef, useEffect } from "react";
import { toPng } from "html-to-image";
import html2canvas from "html2canvas";
import imageCompression from "browser-image-compression";
import { MdClose, MdOutlineSaveAlt } from "react-icons/md";
import styled from "styled-components";
import BookmarkSaveTab from "./BookmarkSaveTab";
import Loading from "../../components/Loading";

const tabMenu = ["크기", "배경", "폰트", "텍스트색상"];

const BookmarkSave = ({ bookmarkSaveClose, bookmark, title, author }) => {
  const [loading, setLoading] = useState(false);
  const [ratio, setRatio] = useState("square");
  const [tab, setTab] = useState(tabMenu[0]);
  const [bgImg, setBgImg] = useState("/assets/background1.jpg");
  const [font, setFont] = useState("Noto Sans KR");
  const [textColor, setTextColor] = useState("black");
  const [isDefault, setIsDefault] = useState(true);
  const [version, setVersion] = useState(false);

  const [errorText, setErrorText] = useState("오류아님");
  const printRef = useRef();
  const textRef = useRef();
  const viewRef = useRef();

  // useEffect(() => {
  //   const getList = async () => {
  //     setLoading(true);
  //     await textImageHandler();

  //     setLoading(false);
  //   };

  //   getList();
  // }, []);

  useEffect(() => {
    const element2 = textRef.current;
    const element3 = viewRef.current;
    if (element2.clientHeight > element3.clientHeight) {
      setVersion(true); // 긴텍스트라면
    }
    console.log(element2.clientHeight);
    console.log(element3.clientHeight);
  }, []);

  // const textImageHandler = async () => {
  //   const element = textRef.current;

  //   await toPng(element).then((dataUrl) => {
  //     setTextImage(dataUrl);
  //   });

  // };

  const handleDownloadImage = async () => {
    const element = printRef.current;
    // setLoading(true);
    if (isDefault) {
      setErrorText("다운시작");
      const canvas = await html2canvas(element);

      const data = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      setErrorText("a로 만듦");
      link.href = data;
      link.download = "image.png";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setErrorText("다운완료");
    }

    /////////////////////////////////

    if (!isDefault) {
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
      setErrorText("다운시작");
      await toPng(element);
      await toPng(element);
      await toPng(element)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "my-image-name.png";
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setErrorText("다운완료");
        })
        .catch((error) => {
          setErrorText("에러");
        });
      setErrorText("끝");
      setLoading(false);
    }

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
    setIsDefault(true);
  };

  const selectRatio = (ratio) => {
    setRatio(ratio);
  };

  const selectFont = (ft) => {
    setFont(ft);
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

  console.log(errorText);

  console.log("기본배경이다", isDefault);

  console.log("긴텍스트다", version);

  return (
    <Container>
      <ButtonContainer>
        <div onClick={bookmarkSaveClose}>
          <MdClose />
        </div>
        {/* <div onClick={textImageHandler}>#</div> */}
        <div onClick={handleDownloadImage}>
          <MdOutlineSaveAlt />
        </div>
      </ButtonContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* <TextImageComP>
            {textImage === "" && (
              <div className="contentBox">
                <div className="content" ref={textRef}>
                  <p>{bookmark.text}</p>
                  <div className="titleBox">
                    <div className="title">{title}</div>
                    <div>{author}</div>
                  </div>
                </div>
              </div>
            )}
          </TextImageComP> */}
          <ViewContainer
            ratio={ratio}
            textColor={textColor}
            font={font}
            ref={viewRef}
          >
            <Box>
              <div style={{ position: "absolute" }}>{errorText}</div>
              {!isDefault && (
                <ScreenShotBox
                  ref={printRef}
                  bgImg={bgImg}
                  version={version ? 1 : 0}
                >
                  <div className="contentBox">
                    <div className="content" ref={textRef}>
                      <p>{bookmark.text}</p>
                      <div className="titleBox">
                        <div className="title">{title}</div>
                        <div>{author}</div>
                      </div>
                    </div>
                  </div>
                </ScreenShotBox>
              )}

              {isDefault && (
                <ScreenShotBox2 ref={printRef} version={version ? "1" : "0"}>
                  <img src={bgImg} alt="이미지" className="imageSize" />
                  <div className="contentBox">
                    <div className="content" ref={textRef}>
                      <p>{bookmark.text}</p>
                      <div className="titleBox">
                        <div className="title">{title}</div>
                        <div>{author}</div>
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
        </>
      )}

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
          selectFont={selectFont}
          ratio={ratio}
          bgImg={bgImg}
          font={font}
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
  font-family: ${(props) =>
    props.font === "Noto Sans KR" ? "Noto Sans KR" : "RIDIBatang"};

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

// const TextImageComP = styled.div`
//   position: absolute;
//   top: 0;
//   z-index: 999999999;
//   height: 100%;
//   white-space: pre-line;

//   .contentBox {
//     height: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding: 10%;
//     font-size: 0.9rem;

//     .content {
//       line-height: 21px;
//     }

//     .titleBox {
//       margin-top: 20px;
//       font-size: 0.9rem;

//       .title {
//         font-weight: 500;
//       }
//     }
//   }
// `;

const ScreenShotBox = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url(${props.bgImg})`};
  background-position: center;
  background-size: cover;

  .contentBox {
    position: absolute;
    top: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5% 10%;
    font-size: 0.9rem;

    .content {
      line-height: 21px;

      p {
        display: -webkit-box;
        -webkit-line-clamp: 13;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: clip;
      }
    }

    .titleBox {
      margin-top: 20px;
      font-size: 0.9rem;

      .title {
        font-weight: 500;
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
    justify-content: center;
    align-items: center;
    padding: 5% 10%;
    font-size: 0.9rem;

    .content {
      line-height: 21px;

      p {
        display: -webkit-box;
        -webkit-line-clamp: 13;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: clip;
      }
    }

    .titleBox {
      margin-top: 20px;
      font-size: 0.9rem;

      .title {
        font-weight: 500;
      }
    }
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
