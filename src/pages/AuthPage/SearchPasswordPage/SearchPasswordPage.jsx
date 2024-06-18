import { useMutation } from "react-query";
import AuthPageInput from "../../../components/AuthPage/AuthPageInput/AuthPageInput";
import { useInput } from "../../../hooks/useInput";
import { searchPasswordByEmailRequest } from "../../../apis/api/account";

function SearchPasswordPage() {
    const [username, userNameChange, usernameMessage, setUsernameValue, setUsernameMessage] = useInput("username");
    const [email, emailChange, emailMessage] = useInput("email");

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
            // setIsMailSended(() => true);
            // setSecond(() => 180);
            // setTimeout(() => {
            //     setIsMailSended(() => false);
            // }, 180000);
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
    <div>
      <h1>비밀번호 찾기</h1>
      <div>
            <div>
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
            </div>
            <div>
                <button onClick={handleEmailSendClick}>메일 전송</button>
            </div>
      </div>
    </div>
  )
}

export default SearchPasswordPage
