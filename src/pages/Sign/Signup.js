import React from "react";
import { signup } from "../../api/axios";
import Sign from "./Sign";
const Signup = () => {
  const onSubmit = (email, password) => {
    signup(email, password);
  };
  return (
    <div>
      <Sign onSubmit={onSubmit} />
    </div>
  );
};

export default Signup;
