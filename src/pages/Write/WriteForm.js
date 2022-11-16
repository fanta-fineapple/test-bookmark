import { useState, useEffect } from "react";
import BookInfoTop from "../../components/BookInfoTop";
import HeaderRight from "../../components/HeaderRight";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillStar } from "react-icons/ai";
import { FiCalendar } from "react-icons/fi";
import styled from "styled-components";
import moment from "moment";
import { useSelector } from "react-redux";
import { addBookData, updateBookData } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const WriteForm = ({ isEditing, bookInfo }) => {
  const [starRating, setStarRating] = useState(0);
  const [memo, setMemo] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const users = useSelector((state) => state.users);
  console.log(users);

  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      setStarRating(bookInfo.starRating);
      setMemo(bookInfo.memo);
      setStartDate(new Date(bookInfo.startDate));
      setEndDate(new Date(bookInfo.endDate));
    }
  }, [bookInfo, isEditing]);

  const onsubmitHandler = async () => {
    const obj = {
      starRating,
      memo,
      startDate: moment(startDate).format("YYYY.MM.DD"),
      endDate: moment(endDate).format("YYYY.MM.DD"),
    };
    if (isEditing) {
      try {
        await updateBookData(bookInfo.docId, obj);
        navigate(`/view/${bookInfo.docId}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const bookId = await addBookData(bookInfo, obj, users.uid);

        navigate(`/view/${bookId}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(
    moment(startDate).format("YYYY.MM.DD"),
    moment(endDate).format("YYYY.MM.DD")
  );

  console.log(bookInfo);

  return (
    <FormContainer>
      <BookInfoTop bookInfo={bookInfo}>
        <StarRating>
          {[1, 2, 3, 4, 5].map((el) => (
            <div
              key={el}
              className={starRating >= el ? "onStar" : ""}
              onClick={() => setStarRating(el)}
            >
              <AiFillStar />
            </div>
          ))}
        </StarRating>
      </BookInfoTop>

      <DateContainer>
        <Title>독서 날짜</Title>
        <DateBox>
          <div className="pickDate">
            <FiCalendar className="calendarIcon" />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className="dash">ㅡ</div>
          <div className="pickDate">
            <FiCalendar className="calendarIcon" />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </DateBox>
      </DateContainer>
      <MemoContainer>
        <Title>메모</Title>
        <textarea
          name="memo"
          onChange={(e) => setMemo(e.target.value)}
          value={memo}
        ></textarea>
      </MemoContainer>
      <SubmitBtn>
        <HeaderRight save onsubmitHandler={onsubmitHandler} />
      </SubmitBtn>
    </FormContainer>
  );
};

export default WriteForm;

const FormContainer = styled.div``;

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

const DateContainer = styled.div``;

const Title = styled.div`
  font-size: 0.9rem;
`;

const DateBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;

  .pickDate {
    display: flex;
    align-items: center;
  }

  .calendarIcon {
    margin-right: 5px;
    color: #666;
    font-size: 1.2rem;
  }

  .dash {
    padding: 0 5px;
    color: #666;
  }

  input {
    width: 110px;
    padding: 5px;
    font-size: 0.9rem;
    border: 1px solid #d3d3d3;
    border-radius: 4px;
  }
`;

const MemoContainer = styled.div`
  margin-top: 20px;

  textarea {
    width: 100%;
    height: 170px;
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #d3d3d3;
    border-radius: 4px;
  }
`;

const SubmitBtn = styled.div`
  position: ;
`;
