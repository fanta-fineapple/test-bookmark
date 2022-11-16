import React from "react";
import { useNavigate } from "react-router-dom";
import { BsListUl, BsPlusCircleFill, BsPeople } from "react-icons/bs";
import { IoCalendarClearOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

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
    icon: <BsPlusCircleFill className="searchIcon" />,
    url: "/search",
  },
  {
    title: "recommend",
    icon: <BsPeople className="icon" />,
    url: "/recommend",
  },
  { title: "mypage", icon: <CgProfile className="icon" />, url: "/mypage" },
];

const Bottom = () => {
  const navigate = useNavigate();
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
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px 0;
  border-top: 1px solid #d3d3d3;
`;

const BottomList = styled.div`
  display: flex;
  justify-content: space-evenly;
  position: relative;

  .icon {
    font-size: 24px;
  }

  .searchIcon {
    font-size: 50px;
    position: absolute;
    top: -45px;
    left: 50%;
    margin-left: -25px;
    color: ${(props) => props.theme.mainColor};
  }
`;
