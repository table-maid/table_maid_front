/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useMutation } from "react-query";
import AuthPageInput from "../../../components/AuthPage/AuthPageInput/AuthPageInput";
import { useInput } from "../../../hooks/useInput";
import { searchPasswordByEmailRequest } from "../../../apis/api/account";
import { useState, useEffect } from "react";


function SearchPasswordPage() {
  const [username, userNameChange, usernameMessage] = useInput("username");
  const [email, emailChange, emailMessage] = useInput("email");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(username.trim() !== "" || email.trim() !== "");
  }, [username, email]);

  const searchPasswordByEmailMutation = useMutation({
    mutationKey: "searchPasswordByEmailMutation",
    mutationFn: searchPasswordByEmailRequest,
    retry: 0,
    onSuccess: (response) => {
      console.log(response);
      if (response.data === false) {
        alert("해당 사용자가 존재하지 않습니다");
        return;
      }
      alert("해당 메일로 임시비밀번호를 전송하였습니다.");
    },
  });

  const handleEmailSendClick = () => {
    if (window.confirm("메일을 전송할까요?")) {
      searchPasswordByEmailMutation.mutate({
        username: username,
        email: email,
      });
    }
  };

  return (
    <div css={s.userPasswordLayout}>
      <div css={s.userPasswordContainer}>
        <span></span>
        <h1>비밀번호 찾기</h1>
        <div css={s.input}>
          <AuthPageInput
            type={"text"}
            name={"username"}
            placeholder={"아이디"}
            value={username}
            onChange={userNameChange}
            message={usernameMessage}
          />
          <AuthPageInput
            type={"text"}
            name={"email"}
            placeholder={"이메일"}
            value={email}
            onChange={emailChange}
            message={emailMessage}
          />
          <button
            onClick={handleEmailSendClick}
            css={s.button(isFormValid)}
            disabled={!isFormValid}
          >
            메일 전송
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchPasswordPage;
