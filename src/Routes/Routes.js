import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";
import Login from "../pages/Sign/Login";
import Signup from "../pages/Sign/Signup";
import Welcome from "../pages/Welcome/Welcome";

import styled from "styled-components";

const Routing = ({ isLoggedIn }) => {
  console.log(isLoggedIn);
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          {isLoggedIn && (
            <>
              <Route path={"/"} exact={true} element={<Home />} />
              {/* <Route path={"/booklist"} exact={true} element={<BookList />} /> */}
              <Route path={"/search"} exact={true} element={<Search />} />
            </>
          )}
          {!isLoggedIn && (
            <>
              <Route path={"/welcome"} exact={true} element={<Welcome />} />
              <Route path={"/signup"} exact={true} element={<Signup />} />
              <Route path={"/login"} exact={true} element={<Login />} />
            </>
          )}
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/" : "/welcome"} />}
          />
        </Routes>
      </Container>
    </Router>
  );
};
export default Routing;

const Container = styled.div`
  padding: 65px 25px 0 25px;
  height: 100vh;
`;
