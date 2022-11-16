import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookInfoTop from "../../components/BookInfoTop";
import styled from "styled-components";
import {
  deleteBookData,
  deleteStorageBook,
  deleteStorage,
  updateBookData,
} from "../../api/axios";
import { AiFillStar } from "react-icons/ai";
import { BsFillBookmarksFill } from "react-icons/bs";
import HeaderRight from "../../components/HeaderRight";
import Modal from "../../components/Modal";
import BottomSheetModal from "../../components/BottomSheetModal";
import Bookmark from "./Bookmark";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/keys";
import useModal from "../../hooks/useModal";
import Loading from "../../components/Loading";
import CropControl from "../../components/CropControl.js";

const View = () => {
  const [modalOption, showShowModal] = useModal();
  const [book, setBook] = useState({});
  const [bookmark, setBookmark] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bottomModalShow, setBottomModalShow] = useState(false);

  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [cropVisible, setCropVisible] = useState(false);
  const [bookmarkMode, setBookmarkMode] = useState(null);
  const [bookmarkEditMode, setBookmarkEditMode] = useState(null);

  const navigate = useNavigate();

  const params = useParams();
  const docId = params.id;

  useEffect(() => {
    setLoading(true);
    const getBookData = onSnapshot(doc(db, "book2", docId), (doc) => {
      setBook(doc.data());
    });
    setLoading(false);
    return () => {
      getBookData();
    };
  }, [docId]);

  const onEditBook = () => {
    navigate(`/write/${docId}`, { state: { edit: true, bookInfo: book } });
  };

  const onDeleteBook = async () => {
    setLoading(true);
    try {
      await deleteBookData(docId);
      await deleteStorageBook(book.bookmark);
      navigate("/home");
    } catch (error) {
      // setError("could not delete expense - please try again later");
      setLoading(false);
    }
  };

  const onDeleteBookmark = async (id, image) => {
    setLoading(true);
    try {
      let bookmarkArr = [];
      const copyArr = book.bookmark.filter((el) => el.id !== id);
      bookmarkArr = copyArr;
      console.log(bookmarkArr);
      await updateBookData(docId, { bookmark: bookmarkArr });
      if (image !== null) {
        await deleteStorage(image);
      }
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  const delBookModal = () => {
    showShowModal(
      true,
      "해당 독서기록을 삭제하시겠습니까?",
      "삭제시 복구되지 않습니다.",
      "삭제",
      onDeleteBook
    );
  };

  const delBookmarkModal = (id, image) => {
    showShowModal(
      true,
      "해당 북마크를 삭제하시겠습니까?",
      "삭제시 복구되지 않습니다.",
      "삭제",
      () => onDeleteBookmark(id, image)
    );
  };

  // const uploadFile = (e) => {
  //   let file = e.target.files[0];
  //   let fileRef = ref(storage, file.name);
  //   const uploadTask = uploadBytesResumable(fileRef, file);
  //   uploadTask.on("state_changed", (snapshot) => {
  //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     console.log("upload is" + progress + "% done");
  //   });
  // };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropVisible(false);
      const cropImage = cropper.getCroppedCanvas().toDataURL();
      navigate(`/addbookmark/${docId}`, {
        state: {
          cropImage,
          book,
          mode: bookmarkMode,
          bookmark: bookmarkEditMode ? bookmark : null,
        },
        // 수정일 때만 bookmark 보내야함
      });
    }
  };

  const upload = (file) => {
    setBottomModalShow(false);
    setCropVisible(true);
    setCropData(URL.createObjectURL(file));
  };

  console.log("view book", book);

  const bookmarkEditHandler = (bookmark, mode) => {
    setBottomModalShow(true);
    setBookmarkEditMode(mode);
    setBookmark(bookmark);
  };

  if (loading || Object.keys(book).length === 0) {
    return <Loading />;
  }

  return (
    <ViewContainer>
      <BookInfoTop bookInfo={book}>
        <StarRating>
          {[1, 2, 3, 4, 5].map((el) => (
            <div key={el} className={book.starRating >= el ? "onStar" : ""}>
              <AiFillStar />
            </div>
          ))}
        </StarRating>
      </BookInfoTop>
      <DateContainer>
        <Title>독서 날짜</Title>
        <DateBox>
          <div>{book.startDate}</div>
          <div className="dash">{book.endDate}</div>
        </DateBox>
      </DateContainer>
      <MemoContainer>
        <Title>메모</Title>
        <Memo>{book.memo}</Memo>
      </MemoContainer>

      {book.bookmark?.map((bookmark) => (
        <Bookmark
          key={bookmark.id}
          bookmark={bookmark}
          docId={docId}
          book={book}
          bookmarkEditHandler={bookmarkEditHandler}
          delBookmarkModal={delBookmarkModal}
        />
      ))}

      {/* <div
        onClick={() => {
          setModalShow(true);
        }}
      >
        모달
      </div> */}

      <Modal modalOption={modalOption} />

      <BookmarkAddIcon
        onClick={() => {
          setBottomModalShow(true);
          setBookmarkEditMode(null);
        }}
      >
        <div className="icon">
          <BsFillBookmarksFill />
        </div>
      </BookmarkAddIcon>
      <BottomSheetModal
        isModalOpen={bottomModalShow}
        closeModal={() => setBottomModalShow(false)}
        bookmarkEditMode={bookmarkEditMode}
        enterText={() =>
          navigate(`/addbookmark/${docId}`, {
            state: {
              mode: "text",
              book,
              bookmark: bookmarkEditMode ? bookmark : null,
            },
          })
        }
        imageUpload={(e) => {
          upload(e.target.files[0]);
          setBookmarkMode("image");
        }}
        imageToTextUpload={(e) => {
          upload(e.target.files[0]);
          setBookmarkMode("ocr");
        }}
      />
      {cropVisible && (
        <CropControl
          cropData={cropData}
          setCropper={setCropper}
          getCropData={getCropData}
          cropVisible={() => setCropVisible(false)}
        />
      )}

      {/* <div>
        <img style={{ width: "100%" }} src={cropData} alt="cropped" />
      </div> */}
      <HeaderRight edit del onEdit={onEditBook} onDelete={delBookModal} />
    </ViewContainer>
  );
};

export default View;

const ViewContainer = styled.div`
  padding-bottom: 80px;
`;

const StarRating = styled.div`
  display: flex;
  margin-top: 10px;

  div {
    font-size: 1.5rem;
    color: #ddd;
  }

  .onStar {
    color: #ffe269;
  }
`;

const DateContainer = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 0.9rem;
`;

const DateBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  font-size: 0.9rem;

  div {
    display: flex;
    align-items: center;
  }

  .dash:before {
    content: "ㅡ";
    padding: 0 10px;
    color: #666;
  }
`;

const MemoContainer = styled.div`
  width: 100%;
  height: auto;
`;

const Memo = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  line-height: 21px;
  font-size: 0.9rem;
`;

const BookmarkAddIcon = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 60px;
  height: 60px;
  background-color: #666bdb;
  border-radius: 50%;
  text-align: center;
  line-height: 60px;

  .icon {
    color: #fff;
    font-size: 26px;
  }
`;
