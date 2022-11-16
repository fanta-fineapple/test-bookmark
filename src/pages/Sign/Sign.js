import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Sign = ({ isLogin, onSubmit }) => {
  const [signInfo, setSignInfo] = useState({
    // name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const switchAuthModeHandler = () => {
    if (isLogin) {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setSignInfo({
      ...signInfo,
      [name]: value,
    });
  };

  const submitHandler = () => {
    let { email, password, confirmPassword } = signInfo;
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (!isLogin) {
      if (!emailIsValid) {
        setMessage("올바른 이메일 형식을 입력해 주세요.");
      } else if (!passwordIsValid) {
        setMessage("비밀번호를 6자리 이상으로 설정해 주세요.");
      } else if (!passwordsAreEqual) {
        setMessage("비밀번호가 같지 않습니다.");
      } else {
        setMessage("");
        onSubmit(email, password);
      }
    } else {
      setMessage("");
      onSubmit(email, password);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="email"
          onChange={onChange}
          value={signInfo.email}
        />
        <input
          type="password"
          name="password"
          onChange={onChange}
          value={signInfo.password}
        />
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            onChange={onChange}
            value={signInfo.confirmPassword}
          />
        )}
      </div>
      <div onClick={submitHandler}>
        {isLogin ? "로그인하기" : "회원가입하기"}
      </div>
      <div onClick={switchAuthModeHandler}>
        {isLogin ? "회원가입하기" : "로그인하기"}
      </div>
      <div>{message && message}</div>
    </div>
  );
};

export default Sign;
