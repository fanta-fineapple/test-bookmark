import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { searchFriend, userProfileUpdate } from "../../api/axios";
import { usersActions } from "../../store/users/users-slice";
import FriendCard from "./FriendCard";

const AddFriend = () => {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchFriendResult, setSearchFriendResult] = useState(null);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") searchHandler();
  };

  const searchHandler = async () => {
    if (keyword === "") {
      alert("검색어를 입력해주세요");
    } else {
      setLoading(true);
      const result = await searchFriend(keyword);
      setSearchFriendResult(result[0]);
      setLoading(false);
    }
  };

  const addFriendHandler = async (friendUid) => {
    let friends = [];
    if (users.friends) {
      friends = [...users.friends, friendUid];
    } else {
      friends.push(friendUid);
    }
    console.log(friends);
    setLoading(true);
    await userProfileUpdate(users.uid, { friends });
    dispatch(usersActions.updateFriends(friends));
    setLoading(false);
  };

  console.log(loading);

  return (
    <div>
      <SearchBar>
        <input
          type="text"
          placeholder="검색할 친구의 코드를 입력해주세요."
          value={keyword}
          onKeyPress={handleOnKeyPress}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </SearchBar>
      {searchFriendResult === undefined && (
        <NoData>찾으시는 친구가 없습니다.</NoData>
      )}
      {searchFriendResult && (
        <div>
          <FriendCard
            friend={searchFriendResult}
            addFriendHandler={addFriendHandler}
            users={users}
          />
        </div>
      )}
    </div>
  );
};

export default AddFriend;

const SearchBar = styled.div`
  input {
    width: 100%;
    height: 35px;
    margin-right: 15px;
    padding-left: 10px;
    border: none;
    border-radius: 10px;
    background-color: #eee;
    vertical-align: text-top;

    &:focus {
      outline: none;
    }
  }
`;

const NoData = styled.div`
  padding: 50px 0;
  text-align: center;
  font-size: 0.9rem;
`;
