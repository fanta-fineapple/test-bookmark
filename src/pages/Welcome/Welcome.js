import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>Welcome</div>
      <div onClick={() => navigate("/login")}>로그인페이지로</div>
    </div>
  );
};

export default Welcome;
