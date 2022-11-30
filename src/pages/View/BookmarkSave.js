import { useRef } from "react";
import html2canvas from "html2canvas";
import { MdClose, MdOutlineSaveAlt } from "react-icons/md";
import styled from "styled-components";

const BookmarkSave = ({ bookmarkSaveClose, bookmark }) => {
  const printRef = useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });

    const data = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = data;
    link.download = "image.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        <div
          ref={printRef}
          style={{
            backgroundImage: `url(/assets/2323.jpeg)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            padding: "30px",
            whiteSpace: "pre-line",
          }}
        >
          <div>{bookmark.text}</div>
          {/* <img src="/assets/2323.jpeg" alt="이미지" style={{ width: "100%" }} /> */}
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
