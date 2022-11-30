import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { searchFriend, userProfileUpdate } from "../../api/axios";
import Loading from "../../components/Loading";
import { usersActions } from "../../store/users/users-slice";
import FriendCard from "./FriendCard";

const AddFriend = () => {
  const [loading, setLoading] = useState(false);
  // const [keyword, setKeyword] = useState("");
  const [searchFriendResult, setSearchFriendResult] = useState(null);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const location = useLocation();
  const keyword = location.state;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const result = await searchFriend(keyword);
      setSearchFriendResult(result[0]);
      setLoading(false);
    };

    if (keyword !== null) {
      getData();
    }
  }, [keyword]);

  const addFriendHandler = async (friendUid) => {
    let friends = [];
    if (users.friends) {
      friends = [...users.friends, friendUid];
    } else {
      friends.push(friendUid);
    }

    setLoading(true);
    await userProfileUpdate(users.uid, { friends });
    dispatch(usersActions.updateFriends(friends));
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {/* <SearchBar>
        <input
          type="text"
          placeholder="검색할 친구의 코드를 입력해주세요."
          value={keyword}
          onKeyPress={handleOnKeyPress}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </SearchBar> */}
      {searchFriendResult === undefined && (
        <NoData>찾으시는 친구가 없습니다.</NoData>
      )}
      {searchFriendResult && (
        <FriendCard
          friend={searchFriendResult}
          addFriendHandler={addFriendHandler}
          users={users}
        />
      )}
    </div>
  );
};

export default AddFriend;

const NoData = styled.div`
  padding: 50px 0;
  text-align: center;
  font-size: 0.9rem;
`;
