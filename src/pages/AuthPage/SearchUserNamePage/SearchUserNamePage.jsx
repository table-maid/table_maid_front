/** @jsxImportSource @emotion/react */
import * as s from "./style";
import AuthPageInput from "../../../components/AuthPage/AuthPageInput/AuthPageInput";
import { useInput } from "../../../hooks/useInput";
import { searchUsernameByEmailRequest } from "../../../apis/api/account";
import { useMutation } from "react-query";
import { useState, useEffect } from "react";
import { MdPeopleAlt } from "react-icons/md";

function SearchUserNamePage() {
  const [adminName, adminNameChange, adminNameMessage] = useInput("adminName");
  const [email, emailChange, emailMessage] = useInput("email");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(adminName.trim() !== "" || email.trim() !== "");
  }, [adminName, email]);

  const searchUsernameByEmailMutation = useMutation({
    mutationKey: "searchUsernameByEmailMutation",
    mutationFn: searchUsernameByEmailRequest,
    retry: 0,
    onSuccess: (response) => {
      console.log(response.data);
      if (response.data === false) {
        alert("해당 사용자가 존재하지 않습니다");
        return;
      }
      alert("해당 메일로 계정이름을 전송하였습니다.");
    },
    onError: (error) => {
      alert(error.response.data);
    },
  });

  const handleEmailSendClick = () => {
    if (window.confirm("메일은 전송하겠습니까?")) {
      searchUsernameByEmailMutation.mutate({
        adminName: adminName,
        email: email,
      });
    }
  };

  return (
    <div css={s.userNameLayout}>
      <div css={s.userNameContainer}>
        <div css={s.header}>
          <span>
            <MdPeopleAlt size={80} />
          </span>
          <h1>아이디 찾기</h1>
        </div>
        <div css={s.input}>
          <AuthPageInput
            type={"text"}
            name={"adminName"}
            placeholder={"사용자 이름"}
            value={adminName}
            onChange={adminNameChange}
            message={adminNameMessage}
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

export default SearchUserNamePage;
