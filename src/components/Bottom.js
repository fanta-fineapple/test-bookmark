import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsListUl, BsPlusCircleFill, BsPeople } from "react-icons/bs";
import { IoCalendarClearOutline } from "react-icons/io5";
import { BiUser } from "react-icons/bi";

import styled from "styled-components";

const bottomList = [
  {
    title: "calendar",
    icon: <IoCalendarClearOutline className="icon" />,
    url: "/",
  },
  { title: "booklist", icon: <BsListUl className="icon" />, url: "/booklist" },
  {
    title: "search",
    icon: (
      <div className="searchIcon">
        <BsPlusCircleFill />
      </div>
    ),
    url: "/search",
  },
  {
    title: "recommend",
    icon: <BsPeople className="icon" />,
    url: "/recommend/view",
  },
  { title: "mypage", icon: <BiUser className="icon" />, url: "/mypage" },
];

const Bottom = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (
    location.pathname !== "/" &&
    location.pathname !== "/booklist" &&
    location.pathname !== "/recommend/view" &&
    location.pathname !== "/mypage"
  )
    return null;

  return (
    <BottomContainer>
      <BottomList>
        {bottomList.map((list) => (
          <div key={list.title} onClick={() => navigate(list.url)}>
            {list.icon}
          </div>
        ))}
      </BottomList>
    </BottomContainer>
  );
};

export default Bottom;

const BottomContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: inherit;
  max-width: inherit;
  padding: 15px 0;
  background-color: white;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const BottomList = styled.div`
  display: flex;
  justify-content: space-evenly;
  position: relative;

  .icon {
    font-size: 24px;
  }

  .searchIcon {
    font-size: 45px;
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translate(-50%, 0);
    color: ${(props) => props.theme.mainColor};
  }
`;
