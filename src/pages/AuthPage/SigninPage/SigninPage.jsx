/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useInput } from '../../../hooks/useInput';
import AuthPageInput from '../../../components/AuthPage/AuthPageInput/AuthPageInput';
import { Link } from "react-router-dom";
import { signinRequest } from "../../../apis/api/signin";

function SigninPage() {
    const [username, userNameChange, usernameMessage, setUsernameValue, setUsernameMessage] = useInput("username");
    const [password, passwordChange, passwordMessage] = useInput("password");

    const handleSigninSubmit = () => {
        console.log("실행");
        signinRequest({
            username,
            password
        }).then(response => {
            const accessToken  = response.data;
            localStorage.setItem("AccessToken", accessToken);
            window.location.replace("/");
        }).catch(error => {
            alert(error.response.data);
        })
    }

    return (
        <div>
        <div>
            <h1>로그인</h1>
        </div>

            <AuthPageInput
                type={"text"}
                name={"username"}
                placeholder={"아이디"}
                value={username}
                onChange={userNameChange}
                message={usernameMessage}
            />
            <AuthPageInput
                type={"password"}
                name={"password"}
                placeholder={"비밀번호"}
                value={password}
                onChange={passwordChange}
                message={passwordMessage}
            />


        <button css={s.signinButton} onClick={handleSigninSubmit}>로그인 하기</button>
        <Link to ={"/auth/signup/adminInfo"}>회원가입</Link>
        </div>
    )
}

export default SigninPage
