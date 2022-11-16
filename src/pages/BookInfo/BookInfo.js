import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookApi, getBook } from "../../api/axios";
import BookInfoTop from "../../components/BookInfoTop";

import styled from "styled-components";
import { useSelector } from "react-redux";

const BookInfo = () => {
  const [bookInfo, setBookInfo] = useState({});
  const [myBook, setMyBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const users = useSelector((state) => state.users);
  const params = useParams();
  const navigate = useNavigate();

  const id = params.id;

  useEffect(() => {
    const getBookInfo = async () => {
      const book = await bookApi.info(id);
      const mybook = await getBook(users.uid, id);
      setBookInfo(...book.data.item);
      setMyBook(mybook);
      setLoading(false);
    };
    getBookInfo();
  }, [id, users]);

  console.log(loading);

  const bookInfoObj = {
    author: bookInfo.author,
    title: bookInfo.title,
    cover: bookInfo.cover,
    publisher: bookInfo.publisher,
    id: bookInfo.id,
  };

  return (
    <BookInfoWrap>
      {Object.keys(bookInfo).length !== 0 && (
        <Box>
          <BookInfoBox>
            <BookInfoTop bookInfo={bookInfoObj} />

            <InfoBottom>
              <Category>
                <div>분류</div>
                <div>{bookInfo.categoryName}</div>
              </Category>
              <Description>
                <div>책 소개</div>
                <div>{bookInfo.description}</div>
              </Description>
            </InfoBottom>
          </BookInfoBox>
          <div
            className="btn uploadBtn"
            onClick={() =>
              myBook.length !== 0
                ? navigate(`/view/${myBook[0].docId}`)
                : navigate(`/write/${id}`, {
                    state: {
                      bookInfo: {
                        id,
                        author: bookInfo.author,
                        cover: bookInfo.cover,
                        title: bookInfo.title,
                        publisher: bookInfo.publisher,
                      },
                    },
                  })
            }
          >
            {myBook.length !== 0 ? "내 기록 보기" : "독서 기록하기"}
          </div>
        </Box>
      )}
      {/* <HeaderRight icon="write" /> */}
    </BookInfoWrap>
  );
};

export default BookInfo;

const BookInfoWrap = styled.div`
  height: 100%;
  padding-bottom: 20px;
`;

const Box = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BookInfoBox = styled.div`
  // border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
`;

const InfoBottom = styled.div`
  font-size: 0.9rem;
`;

const Category = styled.div`
  margin-bottom: 30px;
  div:first-child {
    margin-bottom: 10px;
  }
`;

const Description = styled.div`
  div:first-child {
    margin-bottom: 10px;
  }

  div:last-child {
    line-height: 20px;
  }
`;
