import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getBookListData } from "../../api/axios";
import styled from "styled-components";
import BookListCard from "../../components/BookListCard";
import Loading from "../../components/Loading";

const MyBookList = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [myBookList, setMyBookList] = useState(null);
  const [searchResultList, setSearchResultList] = useState(null);
  const users = useSelector((state) => state.users);

  const navigate = useNavigate();
  const location = useLocation();
  const keyword = location?.state;

  useEffect(() => {
    const getList = async () => {
      if (users.uid) {
        setLoading(true);
        const bookList = await getBookListData(users.uid);
        setList(bookList);
        const addDate = bookList.map((el) => {
          const str = el.endDate.slice(0, 7);
          return { ...el, date: str };
        });

        const groupValues = addDate.reduce((acc, current) => {
          acc[current.date] = acc[current.date] || [];
          acc[current.date].push(current);
          return acc;
        }, {});

        const groups = Object.keys(groupValues).map((key) => {
          return { date: key, list: groupValues[key] };
        });

        const sortedList = groups.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setMyBookList(sortedList);
        setLoading(false);
      }
    };
    getList();
  }, [users]);

  useEffect(() => {
    if (keyword) {
      const searchResult = list.filter((el) => el.title.includes(keyword));

      setSearchResultList(searchResult);
    } else {
      setSearchResultList(null);
    }
  }, [keyword, list]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      {!searchResultList
        ? myBookList?.map((book, idx) => (
            <div className="bookGroup" key={idx}>
              <div className="bookDate">{book.date}</div>
              {book.list.map((el) => (
                <BookListCard
                  key={el.id}
                  book={el}
                  clickHandler={() => navigate(`/view/${el.docId}`)}
                />
              ))}
            </div>
          ))
        : searchResultList.map((book, idx) => (
            <BookListCard
              key={book.id}
              book={book}
              clickHandler={() => navigate(`/view/${book.docId}`)}
            />
          ))}
    </Container>
  );
};

export default MyBookList;

const Container = styled.div`
  padding-top: 50px;

  .bookGroup {
    margin: 20px 0 50px 0;
  }

  .bookDate {
    margin-bottom: 10px;
    font-size: 0.9rem;
  }
`;
