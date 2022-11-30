import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getRecommend } from "../../api/axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const Recommend = () => {
  const users = useSelector((state) => state.users);
  const [recommendList, setRecommendList] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (users.friends.length === 0) {
      setRecommendList(null);
      return;
    }
    const getFriendList = async () => {
      setLoading(true);
      const list = await getRecommend(users.friends);
      setRecommendList(list);
      setLoading(false);
    };

    getFriendList();
  }, [users]);

  const goToDetailView = (card) => {
    navigate(`/recommend/detailview`, { state: card });
  };

  if (loading) {
    return <Loading />;
  }
  console.log(recommendList);
  return (
    <Container>
      {(!recommendList || recommendList.length === 0) && (
        <NoData>추천받은 책이 없습니다.</NoData>
      )}
      {recommendList?.map((card) => (
        <RecommendCard key={card.docId} onClick={() => goToDetailView(card)}>
          <ProfileBox>
            <ProfileImage>
              <img
                src={
                  card.photoUrl === ""
                    ? "/assets/default_profile.jpg"
                    : card.photoUrl
                }
                alt="프로필사진"
              />
            </ProfileImage>
            <div>{card.name}</div>
          </ProfileBox>
          <RecommendContent>
            <div>
              <span>{card.name}</span> 님이 책을 추천하셨습니다.
            </div>
            <div className="bookinfo">
              <div>
                <img src={card.cover} alt="" />
              </div>
              <div>
                <p>{card.title}</p>
                <p>{card.author}</p>
              </div>
            </div>
            <div className="content">"{card.content}"</div>
            {/* <div className="moreIcon" onClick={() => goToDetailView(card)}>
              <IoIosArrowDown className="icon" />
            </div> */}
          </RecommendContent>
        </RecommendCard>
      ))}
    </Container>
  );
};

export default Recommend;

const Container = styled.div`
  font-size: 0.9rem;
`;

const RecommendCard = styled.div`
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  &:last-child {
    border-bottom: none;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileImage = styled.div`
  width: 35px;
  height: 35px;
  margin-right: 10px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

const RecommendContent = styled.div`
  margin-left: 40px;
  padding: 0 5px;

  span {
    font-weight: 500;
  }

  .bookinfo {
    display: flex;
    align-items: center;
    padding: 15px 0;

    div:first-child {
      width: 50px;

      img {
        width: 100%;
      }
    }

    div:last-child {
      margin-left: 10px;

      p {
        padding: 5px 0;
      }
    }
  }

  .content {
    line-height: 20px;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .moreIcon {
    padding-top: 10px;
    text-align: center;
    font-size: 25px;
    color: ${(props) => props.theme.mainColor};
  }
`;

const NoData = styled.div`
  padding: 50px 0;
  text-align: center;
`;
