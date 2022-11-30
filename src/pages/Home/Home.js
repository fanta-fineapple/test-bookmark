import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBookListData } from "../../api/axios";
import moment from "moment";
import styled from "styled-components";
// import { bookActions } from "../../store/book-slice";
import Calendar from "./Calendar";
import Loading from "../../components/Loading";
// import { headerActions } from "../../store/header/header-slice";

const getMonth = () => {
  const mm = window.sessionStorage.getItem("currentMonth");
  if (mm === null) {
    return moment();
  } else {
    return moment(mm, "MM-YYYY");
  }
};

const Home = () => {
  const [value, setValue] = useState(() => getMonth());
  const [loading, setLoading] = useState(false);
  const [bookList, setBookList] = useState(null);
  const users = useSelector((state) => state.users);
  // const bookList = useSelector((state) => state.book);

  const returnToday = () => setValue(moment());
  const handleClickDay = (day) => setValue(day);
  const jumpToMonth = (num) =>
    num
      ? setValue(value.clone().add(1, "month"))
      : setValue(value.clone().subtract(1, "month"));

  useEffect(() => {
    const getList = async () => {
      if (users?.uid) {
        setLoading(true);
        const bookList = await getBookListData(users.uid);
        setBookList(bookList);
        setLoading(false);
      }
    };
    getList();
  }, [users]);

  useEffect(() => {
    window.sessionStorage.setItem("currentMonth", value.format("MM-YYYY"));
  }, [value]);
  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Calendar
        returnToday={returnToday}
        jumpToMonth={jumpToMonth}
        handleClickDay={handleClickDay}
        value={value}
        bookList={bookList}
      />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  margin-top: 30px;
`;
