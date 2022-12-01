import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { MdClose, MdOutlineSaveAlt } from "react-icons/md";
import styled from "styled-components";

const BookmarkSave = ({ bookmarkSaveClose, bookmark }) => {
  const [ratio, setRatio] = useState("ratio1");
  const printRef = useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;

    const url = await toPng(element);

    let img = document.createElement("img");
    img.src = url;

    const image = await new Promise((resolve) => {
      img.onload = () => {
        toPng(element).then((dataUrl) => {
          resolve(dataUrl);
        });
      };
    });

    let link = document.createElement("a");
    link.download = "my-image-name.png";
    link.href = image;
    link.click();

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

  console.log(ratio);

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

      <ViewContainer>
        <Box>
          <ScreenShotBox ref={printRef} ratio={ratio}>
            <p>{bookmark.text}</p>
          </ScreenShotBox>

          {/* <div>
            <img src="/assets/2323.jpeg" alt="이미지" className="imageSize" />
          </div> */}
        </Box>
      </ViewContainer>

      <EditContainer>
        <div className="ratio list">
          <ul>
            <li onClick={() => setRatio("ratio1")}>1 : 1</li>
            <li onClick={() => setRatio("ratio2")}>3 : 4</li>
          </ul>
        </div>
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
  background-color: ${(props) => props.theme.black};
`;

const ViewContainer = styled.div`
  width: 100%;
  position: relative;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
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
  width: ${(props) => (props.ratio === "ratio1" ? "100%" : "70%")};
  height: 100%;
  background-image: url("/assets/background1.jpg");
  background-position: center;
  background-size: cover;

  .imageSize {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const EditContainer = styled.div`
  background-color: white;

  ul {
    display: flex;
    align-items: center;

    li {
      width: 50px;
      height: 50px;
      background-color: #d9d9d9;
      margin-left: 10px;
      border-radius: 8px;
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
