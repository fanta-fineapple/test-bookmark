import { useRef } from "react";
import { toPng } from "html-to-image";
import { MdClose, MdOutlineSaveAlt } from "react-icons/md";
import styled from "styled-components";

const BookmarkSave = ({ bookmarkSaveClose, bookmark }) => {
  const printRef = useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;

    toPng(element)
      .then(function (dataUrl) {
        let link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

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
        <Box ref={printRef}>
          <div>{bookmark.text}</div>
          {/* <div>
            <img src="/assets/2323.jpeg" alt="이미지" className="imageSize" />
          </div> */}
        </Box>
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

const Box = styled.div`
  background-image: url("/assets/2323.jpeg");
  background-position: center;
  background-size: cover;
  // padding: 30px;
  // height: 420px;
  width: 100%;
  position: relative;
  white-space: pre-line;
  background-color: salmon;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  div {
    position: absolute;
    width: 100%;
    height: 100%;

    .imageSize {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
